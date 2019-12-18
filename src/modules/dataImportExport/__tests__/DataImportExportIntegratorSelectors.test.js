import { getExportChartOfAccountsQueryParams, getImportChartOfAccountsPayload } from '../selectors/DataImportExportIntegratorSelectors';

describe('DataImportExportIntegratorSelectors', () => {
  describe('getExportChartOfAccountsQueryParams', () => {
    it('returns the right query params to export Chart of accounts data', () => {
      const state = {
        export: {
          chartOfAccounts: {
            financialYear: '2000',
            accountBalanceTransaction: 'someTransaction',
          },
        },
      };

      const actual = getExportChartOfAccountsQueryParams(state);
      const expected = {
        financialYear: '2000',
        accountBalanceTransaction: 'someTransaction',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportChartOfAccountsPayload', () => {
    it('returns the right payload to import Chart of accounts', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        import: {
          chartOfAccounts: {
            importFile: someFile,
            duplicateRecordsOption: 'someAction',
            duplicateRecordsOptions: [
              {
                name: 'someAction',
                value: 'someActionValue',
              },
              {
                name: 'anotherAction',
                value: 'anotherActionValue',
              },
            ],
          },
        },
      };

      const actual = getImportChartOfAccountsPayload(state);
      const expected = {
        sourceFile: someFile,
        duplicateCheckMode: 'someActionValue',
        source: 'File',
      };

      expect(actual).toEqual(expected);
    });
  });
});
