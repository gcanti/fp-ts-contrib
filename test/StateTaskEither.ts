import * as assert from 'assert'
import * as E from 'fp-ts/lib/Either'
import * as IO from 'fp-ts/lib/IO'
import * as IOE from 'fp-ts/lib/IOEither'
import * as O from 'fp-ts/lib/Option'
import * as S from 'fp-ts/lib/State'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/pipeable'

import * as _ from '../src/StateTaskEither'

describe('StateTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aaa'), _.map(len)), {})(), E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(await _.evalState(pipe(_.right(len), _.ap(_.right('aaa'))), {})(), E.right(3))
    })

    it('ap sequential', async () => {
      const len = (s: string): number => s.length
      assert.deepStrictEqual(await _.evalState(_.stateTaskEitherSeq.ap(_.right(len), _.right('aaa')), {})(), E.right(3))
    })

    it('apFirst', async () => {
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aaa'), _.apFirst(_.right('bbb'))), {})(), E.right('aaa'))
    })

    it('apSecond', async () => {
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aaa'), _.apSecond(_.right('bbb'))), {})(), E.right('bbb'))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aaa'), _.chain(f)), {})(), E.right(3))
    })

    it('chainFirst', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aaa'), _.chainFirst(f)), {})(), E.right('aaa'))
    })

    it('chainEitherK', async () => {
      const f = (s: string) => E.right(s.length)
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aa'), _.chainEitherK(f)), {})(), E.right(2))
    })

    it('chainIOEitherK', async () => {
      const f = (s: string) => IOE.right(s.length)
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aa'), _.chainIOEitherK(f)), {})(), E.right(2))
    })

    it('chainTaskEitherK', async () => {
      const f = (s: string) => TE.right(s.length)
      assert.deepStrictEqual(await _.evalState(pipe(_.right('aa'), _.chainTaskEitherK(f)), {})(), E.right(2))
    })

    it('flatten', async () => {
      assert.deepStrictEqual(await _.evalState(pipe(_.right(_.right('aaa')), _.flatten), {})(), E.right('aaa'))
      assert.deepStrictEqual(await _.evalState(pipe(_.right(_.left('aaa')), _.flatten), {})(), E.left('aaa'))
    })

    it('filterOrElse', async () => {
      const p = (s: string) => s.length > 2
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            _.right('aaa'),
            _.filterOrElse(p, (s) => s.length)
          ),
          {}
        )(),
        E.right('aaa')
      )
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            _.right('aa'),
            _.filterOrElse(p, (s) => s.length)
          ),
          {}
        )(),
        E.left(2)
      )
    })
  })

  describe('constructors', () => {
    it('leftIO', async () => {
      const io: IO.IO<number> = IO.of(1)
      assert.deepStrictEqual(await _.evalState(_.leftIO(io), {})(), E.left(1))
    })

    it('rightIO', async () => {
      const io: IO.IO<number> = IO.of(1)
      assert.deepStrictEqual(await _.evalState(_.rightIO(io), {})(), E.right(1))
    })

    it('leftTask', async () => {
      const ta: T.Task<number> = T.of(1)
      assert.deepStrictEqual(await _.evalState(_.leftTask(ta), {})(), E.left(1))
    })

    it('rightTask', async () => {
      const ta: T.Task<number> = T.of(1)
      assert.deepStrictEqual(await _.evalState(_.rightTask(ta), {})(), E.right(1))
    })

    it('rightState', async () => {
      const state: S.State<{}, number> = (s) => [1, s]
      assert.deepStrictEqual(await _.evalState(_.rightState(state), {})(), E.right(1))
    })

    it('leftState', async () => {
      const state: S.State<{}, number> = (s) => [1, s]
      assert.deepStrictEqual(await _.evalState(_.leftState(state), {})(), E.left(1))
    })

    it('fromOption', async () => {
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            O.some(1),
            _.fromOption(() => 'none')
          ),
          {}
        )(),
        E.right(1)
      )
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            O.none,
            _.fromOption(() => 'none')
          ),
          {}
        )(),
        E.left('none')
      )
    })

    it('fromEither', async () => {
      assert.deepStrictEqual(await _.evalState(_.fromEither(E.right(1)), {})(), E.right(1))
      assert.deepStrictEqual(await _.evalState(_.fromEither(E.left(1)), {})(), E.left(1))
    })

    it('fromEitherK', async () => {
      const f = (s: Array<string>) => E.right(s.length)
      assert.deepStrictEqual(await _.evalState(_.fromEitherK(f)(['a', 'b']), {})(), E.right(2))
    })

    it('fromPredicate', async () => {
      const p = (n: number): boolean => n > 2
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            3,
            _.fromPredicate(p, () => 'false')
          ),
          {}
        )(),
        E.right(3)
      )
      assert.deepStrictEqual(
        await _.evalState(
          pipe(
            2,
            _.fromPredicate(p, () => 'false')
          ),
          {}
        )(),
        E.left('false')
      )
    })
  })

  it('evalState', async () => {
    const ma = _.right('aaa')
    const s = {}
    assert.deepStrictEqual(await _.evalState(ma, s)(), E.right('aaa'))
  })

  it('execState Right', async () => {
    const ma = _.right('aaa')
    const s = {}
    assert.deepStrictEqual(await _.execState(ma, s)(), E.right(s))
  })

  it('execState Left', async () => {
    assert.deepStrictEqual(await _.execState(_.left('aaa'), { a: 0 })(), E.left('aaa'))
  })

  it('run', async () => {
    const ma: _.StateTaskEither<{}, never, number> = _.of(1)
    const s = {}
    assert.deepStrictEqual(await _.run(ma, s), E.right([1, {}]))
  })
})
