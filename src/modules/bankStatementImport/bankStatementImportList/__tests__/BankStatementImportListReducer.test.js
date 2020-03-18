import { SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST } from '../../BankStatementImportIntents';
import BankStatementImportListReducer from '../BankStatementImportListReducer';

describe('BankStatementImportListReducer', () => {
  describe('SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST', () => {
    const state = {
      filterOptions: {
        accountId: '1',
      },
      entries: [3, 2, 1],
    };

    const action = {
      intent: SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
      entries: [1, 2, 3],
    };

    const expected = {
      filterOptions: {
        accountId: '1',
      },
      entries: [1, 2, 3],
    };

    it('should set entries', () => {
      const actual = BankStatementImportListReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
