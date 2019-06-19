import * as assert from 'assert'
import { time } from '../src/time'
import { io } from 'fp-ts/lib/IO'

describe('time', () => {
  it('should output the elapsed time', () => {
    const timeIO = time(io)
    const [result, elapsed] = timeIO(() => 1)()
    assert.strictEqual(result, 1)
    assert.strictEqual(typeof elapsed, 'number')
  })
})
