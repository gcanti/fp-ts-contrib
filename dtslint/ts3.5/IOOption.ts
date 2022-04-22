import { pipe } from 'fp-ts/lib/function'
import * as _ from '../../src/IOOption'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate1: (sn: string | number) => boolean
declare const predicate2: (sn: number) => boolean

//
// fromPredicate
//

// $ExpectType IOOption<string>
pipe(sn, _.fromPredicate(isString))
// $ExpectType IOOption<string | number>
pipe(sn, _.fromPredicate(predicate1))
// $ExpectType IOOption<number>
pipe(n, _.fromPredicate(predicate1))
// $ExpectError
pipe(sn, _.fromPredicate(predicate2))
