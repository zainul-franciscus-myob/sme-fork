import { getDefaultState } from '../../getDefaultState';
import { getSortingForJournalTransactions } from '../journalTransactionSelectors';

describe('getSortingForJournalTransactions', () => {
  describe('use the default sortOrder and orderBy', () => {
    ['AccountIdentifier', 'Credit', 'Debit'].forEach((test) => {
      it(`given order by is ${test}`, () => {
        const state = {
          orderBy: test,
          sortOrder: 'asc',
        };

        const sortingOptions = getSortingForJournalTransactions(state);

        expect(sortingOptions).toEqual({
          orderBy: getDefaultState().orderBy,
          sortOrder: getDefaultState().sortOrder,
        });
      });
    });
  });

  it('should use the given sortOrder and orderBy for all other cases', () => {
    const state = {
      orderBy: 'Description',
      sortOrder: 'asc',
    };

    const sortingOptions = getSortingForJournalTransactions(state);

    expect(sortingOptions).toEqual({
      orderBy: state.orderBy,
      sortOrder: state.sortOrder,
    });
  });
});
