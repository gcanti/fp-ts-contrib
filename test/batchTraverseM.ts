import * as assert from 'assert'
import { chunksOf, range } from 'fp-ts/lib/Array'
import { fromIO, fromLeft, taskEither } from 'fp-ts/lib/TaskEither'
import { batchTraverseM, batchSequenceM } from '../src/batchTraverseM'
import { IO } from 'fp-ts/lib/IO'
import { right, left } from 'fp-ts/lib/Either'

describe('batchTraverseM', () => {
  it('should run all the computations', async () => {
    const input = range(1, 4)
    const log: Array<string> = []
    const actual = await batchTraverseM(taskEither)(chunksOf(input, 2), a =>
      fromIO(new IO(() => log.push(`Executing ${a}`))).map(() => a)
    ).run()
    assert.deepStrictEqual(actual, right([1, 2, 3, 4]))
    assert.deepStrictEqual(log, ['Executing 1', 'Executing 2', 'Executing 3', 'Executing 4'])
  })

  it('should not stack overflow', async () => {
    const input = range(1, 10_000)
    const actual = await batchTraverseM(taskEither)(chunksOf(input, 2), taskEither.of).run()
    assert.deepStrictEqual(actual, right(input))
  })

  it('should bail out when an error occours', async () => {
    const input = range(1, 10)
    const log: Array<string> = []
    const actual = await batchTraverseM(taskEither)(chunksOf(input, 2), a =>
      fromIO(new IO(() => log.push(`Executing ${a}`))).chain(() =>
        a === 3 ? fromLeft(`Error: ${a}`) : taskEither.of(a)
      )
    ).run()
    assert.deepStrictEqual(actual, left('Error: 3'))
    assert.deepStrictEqual(log, ['Executing 1', 'Executing 2', 'Executing 3', 'Executing 4'])
  })
})

describe('batchSequenceM', () => {
  it('should bail out when an error occours', async () => {
    const input = range(1, 10)
    const log: Array<string> = []
    const actual = await batchSequenceM(taskEither)(
      chunksOf(
        input.map(a =>
          fromIO(new IO(() => log.push(`Executing ${a}`))).chain(() =>
            a === 3 ? fromLeft(`Error: ${a}`) : taskEither.of(a)
          )
        ),
        2
      )
    ).run()
    assert.deepStrictEqual(actual, left('Error: 3'))
    assert.deepStrictEqual(log, ['Executing 1', 'Executing 2', 'Executing 3', 'Executing 4'])
  })
})
