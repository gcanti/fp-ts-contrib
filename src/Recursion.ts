/**
 * Recursion schemes are simple, composable combinators, that automate the process of traversing and recursing through nested data structures.
 * @since 0.1.16
 */
import { Functor1, Functor, Functor2, Functor3, Functor4 } from 'fp-ts/lib/Functor'
import { URIS, Kind, HKT, Kind2, URIS2, URIS3, Kind3, URIS4, Kind4 } from 'fp-ts/lib/HKT'
import { Either, fold } from 'fp-ts/lib/Either'

/**
 * @since 0.1.16
 */
export interface Algebra<F, A> {
  (_: HKT<F, A>): A
}

/**
 * @since 0.1.16
 */
export interface Algebra1<F extends URIS, A> {
  (_: Kind<F, A>): A
}

/**
 * @since 0.1.16
 */
export interface Algebra2<F extends URIS2, E, A> {
  (_: Kind2<F, E, A>): A
}

/**
 * @since 0.1.16
 */
export interface Algebra3<F extends URIS3, R, E, A> {
  (_: Kind3<F, R, E, A>): A
}

/**
 * @since 0.1.16
 */
export interface Algebra4<F extends URIS4, S, R, E, A> {
  (_: Kind4<F, S, R, E, A>): A
}

/**
 * Abstractly specify the initial algebra of a Functor F as its fixed point.
 * @since 0.1.16
 */
export interface Fix<F> {
  readonly unfix: HKT<F, Fix<F>>
}

/**
 * @since 0.1.16
 */
export interface Fix1<F extends URIS> {
  readonly unfix: Kind<F, Fix1<F>>
}

/**
 * @since 0.1.16
 */
export interface Fix2<F extends URIS2, E> {
  readonly unfix: Kind2<F, E, Fix2<F, E>>
}

/**
 * @since 0.1.16
 */
export interface Fix3<F extends URIS3, R, E> {
  readonly unfix: Kind3<F, R, E, Fix3<F, R, E>>
}

/**
 * @since 0.1.16
 */
export interface Fix4<F extends URIS4, S, R, E> {
  readonly unfix: Kind4<F, S, R, E, Fix4<F, S, R, E>>
}

/**
 * Construct a fixed point (invariant) for an F-Algebra.
 * @since 0.1.16
 */
export function fix<F extends URIS>(unfix: Kind<F, Fix1<F>>): Fix1<F>
export function fix<F extends URIS2, E>(unfix: Kind2<F, E, Fix2<F, E>>): Fix2<F, E>
export function fix<F extends URIS3, R, E>(unfix: Kind3<F, R, E, Fix3<F, R, E>>): Fix3<F, R, E>
export function fix<F extends URIS4, S, R, E>(unfix: Kind4<F, S, R, E, Fix4<F, S, R, E>>): Fix4<F, S, R, E>
export function fix<F>(unfix: HKT<F, Fix<F>>): Fix<F> {
  return {
    unfix
  }
}

function cata_<F>(F: Functor<F>): <A>(alg: Algebra<F, A>) => (_: Fix<F>) => A {
  return alg => _ => alg(F.map(_.unfix, cata_(F)(alg)))
}

/**
 * Catamorphisms provide generalizations of folds of lists to arbitrary algebraic data types, which can be described as initial F-Algebras.
 * @since 0.1.16
 */
export function cata<F extends URIS>(F: Functor1<F>): <A>(alg: Algebra1<F, A>) => (_: Fix1<F>) => A
export function cata<F extends URIS2>(F: Functor2<F>): <E, A>(alg: Algebra2<F, E, A>) => (_: Fix2<F, E>) => A
export function cata<F extends URIS3>(F: Functor3<F>): <R, E, A>(alg: Algebra3<F, R, E, A>) => (_: Fix3<F, R, E>) => A
export function cata<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(alg: Algebra4<F, S, R, E, A>) => (_: Fix4<F, S, R, E>) => A
export function cata<F>(F: Functor<F>): <A>(alg: Algebra<F, A>) => (_: Fix<F>) => A {
  return cata_(F)
}

/**
 * @since 0.1.16
 */
export interface Coalgebra<F, A> {
  (_: A): HKT<F, A>
}

/**
 * @since 0.1.16
 */
export interface Coalgebra1<F extends URIS, A> {
  (_: A): Kind<F, A>
}

/**
 * @since 0.1.16
 */
export interface Coalgebra2<F extends URIS2, E, A> {
  (_: A): Kind2<F, E, A>
}

/**
 * @since 0.1.16
 */
export interface Coalgebra3<F extends URIS3, R, E, A> {
  (_: A): Kind3<F, R, E, A>
}

/**
 * @since 0.1.16
 */
export interface Coalgebra4<F extends URIS4, S, R, E, A> {
  (_: A): Kind4<F, S, R, E, A>
}

function ana_<F>(F: Functor<F>): <A>(coalg: Coalgebra<F, A>) => (a: A) => Fix<F> {
  return coalg => a => ({
    unfix: F.map(coalg(a), ana_(F)(coalg))
  })
}

/**
 * Anamorphisms are generic functions that can corecursively construct a result of a certain type and which is parameterized by functions that determine the next single step of the construction.
 * @since 0.1.16
 */
export function ana<F extends URIS>(F: Functor1<F>): <A>(coalg: Coalgebra1<F, A>) => (a: A) => Fix1<F>
export function ana<F extends URIS2>(F: Functor2<F>): <E, A>(coalg: Coalgebra2<F, E, A>) => (a: A) => Fix2<F, E>
export function ana<F extends URIS3>(
  F: Functor3<F>
): <R, E, A>(coalg: Coalgebra3<F, R, E, A>) => (a: A) => Fix3<F, R, E>
export function ana<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(coalg: Coalgebra4<F, S, R, E, A>) => (a: A) => Fix4<F, S, R, E>
export function ana<F>(F: Functor<F>): <A>(coalg: Coalgebra<F, A>) => (a: A) => Fix<F> {
  return ana_(F)
}

