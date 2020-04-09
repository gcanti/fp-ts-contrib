/**
 * Recursion schemes are simple, composable combinators, that automate the process of traversing and recursing through nested data structures.
 * @since 0.1.16
 */
import { Either, fold } from 'fp-ts/lib/Either'
import { Functor1 } from 'fp-ts/lib/Functor'
import { Kind, URIS } from 'fp-ts/lib/HKT'

/**
 * Abstractly specify the initial algebra of a Functor F as its fixed point.
 * @since 0.1.16
 */
export interface Fix<F extends URIS> {
  readonly unfix: Kind<F, Fix<F>>
}

/**
 * Construct a fixed point (invariant) for an F-Algebra.
 * @since 0.1.16
 */
export function fix<F extends URIS>(unfix: Kind<F, Fix<F>>): Fix<F> {
  return {
    unfix
  }
}

/**
 * @since 0.1.16
 */
export interface Algebra<F extends URIS, A> {
  (_: Kind<F, A>): A
}

/**
 * Catamorphisms provide generalizations of folds of lists to arbitrary algebraic data types, which can be described as initial F-Algebras.
 * @since 0.1.16
 */
export function cata<F extends URIS>(F: Functor1<F>): <A>(alg: Algebra<F, A>) => (_: Fix<F>) => A {
  return alg => _ => alg(F.map(_.unfix, cata(F)(alg)))
}

/**
 * @since 0.1.16
 */
export interface Coalgebra<F extends URIS, A> {
  (_: A): Kind<F, A>
}

/**
 * Anamorphisms are generic functions that can corecursively construct a result of a certain type and which is parameterized by functions that determine the next single step of the construction.
 * @since 0.1.16
 */
export function ana<F extends URIS>(F: Functor1<F>): <A>(coalg: Coalgebra<F, A>) => (a: A) => Fix<F> {
  return coalg => a => ({
    unfix: F.map(coalg(a), ana(F)(coalg))
  })
}

/**
 * Hylomorphisms are recursive functions, corresponding to the composition of anamorphisms followed by a catamorphisms
 * @since 0.1.16
 */
export function hylo<F extends URIS>(
  F: Functor1<F>
): <A, B>(alg: Algebra<F, B>, coalg: Coalgebra<F, A>) => (a: A) => B {
  return (alg, coalg) => a => alg(F.map(coalg(a), hylo(F)(alg, coalg)))
}

/**
 * @since 0.1.16
 */
export interface RAlgebra<F extends URIS, A> {
  (_: Kind<F, [Fix<F>, A]>): A
}

/**
 * Paramorphisms are extensions of the concept of catamorphisms to deal with a form which consumes its state
 * @since 0.1.16
 */
export function para<F extends URIS>(F: Functor1<F>): <A>(ralg: RAlgebra<F, A>) => (_: Fix<F>) => A {
  return ralg => x => ralg(F.map(x.unfix, _ => [_, para(F)(ralg)(_)]))
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra<F extends URIS, A> {
  (_: A): Kind<F, Either<Fix<F>, A>>
}

/**
 * Apomorphisms are extensions of the concept of anamorphisms dual to paramorphisms
 * @since 0.1.16
 */
export function apo<F extends URIS>(F: Functor1<F>): <A>(coalg: RCoalgebra<F, A>) => (a: A) => Fix<F> {
  return coalg => a => ({
    unfix: F.map(
      coalg(a),
      fold(
        x => x,
        x => apo(F)(coalg)(x)
      )
    )
  })
}

/**
 * @since 0.1.16
 */
export interface ZDist<F extends URIS, A, B> {
  (_: Kind<F, [A, B]>): A
}

/**
 * Zygomorphisms are extensions of the concept of paramorphisms instead of passing original term, we transform it using an auxiliary algebra.
 * @since 0.1.16
 */
export function zygo<F extends URIS>(
  F: Functor1<F>
): <B>(f: Algebra<F, B>) => <A>(g: ZDist<F, A, B>) => (_: Fix<F>) => A {
  return <B>(f: (_: Kind<F, B>) => B) => <A>(g: (_: Kind<F, [A, B]>) => A) => (_: Fix<F>): A =>
    cata(F)((H: Kind<F, [A, B]>) => [g(H), f(F.map(H, _ => _[1]))] as [A, B])(_)[0]
}
