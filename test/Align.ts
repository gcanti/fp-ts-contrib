import * as assert from 'assert'
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { Option, some, none } from 'fp-ts/lib/Option'
import { These, both, this_, that } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'
import { salign, padZip, padZipWith } from '../src/Align'
import { alignArray, lpadZipWith, lpadZip, rpadZipWith, rpadZip } from '../src/Align/Array'
import { alignOption } from '../src/Align/Option'
import * as alignRecord from '../src/Align/Record'

describe('Align', () => {
  it('salign', () => {
    assert.deepStrictEqual(salign(alignArray, semigroupSum)([1, 2], [4, 5]), [5, 7])
    assert.deepStrictEqual(salign(alignArray, semigroupSum)([1, 2], [4]), [5, 2])
    assert.deepStrictEqual(salign(alignArray, semigroupSum)([1], [4, 5]), [5, 5])
    assert.deepStrictEqual(salign(alignArray, semigroupSum)([], []), [])
  })

  it('padZip', () => {
    assert.deepStrictEqual(padZip(alignArray)([1, 2], ['a', 'b']), [[some(1), some('a')], [some(2), some('b')]])
    assert.deepStrictEqual(padZip(alignArray)([1, 2], ['a']), [[some(1), some('a')], [some(2), none]])
    assert.deepStrictEqual(padZip(alignArray)([1], ['a', 'b']), [[some(1), some('a')], [none, some('b')]])
    assert.deepStrictEqual(padZip(alignArray)([], []), [])
  })

  it('padZipWith', () => {
    const f = (ma: Option<number>, mb: Option<string>) => mb.getOrElse('#') + ma.fold('*', a => a.toString())
    assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a', 'b'], f), ['a1', 'b2'])
    assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a'], f), ['a1', '#2'])
    assert.deepStrictEqual(padZipWith(alignArray)([1], ['a', 'b'], f), ['a1', 'b*'])
    assert.deepStrictEqual(padZipWith(alignArray)([], [], f), [])
  })

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

  describe('Option', () => {
    it('align', () => {
      assert.deepStrictEqual(alignOption.align(some(1), some('a')), some(both(1, 'a')))
      assert.deepStrictEqual(alignOption.align(some(1), alignOption.nil<string>()), some(this_(1)))
      assert.deepStrictEqual(alignOption.align(alignOption.nil<number>(), some('a')), some(that('a')))
      assert.deepStrictEqual(alignOption.align(alignOption.nil<number>(), alignOption.nil<string>()), none)
    })

    it('alignWith', () => {
      const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignOption.alignWith(some(1), some('a'), f), some('a1'))
      assert.deepStrictEqual(alignOption.alignWith(some(1), alignOption.nil<string>(), f), some('1'))
      assert.deepStrictEqual(alignOption.alignWith(alignOption.nil<number>(), some('a'), f), some('a'))
      assert.deepStrictEqual(alignOption.alignWith(alignOption.nil<number>(), alignOption.nil<string>(), f), none)
    })
  })

  describe('Record', () => {
    it('align', () => {
      assert.deepStrictEqual(alignRecord.align({ a: 1, b: 2 }, { a: 'a', b: 'b' }), {
        a: both(1, 'a'),
        b: both(2, 'b')
      })
      assert.deepStrictEqual(alignRecord.align({ a: 1, b: 2 }, { a: 'a' }), { a: both(1, 'a'), b: this_(2) })
      assert.deepStrictEqual(alignRecord.align({ a: 1 }, { a: 'a', b: 'b' }), { a: both(1, 'a'), b: that('b') })
      assert.deepStrictEqual(alignRecord.align({}, {}), {})
      assert.deepStrictEqual(alignRecord.align({ a: 1 }, alignRecord.nil<string>()), { a: this_(1) })
      assert.deepStrictEqual(alignRecord.align(alignRecord.nil<number>(), { a: 'a' }), { a: that('a') })
    })

    it('alignWith', () => {
      const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1, b: 2 }, { a: 'a', b: 'b' }, f), { a: 'a1', b: 'b2' })
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1, b: 2 }, { a: 'a' }, f), { a: 'a1', b: '2' })
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1 }, { a: 'a', b: 'b' }, f), { a: 'a1', b: 'b' })
      assert.deepStrictEqual(alignRecord.alignWith({}, {}, f), {})
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1 }, alignRecord.nil<string>(), f), { a: '1' })
      assert.deepStrictEqual(alignRecord.alignWith(alignRecord.nil<number>(), { a: 'a' }, f), { a: 'a' })
    })
  })
})
