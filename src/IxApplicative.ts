/**
 * @since 0.1.24
 */
import { URIS3, URIS4 } from 'fp-ts/HKT'

import { IxApply3, IxApply4 } from './IxApply'
import { IxPointed3, IxPointed4 } from './IxPointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxApplicative3<F extends URIS3> extends IxApply3<F>, IxPointed3<F> {}

/**
 * @category type classes
 * @since 0.1.24
 */
export interface IxApplicative4<F extends URIS4> extends IxApply4<F>, IxPointed4<F> {}
