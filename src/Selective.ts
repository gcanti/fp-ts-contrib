/**
 * Definition and implementation of some of the functions from the paper
 * "Selective Applicative Functors" by ANDREY MOKHOV, GEORGY LUKYANOV,
 * SIMON MARLOW, and JEREMIE DIMINO
 * (https://www.staff.ncl.ac.uk/andrey.mokhov/selective-functors.pdf) as well
 * as corresponding haskell library (https://github.com/snowleopard/selective).
 */

import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative4
} from 'fp-ts/lib/Applicative'
import { Either } from 'fp-ts/lib/Either'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'
import { array, either, function as Fn, identity, option, reader } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { Monad, Monad1 } from 'fp-ts/lib/Monad'
import { Eq } from 'fp-ts/lib/Eq'
import { Option } from 'fp-ts/lib/Option'

export interface Selective<F> extends Applicative<F> {
  readonly select: <A, B>(fe: HKT<F, Either<A, B>>, fab: HKT<F, (a: A) => B>) => HKT<F, B>
}

export interface Selective1<F extends URIS> extends Applicative1<F> {
  readonly select: <A, B>(fe: Kind<F, Either<A, B>>, fab: Kind<F, (a: A) => B>) => Kind<F, B>
}

export interface Selective2<F extends URIS2> extends Applicative2<F> {
  readonly select: <E, A, B>(fe: Kind2<F, E, Either<A, B>>, fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

export interface Selective2C<F extends URIS2, E> extends Applicative2C<F, E> {
  readonly select: <A, B>(fe: Kind2<F, E, Either<A, B>>, fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

export interface Selective3<F extends URIS3> extends Applicative3<F> {
  readonly select: <R, E, A, B>(fe: Kind3<F, R, E, Either<A, B>>, fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

export interface Selective4<F extends URIS4> extends Applicative4<F> {
  readonly select: <S, R, E, A, B>(
    fe: Kind4<F, S, R, E, Either<A, B>>,
    fab: Kind4<F, S, R, E, (a: A) => B>
  ) => Kind4<F, S, R, E, B>
}

export function selectA<F>(Ap: Applicative<F>) {
  return <A, B>(fe: HKT<F, Either<A, B>>, fab: HKT<F, (a: A) => B>): HKT<F, B> =>
    Ap.ap(
      Ap.map(fe, e => (f: (a: A) => B) => pipe(e, either.fold(f, Fn.identity))),
      fab
    )
}

export function selectM<F extends URIS>(
  M: Monad1<F>
): <A, B>(fe: Kind<F, Either<A, B>>, fab: Kind<F, (a: A) => B>) => Kind<F, B>
export function selectM<F>(M: Monad<F>) {
  return <A, B>(fe: HKT<F, Either<A, B>>, fab: HKT<F, (a: A) => B>): HKT<F, B> =>
    M.chain(
      fe,
      either.fold(
        a => M.map(fab, ab => ab(a)),
        b => M.of(b)
      )
    )
}

export function apS<F>(S: Selective<F>) {
  return <A, B>(f: HKT<F, (a: A) => B>, x: HKT<F, A>): HKT<F, B> =>
    S.select(S.map(f, either.left), S.map(x, identity.ap as (a: A) => (fab: (a: A) => B) => B))
}

export function whenS<F>(S: Selective<F>) {
  return (x: HKT<F, boolean>, y: HKT<F, void>): HKT<F, void> => S.select(S.map(x, boolFold), S.map(y, Fn.constant))
}

export function branch<F>(S: Selective<F>) {
  return <A, B, C>(fe: HKT<F, Either<A, B>>, fac: HKT<F, (a: A) => C>, fbc: HKT<F, (b: B) => C>): HKT<F, C> =>
    S.select(
      S.select(
        S.map(
          fe,
          either.map(x => either.left(x))
        ),
        S.map(
          fac,
          reader.map(x => either.right(x))
        )
      ),
      fbc
    )
}

const onFalse = either.right(Fn.constVoid())
const onTrue = either.left(Fn.constVoid())
const boolFold = (b: boolean) => (b ? onTrue : onFalse)

export function ifS<F>(S: Selective<F>) {
  const brS = branch(S)
  return <A>(x: HKT<F, boolean>, t: HKT<F, A>, e: HKT<F, A>): HKT<F, A> =>
    brS(S.map(x, boolFold), S.map(t, Fn.constant), S.map(e, Fn.constant))
}

export function orS<F>(S: Selective<F>) {
  const ifs = ifS(S)
  return (a: HKT<F, boolean>, b: HKT<F, boolean>): HKT<F, boolean> => ifs(a, S.of(true), b)
}

export function andS<F>(S: Selective<F>) {
  const ifs = ifS(S)
  return (a: HKT<F, boolean>, b: HKT<F, boolean>): HKT<F, boolean> => ifs(a, b, S.of(false))
}

export function fromMaybeS<F>(S: Selective<F>) {
  return <A>(x: HKT<F, A>, mx: HKT<F, Option<A>>): HKT<F, A> =>
    S.select(S.map(mx, option.fold(Fn.constant(either.left(Fn.constVoid())), either.right)), S.map(x, Fn.constant))
}

export function anyS<F>(S: Selective<F>) {
  const or = orS(S)
  return <A>(p: (a: A) => HKT<F, boolean>, as: Array<A>): HKT<F, boolean> =>
    array.array.reduce(as, S.of<boolean>(false), (fp, a) => or(fp, p(a)))
}

export function allS<F>(S: Selective<F>) {
  const and = andS(S)
  return <A>(p: (a: A) => HKT<F, boolean>, as: Array<A>): HKT<F, boolean> =>
    array.array.reduce(as, S.of<boolean>(true), (fp, a) => and(fp, p(a)))
}

export function eliminate<A, F>(E: Eq<A>, S: Selective<F>) {
  return <B>(x: A, fb: HKT<F, B>, fa: HKT<F, Either<A, B>>): HKT<F, Either<A, B>> =>
    S.select(
      S.map(
        fa,
        either.fold(
          y => (E.equals(x, y) ? either.left(Fn.constVoid()) : either.right(either.left(y))),
          y => either.right(either.right(y))
        )
      ),
      S.map(fb, Fn.flow(either.right, Fn.constant))
    )
}
