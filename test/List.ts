import * as assert from 'assert'
import { eqNumber } from 'fp-ts/lib/Eq'
import { identity } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { monoidSum } from 'fp-ts/lib/Monoid'
import { pipe } from 'fp-ts/lib/pipeable'
import { showNumber } from 'fp-ts/lib/Show'
import * as L from '../src/List'

describe('List', () => {
  describe('constructors', () => {
    it('nil', () => {
      assert.deepStrictEqual(L.nil, { type: 'Nil', length: 0 })
    })

    it('cons', () => {
      assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil, length: 1 })
    })

    it('fromArray', () => {
      assert.deepStrictEqual(L.fromArray([1, 2, 3]), {
        type: 'Cons',
        head: 1,
        length: 3,
        tail: {
          type: 'Cons',
          head: 2,
          length: 2,
          tail: { type: 'Cons', head: 3, length: 1, tail: { type: 'Nil', length: 0 } }
        }
      })
    })
  })

  describe('destructors', () => {
    it('toArray', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.toArray), [])
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.toArray), [1, 2, 3])
    })

    it('toReversedArray', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.toReversedArray), [])
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.toReversedArray), [3, 2, 1])
    })

    it('head', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.head), O.none)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.head), O.some(1))
    })

    it('tail', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.tail), O.none)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.tail), O.some(L.fromArray([2, 3])))
    })

    it('foldLeft', () => {
      const len: <A>(as: L.List<A>) => number = L.foldLeft(
        () => 0,
        (_, tail) => 1 + len(tail)
      )

      assert.deepStrictEqual(pipe(L.fromArray([]), len), 0)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), len), 3)
    })

    it('findIndex', () => {
      const f = (a: number): boolean => a % 2 === 0

      assert.deepStrictEqual(pipe(L.fromArray([]), L.findIndex(f)), O.none)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.findIndex(f)), O.some(1))
    })

    it('isNil', () => {
      assert.strictEqual(L.isNil(L.nil), true)
      assert.strictEqual(L.isNil(L.of(6)), false)
    })

    it('isCons', () => {
      assert.strictEqual(L.isCons(L.nil), false)
      assert.strictEqual(L.isCons(L.of(1)), true)
    })
  })

  describe('combinators', () => {
    it('dropLeft', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.dropLeft(1)), L.fromArray([]))
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.dropLeft(1)), L.fromArray([2, 3]))
    })

    it('dropLeftWhile', () => {
      const f = (n: number) => n < 3

      assert.deepStrictEqual(pipe(L.fromArray([]), L.dropLeftWhile(f)), L.fromArray([]))
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.dropLeftWhile(f)), L.fromArray([3]))
    })

    it('reverse', () => {
      assert.deepStrictEqual(pipe(L.fromArray([]), L.reverse), L.fromArray([]))
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.reverse), L.fromArray([3, 2, 1]))
    })
  })

  describe('pipeables', () => {
    it('map', () => {
      const f = (n: number): number => n * 2

      assert.deepStrictEqual(L.Functor.map(L.fromArray([]), f), L.fromArray([]))
      assert.deepStrictEqual(L.Functor.map(L.fromArray([1, 2, 3]), f), L.fromArray([2, 4, 6]))
    })

    it('ap', () => {
      const fab = L.fromArray([(x: number) => x * 2, (x: number) => x * 3])
      const fa = L.fromArray([1, 2, 3])

      assert.deepStrictEqual(L.Apply.ap(fab, L.fromArray([])), L.fromArray([]))
      assert.deepStrictEqual(L.Apply.ap(fab, fa), L.fromArray([2, 4, 6, 3, 6, 9]))
    })

    it('apFirst', () => {
      const fa = L.fromArray([1, 2])
      const fb = L.fromArray(['a', 'b', 'c'])

      assert.deepStrictEqual(pipe(L.fromArray([]), L.apFirst(L.fromArray([1, 2]))), L.fromArray([]))
      assert.deepStrictEqual(pipe(fa, L.apFirst(fb)), L.fromArray([1, 1, 1, 2, 2, 2]))
    })

    it('apSecond', () => {
      const fa = L.fromArray([1, 2])
      const fb = L.fromArray(['a', 'b', 'c'])

      assert.deepStrictEqual(pipe(fa, L.apSecond(L.fromArray([]))), L.fromArray([]))
      assert.deepStrictEqual(pipe(fa, L.apSecond(fb)), L.fromArray(['a', 'b', 'c', 'a', 'b', 'c']))
    })

    it('chain', () => {
      const a = L.fromArray([1, 2, 3, 4])
      const b = L.fromArray([])

      assert.deepStrictEqual(
        L.Monad.chain(a, () => L.of(1)),
        L.fromArray([1, 1, 1, 1])
      )
      assert.deepStrictEqual(
        pipe(
          b,
          L.chain(() => L.of(1))
        ),
        L.fromArray([])
      )
    })

    it('chainFirst', () => {
      const list = L.fromArray([1, 2, 3])

      assert.deepStrictEqual(
        pipe(
          list,
          L.chainFirst(() => L.of(1))
        ),
        L.fromArray([1, 2, 3])
      )
    })

    it('reduce', () => {
      const f = (a: number, b: number): number => a + b

      assert.deepStrictEqual(pipe(L.fromArray([]), L.reduce(0, f)), 0)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.reduce(0, f)), 6)
    })

    it('reduceRight', () => {
      const f = (a: number, b: number): number => a * b

      assert.deepStrictEqual(pipe(L.fromArray([]), L.reduceRight(1, f)), 1)
      assert.deepStrictEqual(pipe(L.fromArray([2, 3, 4]), L.reduceRight(1, f)), 24)
    })

    it('foldMap', () => {
      const M = monoidSum
      const f = identity

      assert.deepStrictEqual(L.Foldable.foldMap(M)(L.fromArray([]), f), 0)
      assert.deepStrictEqual(pipe(L.fromArray([1, 2, 3]), L.foldMap(M)(f)), 6)
    })

    it('traverse', () => {
      const traverseLO = L.Traversable.traverse(O.option)
      const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.some(n) : O.none)

      assert.deepStrictEqual(traverseLO(L.fromArray([]), f), O.some(L.nil))
      assert.deepStrictEqual(traverseLO(L.fromArray([1, 2, 3]), f), O.none)
      assert.deepStrictEqual(traverseLO(L.fromArray([2, 4, 6]), f), O.some(L.fromArray([2, 4, 6])))
    })

    it('sequence', () => {
      const sequenceLO = L.sequence(O.option)

      assert.deepStrictEqual(sequenceLO(L.fromArray([])), O.some(L.nil))
      assert.deepStrictEqual(sequenceLO(L.fromArray([O.some(1), O.none, O.some(3)])), O.none)
      assert.deepStrictEqual(sequenceLO(L.fromArray([O.some(1), O.some(2), O.some(3)])), O.some(L.fromArray([1, 2, 3])))
    })

    it('of', () => {
      assert.deepStrictEqual(L.of('a'), L.fromArray(['a']))
    })
  })

  describe('instances', () => {
    it('URI', () => {
      assert.strictEqual(L.URI, 'List')
    })

    it('getEq', () => {
      const E = L.getEq(eqNumber)

      assert.strictEqual(E.equals(L.fromArray([]), L.fromArray([])), true)
      assert.strictEqual(E.equals(L.fromArray([1, 2, 3]), L.fromArray([1, 2])), false)
      assert.strictEqual(E.equals(L.fromArray([1, 2, 3]), L.fromArray([1, 2, 3])), true)
      assert.strictEqual(E.equals(L.fromArray([1, 2, 3]), L.fromArray([4, 5, 6])), false)
    })

    it('getShow', () => {
      const S = L.getShow(showNumber)
      const a = L.fromArray([])
      const b = L.fromArray([1, 2, 3, 4])

      assert.deepStrictEqual(S.show(a), 'Nil')
      assert.deepStrictEqual(S.show(b), '(1 : 2 : 3 : 4 : Nil)')
    })

    it('getSemigroup', () => {
      const a = L.fromArray([])
      const b = L.fromArray([1, 2, 3, 4])
      const c = L.fromArray([5, 6, 7])

      assert.deepStrictEqual(L.getSemigroup<number>().concat(a, a), L.fromArray([]))
      assert.deepStrictEqual(L.getSemigroup<number>().concat(a, b), L.fromArray([1, 2, 3, 4]))
      assert.deepStrictEqual(L.getSemigroup<number>().concat(b, c), L.fromArray([1, 2, 3, 4, 5, 6, 7]))
    })

    it('getMonoid', () => {
      const a = L.fromArray([])
      const b = L.fromArray([1, 2, 3, 4])
      const c = L.fromArray([5, 6, 7])

      assert.deepStrictEqual(L.getMonoid<number>().concat(a, a), L.fromArray([]))
      assert.deepStrictEqual(L.getMonoid<number>().concat(a, b), L.fromArray([1, 2, 3, 4]))
      assert.deepStrictEqual(L.getMonoid<number>().concat(b, c), L.fromArray([1, 2, 3, 4, 5, 6, 7]))
    })
  })

  describe('do', () => {
    it('bindTo', () => {
      const a = L.fromArray([1, 2, 3])

      assert.deepStrictEqual(pipe(a, L.bindTo('a')), L.fromArray([{ a: 1 }, { a: 2 }, { a: 3 }]))
    })

    it('bind', () => {
      const a = L.fromArray([1, 2, 3])
      const b = L.fromArray([4, 5, 6])

      assert.deepStrictEqual(
        pipe(
          a,
          L.bindTo('a'),
          L.bind('b', () => b)
        ),
        L.fromArray([
          { a: 1, b: 4 },
          { a: 1, b: 5 },
          { a: 1, b: 6 },
          { a: 2, b: 4 },
          { a: 2, b: 5 },
          { a: 2, b: 6 },
          { a: 3, b: 4 },
          { a: 3, b: 5 },
          { a: 3, b: 6 }
        ])
      )
    })
  })

  describe('pipeable sequence S', () => {
    it('apS', () => {
      assert.deepStrictEqual(pipe(L.of(1), L.bindTo('a'), L.apS('b', L.of('b'))), L.fromArray([{ a: 1, b: 'b' }]))
    })
  })
})
