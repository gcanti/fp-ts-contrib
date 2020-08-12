import * as assert from 'assert'
import { chunksOf, range } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { batchTraverse } from '../src/batchTraverse'
import { pipe } from 'fp-ts/lib/pipeable'

describe('batchTraverse', () => {
  const btraverse = batchTraverse(TE.taskEither)
  const chunks = chunksOf(2)

  it('should run all the computations', async () => {
    const input = range(1, 4)
    const log: Array<string> = []
    const actual = await btraverse(chunks(input), (a) =>
      pipe(
        TE.rightIO(() => log.push(`Executing ${a}`)),
        TE.map(() => a)
      )
    )()
    assert.deepStrictEqual(actual, E.right([1, 2, 3, 4]))
    assert.deepStrictEqual(log, ['Executing 1', 'Executing 2', 'Executing 3', 'Executing 4'])
  })

  it('should not stack overflow', async () => {
    const input = range(1, 10_000)
    const actual = await btraverse(chunks(input), TE.right)()
    assert.deepStrictEqual(actual, E.right(input))
  })

  it('should bail out when an error occours', async () => {
    const input = range(1, 10)
    const log: Array<string> = []
    const actual = await btraverse(chunks(input), (a) =>
      pipe(
        TE.rightIO(() => log.push(`Executing ${a}`)),
        TE.chain(() => (a === 3 ? TE.left(`Error: ${a}`) : TE.right(a)))
      )
    )()
    assert.deepStrictEqual(actual, E.left('Error: 3'))
    assert.deepStrictEqual(log, ['Executing 1', 'Executing 2', 'Executing 3', 'Executing 4'])
  })
})
