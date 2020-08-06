import * as assert from 'assert'
import * as IO from "fp-ts/lib/IO";
import * as S from 'fp-ts/lib/State'
import { pipe } from "fp-ts/lib/pipeable";

import * as _ from '../src/StateIO'

describe('StateIO', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.map(double)), {})(), 2)
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(_.evalState(pipe(_.of(double), _.ap(_.of(1))), {})(), 2)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.apFirst(_.of('a'))), {})(), 1)
    })

    it('apSecond', () => {
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.apSecond(_.of('a'))), {})(), 'a')
    })

    it('chain', () => {
      const f = (n: number) => _.of(n + 1)
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.chain(f)), {})(), 2)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.of(n + 1)
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.chainFirst(f)), {})(), 1)
    })

    it('chainIOK', () => {
      const f = (n: number): IO.IO<number> => IO.of(n + 1)
      assert.deepStrictEqual(_.evalState(pipe(_.of(1), _.chainIOK(f)), {})(), 2)
    })

    it('flatten', () => {
      assert.deepStrictEqual(_.evalState(pipe(_.of(_.of(1)), _.flatten), {})(), 1)
    })
  })

  describe('constructors', () => {
    it('fromIO', () => {
      assert.deepStrictEqual(_.evalState(pipe(IO.of(1), _.fromIO), {})(), 1)
    })

    it('fromState', () => {
      assert.deepStrictEqual(_.evalState(pipe(S.of(1), _.fromState), {})(), 1)
    })

    it('fromIOK', () => {
      const f = (s: string) => IO.of(s.length)
      assert.deepStrictEqual(_.evalState(pipe('aaa', _.fromIOK(f)), {})(), 3)
    })
  })

  it('evalState', () => {
    const ma = _.of(1)
    const s = {}
    const e = _.evalState(ma, s)
    assert.deepStrictEqual(e(), 1)
  })

  it('execState', () => {
    const ma = _.of(1)
    const s = {}
    const e = _.execState(ma, s)
    assert.deepStrictEqual(e(), {})
  })

  it('run', () => {
    const ma = _.of(1)
    const s = {}
    assert.deepStrictEqual(_.run(ma, s), 1)
  })
})