import * as assert from 'assert'
import { array } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/lib/TaskEither'
import { collectUntil } from '../src/collectUntil'

describe('collectUntil', () => {
  it('should run all the computations', async () => {
    interface Page {
      rows: Array<string>
      current_page: number
      last_page: number
    }

    // fake API
    function fetchPage(current_page: number): TE.TaskEither<string, Page> {
      if (current_page <= 3) {
        return TE.right({
          rows: [`row1-Page${current_page}`, `row2-Page${current_page}`],
          current_page: current_page,
          last_page: 3
        })
      } else {
        return TE.left('invalid page')
      }
    }

    const collectRows = collectUntil(
      TE.taskEither,
      array
    )(
      flow(
        fetchPage,
        TE.map(page => [page.rows, page.current_page < page.last_page ? O.some(page.current_page + 1) : O.none])
      )
    )

    const rows1 = await collectRows(1)()
    assert.deepStrictEqual(
      rows1,
      E.right(['row1-Page1', 'row2-Page1', 'row1-Page2', 'row2-Page2', 'row1-Page3', 'row2-Page3'])
    )
    const rows2 = await collectRows(4)()
    assert.deepStrictEqual(rows2, E.left('invalid page'))
  })
})
