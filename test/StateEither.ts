import * as assert from 'assert'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { State } from 'fp-ts/lib/State'
import * as _ from '../src/StateEither'

describe('StateEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      const len = (s: string): number => s.length
      const e = _.evalState(pipe(_.right('aaa'), _.map(len)), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap', () => {
      const len = (s: string): number => s.length
      const e = _.evalState(pipe(_.right(len), _.ap(_.right('aaa'))), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('apFirst', () => {
      const e = _.evalState(pipe(_.right('aaa'), _.apFirst(_.right('bbb'))), {})
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('apSecond', () => {
      const e = _.evalState(pipe(_.right('aaa'), _.apSecond(_.right('bbb'))), {})
      assert.deepStrictEqual(e, E.right('bbb'))
    })

    it('chain', () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = _.evalState(pipe(_.right('aaa'), _.chain(f)), {})
      assert.deepStrictEqual(e, E.right(3))
    })

    it('chainFirst', () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = _.evalState(pipe(_.right('aaa'), _.chainFirst(f)), {})
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('chainEitherK', () => {
      const f = (s: string) => E.right(s.length)
      const x = _.evalState(pipe(_.right('aa'), _.chainEitherK(f)), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('flatten', () => {
      assert.deepStrictEqual(_.evalState(pipe(_.right(_.right('aaa')), _.flatten), {}), E.right('aaa'))
      assert.deepStrictEqual(_.evalState(pipe(_.right(_.left('aaa')), _.flatten), {}), E.left('aaa'))
    })

    it('filterOrElse', () => {
      const p = (s: string) => s.length > 2
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            _.right('aaa'),
            _.filterOrElse(p, (s) => s.length)
          ),
          {}
        ),
        E.right('aaa')
      )
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            _.right('aa'),
            _.filterOrElse(p, (s) => s.length)
          ),
          {}
        ),
        E.left(2)
      )
    })
  })

  describe('constructors', () => {
    it('rightState', () => {
      const state: State<{}, number> = (s) => [1, s]
      const e = _.evalState(_.rightState(state), {})
      assert.deepStrictEqual(e, E.right(1))
    })

    it('leftState', () => {
      const state: State<{}, number> = (s) => [1, s]
      const e = _.evalState(_.leftState(state), {})
      assert.deepStrictEqual(e, E.left(1))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            O.some(1),
            _.fromOption(() => 'none')
          ),
          {}
        ),
        E.right(1)
      )
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            O.none,
            _.fromOption(() => 'none')
          ),
          {}
        ),
        E.left('none')
      )
    })

    it('fromEither', () => {
      const ei: E.Either<{}, number> = E.right(1)
      const e = _.evalState(_.fromEither(ei), {})
      assert.deepStrictEqual(e, E.right(1))
    })

    it('fromEitherK', () => {
      const f = (s: Array<string>) => E.right(s.length)
      const x = _.evalState(_.fromEitherK(f)(['a', 'b']), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('fromPredicate', () => {
      const p = (n: number): boolean => n > 2
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            3,
            _.fromPredicate(p, () => 'false')
          ),
          {}
        ),
        E.right(3)
      )
      assert.deepStrictEqual(
        _.evalState(
          pipe(
            2,
            _.fromPredicate(p, () => 'false')
          ),
          {}
        ),
        E.left('false')
      )
    })
  })

  it('evalState', () => {
    const ma = _.right('aaa')
    const s = {}
    const e = _.evalState(ma, s)
    assert.deepStrictEqual(e, E.right('aaa'))
  })

  it('execState Right', () => {
    const ma = _.right('aaa')
    const s = {}
    const e = _.execState(ma, s)
    assert.deepStrictEqual(e, E.right(s))
  })

  it('execState Left', () => {
    const e = _.execState(_.left('aaa'), { a: 0 })
    assert.deepStrictEqual(e, E.left('aaa'))
  })
})
