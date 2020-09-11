import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import * as fs from 'fs'
import G from 'glob'
import * as path from 'path'
import * as A from 'fp-ts/ReadonlyArray'

export interface FileSystem {
  readonly readFile: (path: string) => TE.TaskEither<Error, string>
  readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>
  readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>
  readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly mkdir: (path: string) => TE.TaskEither<Error, void>
}

const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile)
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile)
const copyFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.copyFile)
const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const mkdirTE = TE.taskify(fs.mkdir)

function mkdir(p: string): TE.TaskEither<Error, void> {
  function go(p: ReadonlyArray<string>, i: number): TE.TaskEither<Error, void> {
    if (A.isOutOfBound(i, p)) {
      return TE.of(undefined)
    } else {
      return pipe(
        pipe(
          mkdirTE(path.join(...p.slice(0, i + 1))),
          TE.map(() => undefined)
        ),
        TE.alt(() => TE.of(undefined)), // dir already exists
        TE.chain(() => go(p, i + 1)),
        TE.map(() => undefined)
      )
    }
  }
  return go(p.split(path.sep), 0)
}

export const fileSystem: FileSystem = {
  readFile: (path) => readFile(path, 'utf8'),
  writeFile,
  copyFile,
  glob,
  mkdir
}
