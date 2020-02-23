import * as assert from 'assert'
import * as T from 'fp-ts/lib/Task'
import { sequenceT } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'

import * as _ from '../src/MVar'

const assertTiming = (message: string) => <T>(
  ta: T.Task<T>,
  timeout: number,
  onResolve: (t: T) => void
): Promise<void> =>
  Promise.race([ta().then(onResolve), T.delay(timeout)(T.of(undefined))().then(() => assert.fail(message))])

const assertTimeout = assertTiming('Promise expected to be resolved within the given time.')
const assertFast = assertTiming('Promise expected to be resolved immediately.')

describe('MVar', () => {
  it('newEmptyMVar', () => {
    assert.ok(_.isEmpty(_.newEmptyMVar()))
  })

  it('newMVar', () => {
    return _.read(_.newMVar('a'))().then(a => assert.strictEqual(a, 'a'))
  })

  describe('takeMVar', () => {
    it('should return the value and empty the MVar', () => {
      const someVar = _.newMVar(6)
      return _.take(someVar)().then(a => {
        assert.strictEqual(a, 6)
        assert.ok(_.isEmpty(someVar))
      })
    })

    it('should resolve after a put when empty', () => {
      const someVar = _.newEmptyMVar<number>()
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(_.take(someVar), T.delay(wait)(_.put(1)(someVar))), wait + 1, ([a]) => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 1)
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a put.')
      })
    })

    it('should resolve immediately when non empty', () => {
      const someVar = _.newMVar('a')
      const start = Date.now()
      return assertFast(_.take(someVar), 1, a => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 'a')
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  describe('putMVar', () => {
    it('should put the value', () => {
      const someVar = _.newEmptyMVar<string>()
      return pipe(
        _.put('value')(someVar),
        T.chain(() => _.read(someVar))
      )().then(a => assert.strictEqual(a, 'value'))
    })

    it('should resolve after the var has been emptied', () => {
      const someVar = _.newMVar(true)
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(_.put(false)(someVar), T.delay(wait)(_.take(someVar))), wait + 1, () => {
        const elapsed = Date.now() - start
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a take.')
      })
    })

    it('should resolve immediately when empty', () => {
      const someVar = _.newEmptyMVar<boolean>()
      const start = Date.now()
      return assertFast(_.put(false)(someVar), 1, () => {
        const elapsed = Date.now() - start
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  describe('readMVar', () => {
    it('should resolve after a put when empty', () => {
      const someVar = _.newEmptyMVar<number>()
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(_.read(someVar), T.delay(wait)(_.put(1)(someVar))), wait + 1, ([a]) => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 1)
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a put.')
      })
    })

    it('should resolve immediately when non empty', () => {
      const someVar = _.newMVar('a')
      const start = Date.now()
      return assertFast(_.read(someVar), 1, a => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 'a')
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  it('should handle concurrency', () => {
    const someVar = _.newEmptyMVar<number>()
    return sequenceT(T.task)(
      _.put(1)(someVar),
      _.put(2)(someVar),
      _.take(someVar),
      _.read(someVar),
      _.take(someVar)
    )().then(([, , a, b, c]) => {
      assert.strictEqual(a, 1)
      assert.strictEqual(b, 2)
      assert.strictEqual(c, b)
      assert.ok(_.isEmpty(someVar))
    })
  })

  it('modify', () => {
    const someVar = _.newMVar(2)
    const f = (a: number): T.Task<number> => T.of(a + a)
    return pipe(
      _.modify(someVar)(f),
      T.chain(() => _.read(someVar))
    )().then(a => {
      assert.strictEqual(a, 4)
    })
  })

  it('swap', () => {
    const someVar = _.newMVar(true)
    return pipe(
      _.swap(someVar)(false),
      T.chain(a =>
        pipe(
          _.read(someVar),
          T.map(b => [a, b])
        )
      )
    )().then(([a, b]) => {
      assert.strictEqual(a, true)
      assert.strictEqual(b, false)
    })
  })

  describe('tryTake', () => {
    it('should return None when empty', () => {
      const someVar = _.newEmptyMVar()
      const res = _.tryTake(someVar)()
      assert.deepStrictEqual(res, O.none)
      assert.ok(_.isEmpty(someVar))
    })

    it('should return Some when non empty', () => {
      const someVar = _.newMVar(1)
      const res = _.tryTake(someVar)()
      assert.deepStrictEqual(res, O.some(1))
      assert.ok(_.isEmpty(someVar))
    })
  })

  describe('tryPut', () => {
    it('should return true when empty', () => {
      const someVar = _.newEmptyMVar<string>()
      return pipe(
        T.fromIO(_.tryPut(someVar)('a')),
        T.chain(success =>
          pipe(
            _.read(someVar),
            T.map(b => [success, b])
          )
        )
      )().then(([success, b]) => {
        assert.ok(success)
        assert.strictEqual(b, 'a')
      })
    })

    it('should return false when non empty', () => {
      const someVar = _.newMVar('a')
      return pipe(
        T.fromIO(_.tryPut(someVar)('x')),
        T.chain(success =>
          pipe(
            _.read(someVar),
            T.map(b => [success, b])
          )
        )
      )().then(([success, b]) => {
        assert.strictEqual(success, false)
        assert.strictEqual(b, 'a')
      })
    })
  })

  describe('tryRead', () => {
    it('should return None when empty', () => {
      const someVar = _.newEmptyMVar()
      const res = _.tryRead(someVar)()
      assert.deepStrictEqual(res, O.none)
      assert.ok(_.isEmpty(someVar))
    })

    it('should return Some when non empty', () => {
      const someVar = _.newMVar(1)
      const res = _.tryRead(someVar)()
      assert.deepStrictEqual(res, O.some(1))
      assert.strictEqual(_.isEmpty(someVar), false)
    })
  })
})
