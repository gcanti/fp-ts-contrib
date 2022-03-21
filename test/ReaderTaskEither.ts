import * as assert from 'assert'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RIO from '../src/ReaderIO'
import * as _ from '../src/ReaderTaskEither'

const len = (s: string): number => s.length

describe('ReaderTaskEither', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('leftReaderIO', async () => {
    assert.deepStrictEqual(await _.leftReaderIO(RIO.of(1))({})(), E.left(1))
  })

  it('rightReaderIO', async () => {
    assert.deepStrictEqual(await _.rightReaderIO(RIO.of(1))({})(), E.right(1))
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('fromReaderIOK', async () => {
    assert.deepStrictEqual(await _.fromReaderIOK(RIO.of)(1)(undefined)(), E.right(1))
  })

  it('chainReaderIOKW', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RTE.right('a'), _.chainReaderIOKW(f))({})(), E.right(1))
  })

  it('chainReaderIOK', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RTE.right('a'), _.chainReaderIOK(f))(undefined)(), E.right(1))
  })

  it('chainFirstReaderIOKW', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RTE.right('a'), _.chainFirstReaderIOKW(f))({})(), E.right('a'))
  })

  it('chainFirstReaderIOK', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RTE.right('a'), _.chainFirstReaderIOK(f))({})(), E.right('a'))
  })
})
