import { SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST } from '../../BankStatementImportIntents';
import BankStatementImportListReducer from '../BankStatementImportListReducer';

describe('BankStatementImportListReducer', () => {
  describe('SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST', () => {
    const state = {
      filterOptions: {
        accountId: '1',
      },
      appliedFilterOptions: {
        accountId: '2',
      },
      entries: [3, 2, 1],
    };

    const action = {
      intent: SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
      entries: [1, 2, 3],
      isSort: false,
    };

    const expected = {
      filterOptions: {
        accountId: '1',
      },
      appliedFilterOptions: {
        accountId: '1',
      },
      entries: [1, 2, 3],
    };

    it('should set applied filter when not sorting', () => {
      const actual = BankStatementImportListReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should not set applied filter when sorting', () => {
      const actual = BankStatementImportListReducer(state, {
        ...action,
        isSort: true,
      });

      expect(actual).toEqual({
        ...expected,
        appliedFilterOptions: {
          accountId: '2',
        },
      });
    });
  });
});
