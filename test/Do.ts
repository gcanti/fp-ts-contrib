import * as assert from 'assert'
import { option, some, none } from 'fp-ts/lib/Option'
import { Do } from '../src/Do'
import { Task, task, delay } from 'fp-ts/lib/Task'
import { getMonad, success, failure } from 'fp-ts/lib/Validation'
import { either, right, left } from 'fp-ts/lib/Either'
import { getSemigroup, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { time } from '../src/time'
import { io, IO } from 'fp-ts/lib/IO'

describe('Do', () => {
  it('should replay without polluting the scope', () => {
    let count = 0
    const action1 = Do(io)
      .bind(
        'x',
        new IO(() => {
          count += 1
          return count
        })
      )
      .done()
    const x1 = action1.run()
    const x2 = action1.run()
    assert.deepStrictEqual(x1, { x: 1 })
    assert.deepStrictEqual(x2, { x: 2 })
    const action2 = Do(io)
      .sequenceS({
        x: new IO(() => {
          count += 1
          return count
        })
      })
      .done()
    const x3 = action2.run()
    const x4 = action2.run()
    assert.deepStrictEqual(x3, { x: 3 })
    assert.deepStrictEqual(x4, { x: 4 })
  })

  it('should compose options', () => {
    const user = Do(option)
      .bindL('name', () => some('bob'))
      .bindL('email', () => some('bsmith@example.com'))
      .bindL('len', ({ name }) => some(name.length))
      .return(({ name, email, len }) => ({ name, email, len }))

    assert.deepStrictEqual(user, some({ name: 'bob', email: 'bsmith@example.com', len: 3 }))

    const user2 = Do(option)
      .bindL('name', () => some('bob'))
      .bindL('email', () => some('bsmith@example.com'))
      .bindL('len', () => none)
      .done()
    assert.deepStrictEqual(user2, none)
  })

  it('should compose tasks', () => {
    const wait = <A>(ms: number, a: A): Task<A> =>
      new Task(
        () =>
          new Promise(res => {
            setTimeout(() => res(a), ms)
          })
      )

    const user = Do(task)
      .do(wait(1, 'nothing'))
      .doL(() => wait(1, 'nothing'))
      .bindL('name', () => wait(1, 'bob'))
      .bind('email', wait(1, 'bsmith@example.com'))
      .bindL('len', ({ name }) => wait(1, name.length))
      .return(({ name, email, len }) => ({ name, email, len }))

    const then = Date.now()
    return user.run().then(u => {
      const now = Date.now()
      // tslint:disable-next-line: no-console
      console.log('Took: ', now - then, ' milliseconds')
      assert.deepStrictEqual(u, { name: 'bob', email: 'bsmith@example.com', len: 3 })
    })
  })

  it('should compose eithers', () => {
    const user = Do(either)
      .do(right('nothing'))
      .doL(() => right('nothing'))
      .bind('name', right('bob'))
      .bind('email', right('bsmith@example.com'))
      .bindL('len', ({ name }) => right(name.length))
      .return(({ name, email, len }) => ({ name, email, len }))

    assert.deepStrictEqual(user, right({ name: 'bob', email: 'bsmith@example.com', len: 3 }))

    const user2 = Do(either)
      .do(right<string, string>('nothing'))
      .doL(() => right('nothing'))
      .bind('name', right('bob'))
      .bind('email', left('error from email'))
      .bindL('len', () => left('error from len'))
      .return(({ name, email, len }) => ({ name, email, len }))

    assert.deepStrictEqual(user2, left('error from email'))
  })

  it('should compose validations', () => {
    const validationMonad = getMonad(getSemigroup<string>())
    const neOf = <A>(a: A): NonEmptyArray<A> => new NonEmptyArray(a, [])

    const user = Do(validationMonad)
      .do(success('nothing'))
      .doL(() => success('nothing'))
      .bind('name', success('bob'))
      .bind('email', success('bsmith@example.com'))
      .bindL('len', ({ name }) => success(name.length))
      .return(({ name, email, len }) => ({ name, email, len }))
    assert.deepStrictEqual(user, success({ name: 'bob', email: 'bsmith@example.com', len: 3 }))

    const user2 = Do(validationMonad)
      .do(success('nothing'))
      .doL(() => success('nothing'))
      .bind('name', success('bob'))
      .bind('email', failure(neOf('error from email')))
      .bindL('len', () => failure(neOf('error from len')))
      .return(({ name, email, len }) => ({ name, email, len }))
    assert.deepStrictEqual(user2, failure(neOf('error from email')))
  })

  it('should handle sequenceS', () => {
    return time(task)(
      Do(task)
        .sequenceS({
          a: delay(100, 'a'),
          b: delay(150, 'b')
        })
        .sequenceS({
          c: delay(100, 'c'),
          d: delay(150, 'd')
        })
        .done()
    )
      .run()
      .then(([r, n]) => {
        assert.deepStrictEqual(r, { a: 'a', b: 'b', c: 'c', d: 'd' })
        assert.strictEqual(n < 350, true)
      })
  })

  it('should handle sequenceSL', () => {
    return time(task)(
      Do(task)
        .sequenceSL(() => ({
          a: delay(100, 'a'),
          b: delay(150, 'b')
        }))
        .sequenceSL(s => ({
          c: delay(100, 'c' + s.a),
          d: delay(150, 'd' + s.b)
        }))
        .done()
    )
      .run()
      .then(([r, n]) => {
        assert.deepStrictEqual(r, { a: 'a', b: 'b', c: 'ca', d: 'db' })
        assert.strictEqual(n < 350, true)
      })
  })
})
