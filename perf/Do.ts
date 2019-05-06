import * as Benchmark from 'benchmark'
import { Do } from '../src/Do'
import { option, some } from 'fp-ts/lib/Option'

const suite = new Benchmark.Suite()

// const chain = option.chain

// // tslint:disable-next-line: no-console
// console.log(
//   Do(option)
//     .bind('a', some('a'))
//     .bind('b', some('b'))
//     .bind('c', some('c'))
//     .bind('d', some('d'))
//     .bind('e', some('e'))
//     .done()
// )

suite
  .add('bind', function() {
    Do(option)
      .bind('a', some('a'))
      .bind('b', some('b'))
      .bind('c', some('c'))
      .bind('d', some('d'))
      .bind('e', some('e'))
      .done()
  })
  .add('bindL', function() {
    Do(option)
      .bindL('a', () => some('a'))
      .bindL('b', () => some('b'))
      .bindL('c', () => some('c'))
      .bindL('d', () => some('d'))
      .bindL('e', () => some('e'))
      .done()
  })
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
