/**
 * Adapted from https://hackage.haskell.org/package/base-4.12.0.0/docs/Control-Concurrent-MVar.html
 *
 * @since 0.1.13
 */
import * as O from 'fp-ts/lib/Option'
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'
import { constVoid } from 'fp-ts/lib/function'

/**
 * @since 0.1.13
 */
class MVar<T> {
  private takeQ: Array<(a: T) => void>
  private putQ: Array<() => void>
  private readQ: Array<(a: T) => void>

  constructor(private value: O.Option<T>) {
    this.takeQ = []
    this.putQ = []
    this.readQ = []
  }

  private enqueueTake(job: (a: T) => void): void {
    this.takeQ = A.snoc(this.takeQ, job)
  }

  private enqueuePut(job: () => void): void {
    this.putQ = A.snoc(this.putQ, job)
  }

  private enqueueRead(job: (a: T) => void): void {
    this.readQ = A.snoc(this.readQ, job)
  }

  take: T.Task<T> = () =>
    new Promise(resolve =>
      pipe(
        this.value,
        O.fold(
          () => this.enqueueTake(a => resolve(a)),
          a => {
            this.value = O.none
            pipe(
              A.head(this.putQ),
              O.fold(constVoid, putJob => {
                this.putQ = A.dropLeft(1)(this.putQ)
                putJob()
              })
            )
            resolve(a)
          }
        )
      )
    )

  put(a: T): T.Task<void> {
    return () =>
      new Promise(resolve =>
        pipe(
          this.value,
          O.fold(
            () => {
              this.value = O.some(a)
              pipe(
                A.head(this.takeQ),
                O.fold(constVoid, takeJob => {
                  this.takeQ = A.dropLeft(1)(this.takeQ)
                  takeJob(a)
                })
              )
              pipe(
                A.head(this.readQ),
                O.fold(constVoid, readJob => {
                  this.readQ = A.dropLeft(1)(this.readQ)
                  readJob(a)
                })
              )
              resolve()
            },
            () =>
              this.enqueuePut(() => {
                this.value = O.some(a)
                resolve()
              })
          )
        )
      )
  }

  read: T.Task<T> = () =>
    new Promise(resolve =>
      pipe(
        this.value,
        O.fold(() => this.enqueueRead(resolve), resolve)
      )
    )

  isEmpty(): boolean {
    return O.isNone(this.value)
  }
}

/**
 * @since 0.1.13
 */
export function newEmptyMVar<T>(): MVar<T> {
  return new MVar<T>(O.none)
}

/**
 * @since 0.1.13
 */
export function newMVar<T>(a: T): MVar<T> {
  return new MVar(O.some(a))
}

/**
 * @since 0.1.13
 */
export function take<T>(mv: MVar<T>): T.Task<T> {
  return mv.take
}

/**
 * @since 0.1.13
 */
export function put<T>(a: T): (mv: MVar<T>) => T.Task<void> {
  return mv => mv.put(a)
}

/**
 * @since 0.1.13
 */
export function read<T>(mv: MVar<T>): T.Task<T> {
  return mv.read
}

/**
 * @since 0.1.13
 */
export function isEmpty<T>(mv: MVar<T>): boolean {
  return mv.isEmpty()
}
