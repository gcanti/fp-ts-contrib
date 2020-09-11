import * as path from 'path'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as A from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { FileSystem, fileSystem } from './FileSystem'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem, Error, A> {}

const OUTPUT_FOLDER = 'dist'
const PKG = 'package.json'

export const copyPackageJson: Build<void> = (C) =>
  pipe(
    C.readFile(PKG),
    TE.chain((s) => TE.fromEither(E.parseJSON(s, E.toError))),
    TE.map((v) => {
      const clone = Object.assign({}, v as any)

      delete clone.scripts
      delete clone.files
      delete clone.devDependencies

      return clone
    }),
    TE.chain((json) => C.writeFile(path.join(OUTPUT_FOLDER, PKG), JSON.stringify(json, null, 2)))
  )

export const FILES: ReadonlyArray<string> = ['CHANGELOG.md', 'LICENSE', 'README.md']

export const copyFiles: Build<ReadonlyArray<void>> = (C) =>
  pipe(
    FILES,
    A.traverse(TE.taskEither)((from) => C.copyFile(from, path.resolve(OUTPUT_FOLDER, from)))
  )

const traverse = A.traverse(TE.taskEither)

export const makeModules: Build<void> = (C) =>
  pipe(
    C.glob(`${OUTPUT_FOLDER}/lib/**/*.js`),
    TE.map(getModules),
    TE.chain(traverse(makeSingleModule(C))),
    TE.map(() => undefined)
  )

interface Module {
  readonly name: string
  readonly directories: Array<string>
}

function getModules(paths: ReadonlyArray<string>): ReadonlyArray<Module> {
  return paths
    .map((filePath) => {
      const name = path.basename(filePath, '.js')
      const directories = path.dirname(filePath).split(path.sep).slice(2)
      return { name, directories }
    })
    .filter((x) => x.name !== 'index' || x.directories.length > 0)
}

function isIndex(module: Module): boolean {
  return module.name === 'index'
}

function makeSingleModule(C: FileSystem): (module: Module) => TE.TaskEither<Error, void> {
  return (module) => {
    const dirs = module.directories
    const dir = path.join(OUTPUT_FOLDER, ...dirs, isIndex(module) ? '' : module.name)
    return pipe(
      C.mkdir(dir),
      TE.chain(() => makePkgJson(module)),
      TE.chain((data) => C.writeFile(path.join(dir, PKG), data))
    )
  }
}

function makePkgJson(module: Module): TE.TaskEither<Error, string> {
  const root = A.replicate(module.directories.length + (isIndex(module) ? 0 : 1), '..')
  return pipe(
    JSON.stringify(
      {
        main: path.join(...root, 'lib', ...module.directories, `${module.name}.js`),
        module: path.join(...root, 'es6', ...module.directories, `${module.name}.js`),
        typings: path.join(...root, 'lib', ...module.directories, `${module.name}.d.ts`),
        sideEffects: false
      },
      null,
      2
    ),
    TE.right
  )
}

const main: Build<void> = pipe(
  copyPackageJson,
  RTE.chain(() => copyFiles),
  RTE.chain(() => makeModules)
)

run(
  main({
    ...fileSystem
  })
)
