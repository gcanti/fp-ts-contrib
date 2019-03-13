import * as assert from 'assert'
import { constant, Function1, tuple } from 'fp-ts/lib/function'
import {
  ifS,
  when,
  branch,
  or,
  and,
  any,
  all,
  Selective2C,
  getValidationSelective,
  selectiveOption,
  selectiveTask
} from '../src/Selective'
import { some } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'
import { URIS2, Type2 } from 'fp-ts/lib/HKT'
import { success, failure } from 'fp-ts/lib/Validation'
import { liftA2 } from 'fp-ts/lib/Apply'
import { getArrayMonoid } from 'fp-ts/lib/Monoid'

describe('Selective', () => {
  it('branch', () => {
    const add: Function1<number, number> = a => a + a
    const length: Function1<string, number> = a => a.length
    const addSpy = jest.fn(add)
    const lengthSpy = jest.fn(length)
    assert.deepStrictEqual(
      branch(selectiveOption)(some(left<string, number>('foo')), some(lengthSpy), some(addSpy)),
      some(3)
    )
    assert.deepStrictEqual(addSpy.mock.calls.length, 0)
    assert.deepStrictEqual(lengthSpy.mock.calls.length, 1)
    assert.deepStrictEqual(
      branch(selectiveOption)(some(right<string, number>(2)), some(lengthSpy), some(addSpy)),
      some(4)
    )
    assert.deepStrictEqual(addSpy.mock.calls.length, 1)
    assert.deepStrictEqual(lengthSpy.mock.calls.length, 1)
  })

  it('ifS', () => {
    const one = constant(1)
    const two = constant(2)
    const oneSpy = jest.fn(one)
    const twoSpy = jest.fn(two)
    assert.deepStrictEqual(
      ifS(selectiveOption)(some(true), some(oneSpy), some(twoSpy)).map(f => f()),
      some(one).map(f => f())
    )
    assert.deepStrictEqual(oneSpy.mock.calls.length, 1)
    assert.deepStrictEqual(twoSpy.mock.calls.length, 0)
    assert.deepStrictEqual(
      ifS(selectiveOption)(some(false), some(oneSpy), some(twoSpy)).map(f => f()),
      some(two).map(f => f())
    )
    assert.deepStrictEqual(oneSpy.mock.calls.length, 1)
    assert.deepStrictEqual(twoSpy.mock.calls.length, 1)
  })

  it('when', () => {
    const e = jest.fn()
    assert.deepStrictEqual(when(selectiveOption)(some(false), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 0)
    assert.deepStrictEqual(when(selectiveOption)(some(true), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 1)

    return Promise.all([
      when(selectiveTask)(selectiveTask.of(false), selectiveTask.of(e)).run(),
      selectiveTask.of(undefined).run()
    ])
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 1)
      })
      .then(() =>
        Promise.all([
          when(selectiveTask)(selectiveTask.of(true), selectiveTask.of(e)).run(),
          selectiveTask.of(undefined).run()
        ])
      )
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 2)
      })
  })

  it('or', () => {
    assert.deepStrictEqual(or(selectiveOption)(some(false), some(false)), some(false))
    assert.deepStrictEqual(or(selectiveOption)(some(true), some(false)), some(true))
    assert.deepStrictEqual(or(selectiveOption)(some(false), some(true)), some(true))
    assert.deepStrictEqual(or(selectiveOption)(some(true), some(true)), some(true))
  })

  it('and', () => {
    assert.deepStrictEqual(and(selectiveOption)(some(false), some(false)), some(false))
    assert.deepStrictEqual(and(selectiveOption)(some(true), some(false)), some(false))
    assert.deepStrictEqual(and(selectiveOption)(some(false), some(true)), some(false))
    assert.deepStrictEqual(and(selectiveOption)(some(true), some(true)), some(true))
  })

  it('any', () => {
    assert.deepStrictEqual(any(selectiveOption)([false, false], selectiveOption.of), some(false))
    assert.deepStrictEqual(any(selectiveOption)([false, true], selectiveOption.of), some(true))
    assert.deepStrictEqual(any(selectiveOption)([true, true], selectiveOption.of), some(true))
  })

  it('all', () => {
    assert.deepStrictEqual(all(selectiveOption)([false, false], selectiveOption.of), some(false))
    assert.deepStrictEqual(all(selectiveOption)([false, true], selectiveOption.of), some(false))
    assert.deepStrictEqual(all(selectiveOption)([true, true], selectiveOption.of), some(true))
  })

  it('Validation', () => {
    // type Radius = Word; type Width = Word; type Height = Word
    // data Shape = Circle Radius | Rectangle Width Height
    // shape :: Selective f => f Bool -> f Radius -> f Width -> f Height -> f Shape
    // shape x r w h = ifS x (Circle <$> r) (Rectangle <$> w <*> h)
    type Radius = number
    type Width = number
    type Height = number
    type Shape = { type: 'Circle'; radius: Radius } | { type: 'Square'; width: Width; height: Height }
    const circle = (radius: Radius): Shape => ({ type: 'Circle', radius })
    const square = (width: Width): ((height: Height) => Shape) => height => ({ type: 'Square', width, height })
    function shape<F extends URIS2>(S: Selective2C<F, Array<string>>) {
      const ifS_ = ifS(S)
      return (
        x: Type2<F, Array<string>, boolean>,
        r: Type2<F, Array<string>, Radius>,
        w: Type2<F, Array<string>, Width>,
        h: Type2<F, Array<string>, Height>
      ): Type2<F, Array<string>, Shape> => ifS_(x, S.map(r, circle), liftA2(S)(square)(w)(h))
    }

    // λ> shape (Success True) (Success 1) (Failure ["width?"]) (Failure ["height?"])
    // Success (Circle 1)
    // λ> shape (Success False) (Failure ["radius?"]) (Success 2) (Success 3)
    // Success (Rectangle 2 3)
    // λ> shape (Success False) (Success 1) (Failure ["width?"]) (Failure ["height?"])
    // Failure ["width?", "height?"]
    // λ> shape (Failure ["choice?"]) (Failure ["radius?"]) (Success 2) (Failure ["height?"])
    // Failure ["choice?"]
    const validationS = getValidationSelective(getArrayMonoid<string>())
    const vShape = shape(validationS)
    assert.deepStrictEqual(
      vShape(success(true), success(1), failure(['width?']), failure(['height?'])),
      success(circle(1))
    )
    assert.deepStrictEqual(vShape(success(false), failure(['radius?']), success(2), success(3)), success(square(2)(3)))
    assert.deepStrictEqual(
      vShape(success(false), success(1), failure(['width?']), failure(['height?'])),
      failure(['width?', 'height?'])
    )
    assert.deepStrictEqual(
      vShape(failure(['choice?']), failure(['radius?']), success(2), failure(['height?'])),
      failure(['choice?'])
    )

    // twoShapes :: Selective f => f Shape -> f Shape -> f (Shape, Shape)
    // twoShapes s1 s2 = (,) <$> s1 <*> s2
    function twoShapes<F extends URIS2>(S: Selective2C<F, Array<string>>) {
      return (
        s1: Type2<F, Array<string>, Shape>,
        s2: Type2<F, Array<string>, Shape>
      ): Type2<F, Array<string>, [Shape, Shape]> => S.ap(S.map(s1, (s1: Shape) => (s2: Shape) => tuple(s1, s2)), s2)
    }

    // λ> s1 = shape (Failure ["choice 1?"]) (Success 1) (Failure ["width 1?"]) (Success 3)
    // λ> s2 = shape (Success False) (Success 1) (Success 2) (Failure ["height 2?"])
    // λ> twoShapes s1 s2
    // Failure ["choice 1?","height 2?"]
    const s1 = vShape(failure(['choice 1?']), success(1), failure(['width 1?']), success(3))
    const s2 = vShape(success(false), success(1), success(2), failure(['height 2?']))
    assert.deepStrictEqual(twoShapes(validationS)(s1, s2), failure(['choice 1?', 'height 2?']))
  })
})
