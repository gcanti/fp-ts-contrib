import * as assert from 'assert'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Reader'
import * as IO from 'fp-ts/lib/IO'
import * as _ from '../src/ReaderIO'

describe('ReaderIO', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromIO', () => {
    assert.deepStrictEqual(_.fromIO(IO.of(1))({})(), 1)
  })

  it('fromIOK', () => {
    const f = _.fromIOK((s: string) => IO.of(s.length))
    assert.deepStrictEqual(pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromReader', () => {
    assert.deepStrictEqual(_.fromReader(R.of(1))({})(), 1)
  })

  it('ask', () => {
    assert.deepStrictEqual(_.ask()(1)(), 1)
  })

  it('asks', () => {
    assert.deepStrictEqual(_.asks((s: string) => s.length)('foo')(), 3)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('local', () => {
    const f = (s: string) => s.length
    assert.deepStrictEqual(
      pipe(
        _.asks((n: number) => n + 1),
        _.local(f)
      )('aaa')(),
      4
    )
  })
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', () => {
    const f = (n: number): number => n * 2
    assert.deepStrictEqual(pipe(_.of(1), _.map(f))({})(), 2)
  })

  it('ap', () => {
    const f = (n: number): number => n * 2
    assert.deepStrictEqual(pipe(_.of(f), _.ap(_.of(1)))({})(), 2)
  })

  it('apFirst', () => {
    assert.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', () => {
    assert.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('of', () => {
    assert.deepStrictEqual(_.fromReader(R.of(1))({})(), 1)
  })

  it('chain', () => {
    const f = (a: string) => _.of(a.length)
    assert.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({})(), 3)
    assert.deepStrictEqual(_.Monad.chain(_.of('foo'), f)({})(), 3)
  })

  it('chainFirst', () => {
    const f = (a: string) => _.of(a.length)
    assert.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({})(), 'foo')
  })

  it('chainIOK', () => {
    const f = (s: string) => IO.of(s.length)
    assert.deepStrictEqual(pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('flatten', () => {
    assert.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({})(), 'a')
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('run', () => {
    const f = (a: string) => a.length
    assert.deepStrictEqual(_.run(_.asks(f), 'foo'), 3)
  })
})
