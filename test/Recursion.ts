import * as assert from 'assert'
import * as Alg from '../src/Recursion'
import { Functor1 } from 'fp-ts/lib/Functor'
import { right, left } from 'fp-ts/lib/Either'

type ConstF = {
  readonly _tag: 'ConstF'
  readonly d: number
}

type VarF = {
  readonly _tag: 'VarF'
  readonly s: string
}

type TimesF<R> = {
  readonly _tag: 'TimesF'
  readonly l: R
  readonly r: R
}

type PlusF<R> = {
  readonly _tag: 'PlusF'
  readonly l: R
  readonly r: R
}

type ExprF<R> = ConstF | VarF | TimesF<R> | PlusF<R>

const URI = 'RS/ExprF'
type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: ExprF<A>
  }
}

type Ex = Alg.Fix1<URI>

const functor: Functor1<URI> = {
  URI,
  map: (fa, f) => {
    switch (fa._tag) {
      case 'ConstF':
        return {
          _tag: fa._tag,
          d: fa.d
        }
      case 'VarF':
        return {
          _tag: fa._tag,
          s: fa.s
        }
      case 'PlusF':
        return {
          _tag: fa._tag,
          l: f(fa.l),
          r: f(fa.r)
        }
      case 'TimesF':
        return {
          _tag: fa._tag,
          l: f(fa.l),
          r: f(fa.r)
        }
    }
  }
}

const v = (s: string): Ex =>
  Alg.fix({
    _tag: 'VarF',
    s
  })

const num = (d: number): Ex =>
  Alg.fix({
    _tag: 'ConstF',
    d
  })

const mul = (l: Ex, r: Ex): Ex =>
  Alg.fix({
    _tag: 'TimesF',
    l,
    r
  })

const add = (l: Ex, r: Ex): Ex =>
  Alg.fix({
    _tag: 'PlusF',
    l,
    r
  })

const pretty: Alg.Algebra1<URI, string> = _ => {
  switch (_._tag) {
    case 'ConstF':
      return `${_.d}`
    case 'PlusF':
      return `${_.l} + ${_.r}`
    case 'TimesF':
      return `${_.l} * ${_.r}`
    case 'VarF':
      return _.s
  }
}

const pretty2: Alg.Algebra1<URI, string> = _ => {
  switch (_._tag) {
    case 'ConstF':
      return `${_.d}`
    case 'PlusF':
      return `${_.l} + ${_.r}`
    case 'TimesF':
      return _.l === _.r
        ? `${_.l}^2`
        : _.l.indexOf('^') !== -1
        ? _.l.split('^')[0] === _.r
          ? `${_.r}^${parseInt(_.l.split('^')[1], 10) + 1}`
          : `${_.l} * ${_.r}`
        : `${_.l} * ${_.r}`
    case 'VarF':
      return _.s
  }
}

const prettyP: Alg.RAlgebra1<URI, string> = _ => {
  switch (_._tag) {
    case 'ConstF':
      return `${_.d}`
    case 'PlusF':
      return `(${_.l[0].unfix._tag}) ${_.l[1]} + ${_.r[1]} (${_.r[0].unfix._tag})`
    case 'TimesF':
      return `${_.l[1]} * ${_.r[1]}`
    case 'VarF':
      return _.s
  }
}

const ex = add(mul(v('x'), v('x')), add(mul(num(3), v('x')), num(4)))
const ex2 = add(mul(mul(v('x'), v('x')), v('x')), add(mul(num(3), v('x')), num(4)))

const coalg: Alg.Coalgebra1<URI, number> = n => {
  switch (n) {
    case 0:
      return {
        _tag: 'ConstF',
        d: 2
      }
    case 1:
      return {
        _tag: 'ConstF',
        d: 3
      }
    default:
      return {
        _tag: 'TimesF',
        l: n - 2,
        r: n - 1
      }
  }
}

const coalgR: Alg.RCoalgebra1<URI, number> = n => {
  switch (n) {
    case 0:
      return {
        _tag: 'ConstF',
        d: 2
      }
    case 1:
      return {
        _tag: 'ConstF',
        d: 3
      }
    default:
      return {
        _tag: 'TimesF',
        l: left(num(1)),
        r: right(n - 1)
      }
  }
}

describe('Recursion', () => {
  it('cata', () => {
    assert.strictEqual(Alg.cata(functor)(pretty)(ex), 'x * x + 3 * x + 4')
    assert.strictEqual(Alg.cata(functor)(pretty2)(ex), 'x^2 + 3 * x + 4')
    assert.strictEqual(Alg.cata(functor)(pretty2)(ex2), 'x^3 + 3 * x + 4')
  })

  it('para', () => {
    assert.strictEqual(Alg.para(functor)(prettyP)(ex), '(TimesF) x * x + (TimesF) 3 * x + 4 (ConstF) (PlusF)')
  })

  it('ana', () => {
    assert.strictEqual(Alg.cata(functor)(pretty2)(Alg.ana(functor)(coalg)(3)), '3 * 2 * 3')
  })

  it('apo', () => {
    assert.strictEqual(Alg.cata(functor)(pretty2)(Alg.apo(functor)(coalgR)(3)), '1 * 1 * 3')
  })

  it('hylo', () => {
    assert.strictEqual(Alg.hylo(functor)(pretty2, coalg)(3), '3 * 2 * 3')
  })
})
