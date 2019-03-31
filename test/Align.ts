import * as assert from 'assert'
import { Option, some, none } from 'fp-ts/lib/Option'
import { These, both, this_, that } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'
import { alignArray, lpadZipWith, lpadZip, rpadZipWith, rpadZip } from '../src/Align/Array'

describe('Align', () => {
  describe('Array', () => {
    it('align', () => {
      assert.deepStrictEqual(alignArray.align([1, 2], ['a', 'b']), [both(1, 'a'), both(2, 'b')])
      assert.deepStrictEqual(alignArray.align([1, 2], ['a']), [both(1, 'a'), this_(2)])
      assert.deepStrictEqual(alignArray.align([1], ['a', 'b']), [both(1, 'a'), that('b')])
      assert.deepStrictEqual(alignArray.align([], []), [])
      assert.deepStrictEqual(alignArray.align([1], alignArray.nil<string>()), [this_(1)])
      assert.deepStrictEqual(alignArray.align(alignArray.nil<number>(), ['a']), [that('a')])
    })

    it('alignWith', () => {
      const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a'], f), ['a1', '2'])
      assert.deepStrictEqual(alignArray.alignWith([1], ['a', 'b'], f), ['a1', 'b'])
      assert.deepStrictEqual(alignArray.alignWith([], [], f), [])
      assert.deepStrictEqual(alignArray.alignWith([1], alignArray.nil<string>(), f), ['1'])
      assert.deepStrictEqual(alignArray.alignWith(alignArray.nil<number>(), ['a'], f), ['a'])
    })

    it('lpadZip', () => {
      assert.deepStrictEqual(lpadZip([1, 2], ['a', 'b']), [[some(1), 'a'], [some(2), 'b']])
      assert.deepStrictEqual(lpadZip([1, 2], ['a']), [[some(1), 'a']])
      assert.deepStrictEqual(lpadZip([1], ['a', 'b']), [[some(1), 'a'], [none, 'b']])
      assert.deepStrictEqual(lpadZip([], []), [])
    })

    it('lpadZipWith', () => {
      const f = (ma: Option<number>, b: string) => b + ma.fold('*', a => a.toString())
      assert.deepStrictEqual(lpadZipWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(lpadZipWith([1, 2], ['a'], f), ['a1'])
      assert.deepStrictEqual(lpadZipWith([1], ['a', 'b'], f), ['a1', 'b*'])
      assert.deepStrictEqual(lpadZipWith([], [], f), [])
    })

    it('rpadZip', () => {
      assert.deepStrictEqual(rpadZip([1, 2], ['a', 'b']), [[1, some('a')], [2, some('b')]])
      assert.deepStrictEqual(rpadZip([1, 2], ['a']), [[1, some('a')], [2, none]])
      assert.deepStrictEqual(rpadZip([1], ['a', 'b']), [[1, some('a')]])
      assert.deepStrictEqual(rpadZip([], []), [])
    })

    it('rpadZipWith', () => {
      const f = (a: number, mb: Option<string>) => mb.getOrElse('*') + a.toString()
      assert.deepStrictEqual(rpadZipWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(rpadZipWith([1, 2], ['a'], f), ['a1', '*2'])
      assert.deepStrictEqual(rpadZipWith([1], ['a', 'b'], f), ['a1'])
      assert.deepStrictEqual(rpadZipWith([], [], f), [])
    })
  })
})
