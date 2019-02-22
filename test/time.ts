import * as assert from 'assert'
import { time } from '../src/time'
import * as IO from 'fp-ts/lib/IO'

describe('time', () => {
  it('should output the elapsed time', () => {
    const timeIO = time(IO.io)
    const [result, elapsed] = timeIO(new IO.IO(() => 1)).run()
    assert.strictEqual(result, 1)
    assert.strictEqual(typeof elapsed, 'number')
  })
})
