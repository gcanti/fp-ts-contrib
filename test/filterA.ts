import * as assert from 'assert'
import { filterA } from '../src/filterA'
import { io, IO } from 'fp-ts/lib/IO'

describe('filterA', () => {
  it('should filter in the lifted context', () => {
    const filterAIO = filterA(io)
    const p = (n: number): IO<boolean> => io.of(n % 2 === 0)
    const result = filterAIO(p)([1, 2, 3, 4, 5])
    assert.deepStrictEqual(result(), [2, 4])
  })
})
