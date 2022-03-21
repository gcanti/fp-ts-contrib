import * as assert from 'assert'
import { flow, pipe } from 'fp-ts/function'
import * as RT from 'fp-ts/ReaderTask'
import * as RIO from '../src/ReaderIO'
import * as _ from '../src/ReaderTask'

const len = (s: string): number => s.length

describe('ReaderTask', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('natural transformations', async () => {
    assert.deepStrictEqual(await _.fromReaderIO(RIO.of(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('fromReaderIOK', async () => {
    assert.deepStrictEqual(await _.fromReaderIOK(RIO.of)(1)(undefined)(), 1)
  })

  it('chainReaderIOKW', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RT.of('a'), _.chainReaderIOKW(f))({})(), 1)
  })

  it('chainReaderIOK', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RT.of('a'), _.chainReaderIOK(f))(undefined)(), 1)
  })

  it('chainFirstReaderIOKW', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RT.of('a'), _.chainFirstReaderIOKW(f))({})(), 'a')
  })

  it('chainFirstReaderIOK', async () => {
    const f = flow(len, RIO.of)
    assert.deepStrictEqual(await pipe(RT.of('a'), _.chainFirstReaderIOK(f))({})(), 'a')
  })
})
