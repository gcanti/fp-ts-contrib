import * as assert from 'assert'
import { identity } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { both, fold, left, right } from 'fp-ts/lib/These'
import { padZip, padZipWith, salign } from '../src/Align'
import { alignArray, lpadZip, lpadZipWith, rpadZip, rpadZipWith } from '../src/Align/Array'
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
    assert.deepStrictEqual(padZip(alignArray)([1, 2], ['a', 'b']), [[O.some(1), O.some('a')], [O.some(2), O.some('b')]])
    assert.deepStrictEqual(padZip(alignArray)([1, 2], ['a']), [[O.some(1), O.some('a')], [O.some(2), O.none]])
    assert.deepStrictEqual(padZip(alignArray)([1], ['a', 'b']), [[O.some(1), O.some('a')], [O.none, O.some('b')]])
    assert.deepStrictEqual(padZip(alignArray)([], []), [])
  })

  it('padZipWith', () => {
    const f = (ma: O.Option<number>, mb: O.Option<string>) =>
      pipe(
        mb,
        O.getOrElse(() => '#')
      ) +
      pipe(
        ma,
        O.fold(() => '*', (a: number) => a.toString())
      )
    assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a', 'b'], f), ['a1', 'b2'])
    assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a'], f), ['a1', '#2'])
    assert.deepStrictEqual(padZipWith(alignArray)([1], ['a', 'b'], f), ['a1', 'b*'])
    assert.deepStrictEqual(padZipWith(alignArray)([], [], f), [])
  })

  describe('Array', () => {
    it('align', () => {
      assert.deepStrictEqual(alignArray.align([1, 2], ['a', 'b']), [both(1, 'a'), both(2, 'b')])
      assert.deepStrictEqual(alignArray.align([1, 2], ['a']), [both(1, 'a'), left(2)])
      assert.deepStrictEqual(alignArray.align([1], ['a', 'b']), [both(1, 'a'), right('b')])
      assert.deepStrictEqual(alignArray.align([], []), [])
      assert.deepStrictEqual(alignArray.align([1], alignArray.nil<string>()), [left(1)])
      assert.deepStrictEqual(alignArray.align(alignArray.nil<number>(), ['a']), [right('a')])
    })

    it('alignWith', () => {
      const f = fold<number, string, string>(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a'], f), ['a1', '2'])
      assert.deepStrictEqual(alignArray.alignWith([1], ['a', 'b'], f), ['a1', 'b'])
      assert.deepStrictEqual(alignArray.alignWith([], [], f), [])
      assert.deepStrictEqual(alignArray.alignWith([1], alignArray.nil<string>(), f), ['1'])
      assert.deepStrictEqual(alignArray.alignWith(alignArray.nil<number>(), ['a'], f), ['a'])
    })

    it('lpadZip', () => {
      assert.deepStrictEqual(lpadZip([1, 2], ['a', 'b']), [[O.some(1), 'a'], [O.some(2), 'b']])
      assert.deepStrictEqual(lpadZip([1, 2], ['a']), [[O.some(1), 'a']])
      assert.deepStrictEqual(lpadZip([1], ['a', 'b']), [[O.some(1), 'a'], [O.none, 'b']])
      assert.deepStrictEqual(lpadZip([], []), [])
    })

    it('lpadZipWith', () => {
      const f = (ma: O.Option<number>, b: string) =>
        b +
        pipe(
          ma,
          O.fold(() => '*', a => a.toString())
        )
      assert.deepStrictEqual(lpadZipWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(lpadZipWith([1, 2], ['a'], f), ['a1'])
      assert.deepStrictEqual(lpadZipWith([1], ['a', 'b'], f), ['a1', 'b*'])
      assert.deepStrictEqual(lpadZipWith([], [], f), [])
    })

    it('rpadZip', () => {
      assert.deepStrictEqual(rpadZip([1, 2], ['a', 'b']), [[1, O.some('a')], [2, O.some('b')]])
      assert.deepStrictEqual(rpadZip([1, 2], ['a']), [[1, O.some('a')], [2, O.none]])
      assert.deepStrictEqual(rpadZip([1], ['a', 'b']), [[1, O.some('a')]])
      assert.deepStrictEqual(rpadZip([], []), [])
    })

    it('rpadZipWith', () => {
      const f = (a: number, mb: O.Option<string>) =>
        pipe(
          mb,
          O.getOrElse(() => '*')
        ) + a.toString()
      assert.deepStrictEqual(rpadZipWith([1, 2], ['a', 'b'], f), ['a1', 'b2'])
      assert.deepStrictEqual(rpadZipWith([1, 2], ['a'], f), ['a1', '*2'])
      assert.deepStrictEqual(rpadZipWith([1], ['a', 'b'], f), ['a1'])
      assert.deepStrictEqual(rpadZipWith([], [], f), [])
    })
  })

  describe('Option', () => {
    it('align', () => {
      assert.deepStrictEqual(alignOption.align(O.some(1), O.some('a')), O.some(both(1, 'a')))
      assert.deepStrictEqual(alignOption.align(O.some(1), alignOption.nil<string>()), O.some(left(1)))
      assert.deepStrictEqual(alignOption.align(alignOption.nil<number>(), O.some('a')), O.some(right('a')))
      assert.deepStrictEqual(alignOption.align(alignOption.nil<number>(), alignOption.nil<string>()), O.none)
    })

    it('alignWith', () => {
      const f = fold<number, string, string>(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignOption.alignWith(O.some(1), O.some('a'), f), O.some('a1'))
      assert.deepStrictEqual(alignOption.alignWith(O.some(1), alignOption.nil<string>(), f), O.some('1'))
      assert.deepStrictEqual(alignOption.alignWith(alignOption.nil<number>(), O.some('a'), f), O.some('a'))
      assert.deepStrictEqual(alignOption.alignWith(alignOption.nil<number>(), alignOption.nil<string>(), f), O.none)
    })
  })

  describe('Record', () => {
    it('align', () => {
      assert.deepStrictEqual(alignRecord.align({ a: 1, b: 2 }, { a: 'a', b: 'b' }), {
        a: both(1, 'a'),
        b: both(2, 'b')
      })
      assert.deepStrictEqual(alignRecord.align({ a: 1, b: 2 }, { a: 'a' }), { a: both(1, 'a'), b: left(2) })
      assert.deepStrictEqual(alignRecord.align({ a: 1 }, { a: 'a', b: 'b' }), { a: both(1, 'a'), b: right('b') })
      assert.deepStrictEqual(alignRecord.align({}, {}), {})
      assert.deepStrictEqual(alignRecord.align({ a: 1 }, alignRecord.nil<string>()), { a: left(1) })
      assert.deepStrictEqual(alignRecord.align(alignRecord.nil<number>(), { a: 'a' }), { a: right('a') })
    })

    it('alignWith', () => {
      const f = fold<number, string, string>(a => a.toString(), identity, (a, b) => b + a)
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1, b: 2 }, { a: 'a', b: 'b' }, f), { a: 'a1', b: 'b2' })
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1, b: 2 }, { a: 'a' }, f), { a: 'a1', b: '2' })
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1 }, { a: 'a', b: 'b' }, f), { a: 'a1', b: 'b' })
      assert.deepStrictEqual(alignRecord.alignWith({}, {}, f), {})
      assert.deepStrictEqual(alignRecord.alignWith({ a: 1 }, alignRecord.nil<string>(), f), { a: '1' })
      assert.deepStrictEqual(alignRecord.alignWith(alignRecord.nil<number>(), { a: 'a' }, f), { a: 'a' })
    })
  })
})
