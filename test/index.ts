import * as assert from 'assert'
import { sum } from '../src'

describe('sum', () => {
  it('should add two values', () => {
    assert.strictEqual(sum(2, 2), 4)
  })
})
