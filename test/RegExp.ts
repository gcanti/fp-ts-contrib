import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as RX from '../src/RegExp'
import { pipe } from 'fp-ts/lib/pipeable'

describe('RegExp', () => {
  it('match', () => {
    const myMatch = RX.match(/^(\d)(\w)$/)
    assert.deepStrictEqual(pipe('2e', myMatch, O.map(Array.from)), O.some(['2e', '2', 'e']))
    assert.deepStrictEqual(myMatch('foo'), O.none)
  })

  describe('test', () => {
    it('should work', () => {
      const myTest = RX.test(/^(\d)(\w)$/)
      assert.strictEqual(myTest('6s'), true)
      assert.strictEqual(myTest('bar'), false)
    })

    it('`lastIndex` property should not mutate', () => {
      const regExp = /\w/g
      RX.test(regExp)('abc')
      assert.strictEqual(regExp.lastIndex, 0)
    })
  })

  it('sub', () => {
    const sanitiseSpaces = RX.sub(/\s/g, '_')
    assert.strictEqual(sanitiseSpaces('foo bar owl'), 'foo_bar_owl')
  })

  it('split', () => {
    const splitByHash = RX.split(/#/)
    assert.deepStrictEqual(splitByHash('foo#bar#beer'), ['foo', 'bar', 'beer'])
    assert.deepStrictEqual(splitByHash('noHashes'), ['noHashes'])
  })
})
