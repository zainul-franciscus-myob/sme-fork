import { getNewSortOrder } from '../transactionListSelectors';

describe('transactionListSelectors', () => {
  describe('getNewSortOrder', () => {
    it('should flip sort order when new order by column is same with old order by column', () => {
      const state = {
        orderBy: 'columnA',
        sortOrder: 'asc',
      };
      const actual = getNewSortOrder(state, 'columnA');
      expect(actual).toEqual('desc');
    });

    it('should flip sort order when new order by column is not same with old order by column', () => {
      const state = {
        orderBy: 'columnA',
        sortOrder: 'asc',
      };
      const actual = getNewSortOrder(state, 'columnB');
      expect(actual).toEqual('asc');
    });
  });
});
