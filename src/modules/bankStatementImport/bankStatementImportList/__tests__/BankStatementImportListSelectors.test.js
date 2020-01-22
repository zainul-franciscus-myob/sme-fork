import { getNewSortOrder } from '../BankStatementImportListSelectors';

describe('BankStatementImportListSelectors', () => {
  describe('getNewSortOrder', () => {
    const state = {
      orderBy: 'A',
      sortOrder: 'asc',
    };

    it('set sort order to asc when sorts on new column', () => {
      const actual = getNewSortOrder('B')(state);

      expect(actual).toEqual('asc');
    });

    it('flip sort order when sorts on the same column', () => {
      const actual = getNewSortOrder('A')(state);

      expect(actual).toEqual('desc');
    });
  });
});
