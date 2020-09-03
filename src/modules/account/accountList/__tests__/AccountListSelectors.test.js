import {
  getAccountsForBulkDelete,
  getAccountsForBulkUpdate,
  getImportChartOfAccountsUrl,
  getTableEntries,
} from '../AccountListSelectors';

describe('AccountListSelectors', () => {
  describe('getTableEntries', () => {
    it('should return table entries for the view', () => {
      const entries = [
        { id: 'id-1', level: 1 },
        { id: 'id-2', level: 2 },
      ];

      const expected = [
        {
          id: 'id-1',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/undefined/undefined/account/id-1',
        },
        {
          id: 'id-2',
          level: 2,
          displayLevel: 'Level 2',
          indentLevel: 1,
          link: '/#/undefined/undefined/account/id-2',
          hideAccountNumber: false,
        },
      ];

      const actual = getTableEntries.resultFunc(entries);

      expect(actual).toEqual(expected);
    });

    it('should add hideAccountNumber to entry', () => {
      const state = {
        businessId: '123',
        region: 'au',
        hasFlexibleAccountNumbers: true,
        entries: [
          { id: 'id-1', level: 1, isSystem: true },
          { id: 'id-2', level: 1, isSystem: false },
          { id: 'id-3', level: 2 },
        ],
      };

      const expected = [
        {
          id: 'id-1',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/au/123/account/id-1',
          hideAccountNumber: true,
          isSystem: true,
        },
        {
          id: 'id-2',
          level: 1,
          displayLevel: 'Level 1',
          link: '/#/au/123/account/id-2',
          hideAccountNumber: false,
          isSystem: false,
        },
        {
          id: 'id-3',
          level: 2,
          displayLevel: 'Level 2',
          hideAccountNumber: false,
          indentLevel: 1,
          link: '/#/au/123/account/id-3',
        },
      ];

      const actual = getTableEntries(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportChartOfAccountsUrl', () => {
    it('should return the url to the Import/Export data page where chartOfAccounts is defaulted for both import and export', () => {
      const state = {
        businessId: 'abc',
        region: 'au',
      };
      const actual = getImportChartOfAccountsUrl(state);
      const expected =
        '/#/au/abc/dataImportExport?importType=chartOfAccounts&exportType=chartOfAccounts';

      expect(actual).toEqual(expected);
    });
  });

  describe('bulk delete accounts', () => {
    it('should return selected accounts', () => {
      const state = {
        entries: [
          { id: 1, selected: true },
          { id: 2, selected: false },
        ],
      };
      const actual = getAccountsForBulkDelete(state);
      const expected = { accountIds: [1] };

      expect(actual).toEqual(expected);
    });
  });

  describe('bulk update accounts', () => {
    it('should return dirty accounts', () => {
      const state = {
        entries: [
          { id: 1, dirty: false },
          { id: 2, openingBalance: 111, dirty: true },
        ],
      };
      const actual = getAccountsForBulkUpdate(state);
      const expected = {
        accounts: [
          {
            id: 2,
            openingBalance: 111,
          },
        ],
      };

      expect(actual).toEqual(expected);
    });
  });
});
