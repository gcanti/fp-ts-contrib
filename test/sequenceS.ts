import * as assert from 'assert'
import { sequenceS } from '../src/sequenceS'
import {} from 'fp-ts/lib/Apply'
import {} from 'fp-ts/lib/Applicative'
import { either, right, left } from 'fp-ts/lib/Either'
import { option, some, none } from 'fp-ts/lib/Option'

describe('sequences', () => {
  it('on Type1 (Option)', () => {
    const ado = sequenceS(option)

    assert.deepStrictEqual(ado({ a: some(1) }), some({ a: 1 }))
    assert.deepStrictEqual(ado({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
    assert.deepStrictEqual(ado({ a: some(1), b: none }), none)
  })

  it('on Type2 (Either)', () => {
    const ado = sequenceS(either)

    assert.deepStrictEqual(ado({ a: right(1) }), right({ a: 1 }))
    assert.deepStrictEqual(ado({ a: right(1), b: right(2) }), right({ a: 1, b: 2 }))
    assert.deepStrictEqual(ado({ a: right(1), b: left('error') }), left('error'))
  })
})
