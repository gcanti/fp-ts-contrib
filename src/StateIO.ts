import { Endomorphism, tuple } from 'fp-ts/lib/function'
import { IO, io } from 'fp-ts/lib/IO'
import { Monad2 } from 'fp-ts/lib/Monad'
import { State } from 'fp-ts/lib/State'
import * as stateT from 'fp-ts/lib/StateT'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    StateIO: StateIO<L, A>
  }
}

const stateTIO = stateT.getStateT2v(io)

export const URI = 'StateIO'

export type URI = typeof URI

export class StateIO<S, A> {
  readonly _A!: A
  readonly _L!: S
  readonly _URI!: URI
  constructor(readonly value: (s: S) => IO<[A, S]>) {}
  run(s: S): [A, S] {
    return this.value(s).run()
  }
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: (a: A) => B): StateIO<S, B> {
    return new StateIO(stateTIO.map(this.value, f))
  }
  ap<B>(fab: StateIO<S, (a: A) => B>): StateIO<S, B> {
    return new StateIO(stateTIO.ap(fab.value, this.value))
  }
  ap_<B, C>(this: StateIO<S, (b: B) => C>, fb: StateIO<S, B>): StateIO<S, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => StateIO<S, B>): StateIO<S, B> {
    return new StateIO(stateTIO.chain(this.value, a => f(a).value))
  }
}

const map = <S, A, B>(fa: StateIO<S, A>, f: (a: A) => B): StateIO<S, B> => {
  return fa.map(f)
}

const of = <S, A>(a: A): StateIO<S, A> => {
  return new StateIO(stateTIO.of(a))
}

const ap = <S, A, B>(fab: StateIO<S, (a: A) => B>, fa: StateIO<S, A>): StateIO<S, B> => {
  return fa.ap(fab)
}

const chain = <S, A, B>(fa: StateIO<S, A>, f: (a: A) => StateIO<S, B>): StateIO<S, B> => {
  return fa.chain(f)
}

export const get = <S>(): StateIO<S, S> => {
  return new StateIO(s => io.of(tuple(s, s)))
}

const stateTput = stateT.put(io)
export const put = <S>(s: S): StateIO<S, void> => {
  return new StateIO(stateTput(s))
}

const stateTmodify = stateT.modify(io)
export const modify = <S>(f: Endomorphism<S>): StateIO<S, void> => {
  return new StateIO(stateTmodify(f))
}

const stateTgets = stateT.gets(io)
export const gets = <S, A>(f: (s: S) => A): StateIO<S, A> => {
  return new StateIO(stateTgets(f))
}

const stateTliftF = stateT.liftF(io)
export const fromIO = <S, A>(fa: IO<A>): StateIO<S, A> => {
  return new StateIO(stateTliftF(fa))
}

const stateTfromState = stateT.fromState(io)
export const fromState = <S, A>(fa: State<S, A>): StateIO<S, A> => {
  return new StateIO(stateTfromState(fa))
}

export const stateIO: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
