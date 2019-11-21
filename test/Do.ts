import * as assert from 'assert'
import { option, some, none } from 'fp-ts/lib/Option'
import { Do } from '../src/Do'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import * as NEA from 'fp-ts/lib/NonEmptyArray'
import { time } from '../src/time'
import { io } from 'fp-ts/lib/IO'

describe('Do', () => {
  it('should replay without polluting the scope', () => {
    let count = 0
    const action1 = Do(io)
      .bind('x', () => {
        count += 1
        return count
      })
      .done()
    const x1 = action1()
    const x2 = action1()
    assert.deepStrictEqual(x1, { x: 1 })
    assert.deepStrictEqual(x2, { x: 2 })
    const action2 = Do(io)
      .sequenceS({
        x: () => {
          count += 1
          return count
        }
      })
      .done()
    const x3 = action2()
    const x4 = action2()
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

  it('should compose tasks', async () => {
    const delay = T.delay(1)
    const user = Do(T.task)
      .do(delay(T.of('nothing')))
      .doL(() => delay(T.of('nothing')))
      .bindL('name', () => delay(T.of('bob')))
      .bind('email', delay(T.of('bsmith@example.com')))
      .bindL('len', ({ name }) => delay(T.of(name.length)))
      .return(({ name, email, len }) => ({ name, email, len }))

    const u = await user()
    assert.deepStrictEqual(u, { name: 'bob', email: 'bsmith@example.com', len: 3 })
  })

  it('should compose eithers', () => {
    const user = Do(E.either)
      .do(E.right('nothing'))
      .doL(() => E.right('nothing'))
      .bind('name', E.right('bob'))
      .bind('email', E.right('bsmith@example.com'))
      .bindL('len', ({ name }) => E.right(name.length))
      .return(({ name, email, len }) => ({ name, email, len }))

    assert.deepStrictEqual(user, E.right({ name: 'bob', email: 'bsmith@example.com', len: 3 }))

    const user2 = Do(E.either)
      .do(E.right<string, string>('nothing'))
      .doL(() => E.right('nothing'))
      .bind('name', E.right('bob'))
      .bind('email', E.left('error from email'))
      .bindL('len', () => E.left('error from len'))
      .return(({ name, email, len }) => ({ name, email, len }))

    assert.deepStrictEqual(user2, E.left('error from email'))
  })

  it('should compose validations', () => {
    const validationMonad = E.getValidation(NEA.getSemigroup<string>())

    const user = Do(validationMonad)
      .do(E.right('nothing'))
      .doL(() => E.right('nothing'))
      .bind('name', E.right('bob'))
      .bind('email', E.right('bsmith@example.com'))
      .bindL('len', ({ name }) => E.right(name.length))
      .return(({ name, email, len }) => ({ name, email, len }))
    assert.deepStrictEqual(user, E.right({ name: 'bob', email: 'bsmith@example.com', len: 3 }))

    const user2 = Do(validationMonad)
      .do(E.right('nothing'))
      .doL(() => E.right('nothing'))
      .bind('name', E.right('bob'))
      .bind('email', E.left(NEA.of('error from email')))
      .bindL('len', () => E.left(NEA.of('error from len')))
      .return(({ name, email, len }) => ({ name, email, len }))
    assert.deepStrictEqual(user2, E.left(NEA.of('error from email')))
  })

  it('should handle sequenceS', async () => {
    const [r, n] = await time(T.task)(
      Do(T.task)
        .sequenceS({
          a: T.delay(100)(T.of('a')),
          b: T.delay(150)(T.of('b'))
        })
        .sequenceS({
          c: T.delay(100)(T.of('c')),
          d: T.delay(150)(T.of('d'))
        })
        .done()
    )()
    assert.deepStrictEqual(r, { a: 'a', b: 'b', c: 'c', d: 'd' })
    assert.strictEqual(n < 350, true)
  })

  it('should handle sequenceSL', async () => {
    const [r, n] = await time(T.task)(
      Do(T.task)
        .sequenceSL(() => ({
          a: T.delay(100)(T.of('a')),
          b: T.delay(150)(T.of('b'))
        }))
        .sequenceSL(s => ({
          c: T.delay(100)(T.of('c' + s.a)),
          d: T.delay(150)(T.of('d' + s.b))
        }))
        .done()
    )()
    assert.deepStrictEqual(r, { a: 'a', b: 'b', c: 'ca', d: 'db' })
    assert.strictEqual(n < 350, true)
  })
})