function hylo_<F>(F: Functor<F>): <A, B>(alg: Algebra<F, B>, coalg: Coalgebra<F, A>) => (a: A) => B {
  return (alg, coalg) => a => alg(F.map(coalg(a), hylo_(F)(alg, coalg)))
}

/**
 * Hylomorphisms are recursive functions, corresponding to the composition of anamorphisms followed by a catamorphisms
 * @since 0.1.16
 */
export function hylo<F extends URIS>(
  F: Functor1<F>
): <A, B>(alg: Algebra1<F, B>, coalg: Coalgebra1<F, A>) => (a: A) => B
export function hylo<F extends URIS2>(
  F: Functor2<F>
): <E, A, B>(alg: Algebra2<F, E, B>, coalg: Coalgebra2<F, E, A>) => (a: A) => B
export function hylo<F extends URIS3>(
  F: Functor3<F>
): <R, E, A, B>(alg: Algebra3<F, R, E, B>, coalg: Coalgebra3<F, R, E, A>) => (a: A) => B
export function hylo<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A, B>(alg: Algebra4<F, S, R, E, B>, coalg: Coalgebra4<F, S, R, E, A>) => (a: A) => B
export function hylo<F>(F: Functor<F>): <A, B>(alg: Algebra<F, B>, coalg: Coalgebra<F, A>) => (a: A) => B {
  return hylo_(F)
}

/**
 * @since 0.1.16
 */
export interface RAlgebra<F, A> {
  (_: HKT<F, [Fix<F>, A]>): A
}

/**
 * @since 0.1.16
 */
export interface RAlgebra1<F extends URIS, A> {
  (_: Kind<F, [Fix1<F>, A]>): A
}

/**
 * @since 0.1.16
 */
export interface RAlgebra2<F extends URIS2, E, A> {
  (_: Kind2<F, E, [Fix2<F, E>, A]>): A
}

/**
 * @since 0.1.16
 */
export interface RAlgebra3<F extends URIS3, R, E, A> {
  (_: Kind3<F, R, E, [Fix3<F, R, E>, A]>): A
}

/**
 * @since 0.1.16
 */
export interface RAlgebra4<F extends URIS4, S, R, E, A> {
  (_: Kind4<F, S, R, E, [Fix4<F, S, R, E>, A]>): A
}

function para_<F>(F: Functor<F>): <A>(ralg: RAlgebra<F, A>) => (_: Fix<F>) => A {
  return ralg => x => ralg(F.map(x.unfix, _ => [_, para_(F)(ralg)(_)]))
}

/**
 * Paramorphisms are extensions of the concept of catamorphisms to deal with a form which consumes its state
 * @since 0.1.16
 */
export function para<F extends URIS>(F: Functor1<F>): <A>(ralg: RAlgebra1<F, A>) => (_: Fix1<F>) => A
export function para<F extends URIS2>(F: Functor2<F>): <E, A>(ralg: RAlgebra2<F, E, A>) => (_: Fix2<F, E>) => A
export function para<F extends URIS3>(F: Functor3<F>): <R, E, A>(ralg: RAlgebra3<F, R, E, A>) => (_: Fix3<F, R, E>) => A
export function para<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(ralg: RAlgebra4<F, S, R, E, A>) => (_: Fix4<F, S, R, E>) => A
export function para<F>(F: Functor<F>): <A>(ralg: RAlgebra<F, A>) => (_: Fix<F>) => A {
  return para_(F)
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra<F, A> {
  (_: A): HKT<F, Either<Fix<F>, A>>
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra1<F extends URIS, A> {
  (_: A): Kind<F, Either<Fix1<F>, A>>
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra2<F extends URIS2, E, A> {
  (_: A): Kind2<F, E, Either<Fix2<F, E>, A>>
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra3<F extends URIS3, R, E, A> {
  (_: A): Kind3<F, R, E, Either<Fix3<F, R, E>, A>>
}

/**
 * @since 0.1.16
 */
export interface RCoalgebra4<F extends URIS4, S, R, E, A> {
  (_: A): Kind4<F, S, R, E, Either<Fix4<F, S, R, E>, A>>
}

function apo_<F>(F: Functor<F>): <A>(coalg: RCoalgebra<F, A>) => (a: A) => Fix<F> {
  return coalg => a => ({
    unfix: F.map(
      coalg(a),
      fold(
        x => x,
        x => apo_(F)(coalg)(x)
      )
    )
  })
}

/**
 * Apomorphisms are extensions of the concept of anamorphisms dual to paramorphisms
 * @since 0.1.16
 */
export function apo<F extends URIS>(F: Functor1<F>): <A>(coalg: RCoalgebra1<F, A>) => (a: A) => Fix1<F>
export function apo<F extends URIS2>(F: Functor2<F>): <E, A>(coalg: RCoalgebra2<F, E, A>) => (a: A) => Fix2<F, E>
export function apo<F extends URIS3>(
  F: Functor3<F>
): <R, E, A>(coalg: RCoalgebra3<F, R, E, A>) => (a: A) => Fix3<F, R, E>
export function apo<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(coalg: RCoalgebra4<F, S, R, E, A>) => (a: A) => Fix4<F, S, R, E>
export function apo<F>(F: Functor<F>): <A>(coalg: RCoalgebra<F, A>) => (a: A) => Fix<F> {
  return apo_(F)
}
