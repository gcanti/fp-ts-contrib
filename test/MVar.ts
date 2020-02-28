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
    assert.ok(_.newEmptyMVar().isEmpty())
  })

  it('newMVar', () => {
    return _.newMVar('a')
      .read()
      .then(a => assert.strictEqual(a, 'a'))
  })

  describe('take', () => {
    it('should return the value and empty the MVar', () => {
      const someVar = _.newMVar(6)
      return someVar.take().then(a => {
        assert.strictEqual(a, 6)
        assert.ok(someVar.isEmpty)
      })
    })

    it('should resolve after a put when empty', () => {
      const someVar = _.newEmptyMVar<number>()
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(someVar.take, T.delay(wait)(someVar.put(1))), wait + 1, ([a]) => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 1)
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a put.')
      })
    })

    it('should resolve immediately when non empty', () => {
      const someVar = _.newMVar('a')
      const start = Date.now()
      return assertFast(someVar.take, 1, a => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 'a')
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  describe('put', () => {
    it('should put the value', () => {
      const someVar = _.newEmptyMVar<string>()
      return pipe(
        someVar.put('value'),
        T.chain(() => someVar.read)
      )().then(a => assert.strictEqual(a, 'value'))
    })

    it('should resolve after the var has been emptied', () => {
      const someVar = _.newMVar(true)
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(someVar.put(false), T.delay(wait)(someVar.take)), wait + 1, () => {
        const elapsed = Date.now() - start
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a take.')
      })
    })

    it('should resolve immediately when empty', () => {
      const someVar = _.newEmptyMVar<boolean>()
      const start = Date.now()
      return assertFast(someVar.put(false), 1, () => {
        const elapsed = Date.now() - start
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  describe('read', () => {
    it('should resolve after a put when empty', () => {
      const someVar = _.newEmptyMVar<number>()
      const start = Date.now()
      const wait = 10
      return assertTimeout(sequenceT(T.task)(someVar.read, T.delay(wait)(someVar.put(1))), wait + 1, ([a]) => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 1)
        assert.ok(elapsed >= wait, 'Promise expected to be resolved after a put.')
      })
    })

    it('should resolve immediately when non empty', () => {
      const someVar = _.newMVar('a')
      const start = Date.now()
      return assertFast(someVar.read, 1, a => {
        const elapsed = Date.now() - start
        assert.strictEqual(a, 'a')
        assert.ok(elapsed <= 1, 'Promise expected to be resolved immediately.')
      })
    })
  })

  it('should handle concurrency', () => {
    const someVar = _.newEmptyMVar<number>()
    return sequenceT(T.task)(someVar.put(1), someVar.put(2), someVar.take, someVar.read, someVar.take)().then(
      ([, , a, b, c]) => {
        assert.strictEqual(a, 1)
        assert.strictEqual(b, 2)
        assert.strictEqual(c, b)
        assert.ok(someVar.isEmpty())
      }
    )
  })

  it('modify', () => {
    const someVar = _.newMVar(2)
    const f = (a: number): T.Task<number> => T.of(a + a)
    return pipe(
      someVar.modify(f),
      T.chain(() => someVar.read)
    )().then(a => {
      assert.strictEqual(a, 4)
    })
  })

  it('swap', () => {
    const someVar = _.newMVar(true)
    return pipe(
      someVar.swap(false),
      T.chain(a =>
        pipe(
          someVar.read,
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
      const res = someVar.tryTake()
      assert.deepStrictEqual(res, O.none)
      assert.ok(someVar.isEmpty())
    })

    it('should return Some when non empty', () => {
      const someVar = _.newMVar(1)
      const res = someVar.tryTake()
      assert.deepStrictEqual(res, O.some(1))
      assert.ok(someVar.isEmpty)
    })
  })

  describe('tryPut', () => {
    it('should return true when empty', () => {
      const someVar = _.newEmptyMVar<string>()
      return pipe(
        T.fromIO(someVar.tryPut('a')),
        T.chain(success =>
          pipe(
            someVar.read,
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
        T.fromIO(someVar.tryPut('x')),
        T.chain(success =>
          pipe(
            someVar.read,
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
      const res = someVar.tryRead()
      assert.deepStrictEqual(res, O.none)
      assert.ok(someVar.isEmpty())
    })

    it('should return Some when non empty', () => {
      const someVar = _.newMVar(1)
      const res = someVar.tryRead()
      assert.deepStrictEqual(res, O.some(1))
      assert.strictEqual(someVar.isEmpty(), false)
    })
  })
})
