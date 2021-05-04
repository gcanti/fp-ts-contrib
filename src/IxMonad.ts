/**
 * @since 2.10.0
 */
import { URIS3, URIS4 } from 'fp-ts/HKT'
import { IxApplicative3, IxApplicative4 } from './IxApplicative'
import { IxChain3, IxChain4 } from './IxChain'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxMonad3<M extends URIS3> extends IxApplicative3<M>, IxChain3<M> {}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxMonad4<M extends URIS4> extends IxApplicative4<M>, IxChain4<M> {}
