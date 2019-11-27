import { getImportChartOfAccountsUrl, getTableEntries } from '../AccountListSelectors';

describe('AccountListSelectors', () => {
  describe('getTableEntries', () => {
    it('should return table entries for the view', () => {
      const entries = [
        { id: 'id-1', level: 1 },
        { id: 'id-2', level: 2 },
      ];

      const expected = [
        {
          id: 'id-1', level: 1, displayLevel: 'Level 1', link: '/#/undefined/undefined/account/id-1',
        },
        {
          id: 'id-2', level: 2, displayLevel: 'Level 2', indentLevel: 1, link: '/#/undefined/undefined/account/id-2',
        },
      ];

      const actual = getTableEntries.resultFunc(entries);

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
      const expected = '/#/au/abc/dataImportExport?importType=chartOfAccounts&exportType=chartOfAccounts';

      expect(actual).toEqual(expected);
    });
  });
});
