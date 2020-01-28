import {
  getExportChartOfAccountsQueryParams,
  getExportCompanyFileQueryParams,
  getImportChartOfAccountsPayload,
  getImportContactsPayload,
} from '../selectors/DataImportExportIntegratorSelectors';
import ExportCompanyFileType from '../types/ExportCompanyFileType';

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

  describe('getExportCompanyFileQueryParams', () => {
    it('returns the right query params to export Chart of accounts data', () => {
      const state = {
        export: {
          companyFile: {
            dateFrom: '2020-01-01',
            dateTo: '2020-01-31',
            fileType: ExportCompanyFileType.MYOB_AE_MAS,
            clientCode: 'ABC',
          },
        },
      };

      const actual = getExportCompanyFileQueryParams(state);
      const expected = {
        dateFrom: '2020-01-01',
        dateTo: '2020-01-31',
        fileType: ExportCompanyFileType.MYOB_AE_MAS,
        clientCode: 'ABC',
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
          importFile: someFile,
          duplicateRecordsOption: 'someAction',
        },
      };

      const actual = getImportChartOfAccountsPayload(state);
      const expected = {
        sourceFile: someFile,
        duplicateCheckMode: 'someAction',
        source: 'File',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportContactsPayload', () => {
    it('returns the right payload to import Chart of accounts', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        import: {
          importFile: someFile,
          duplicateRecordsOption: 'someAction',
          contacts: {
            identifyBy: 'SomeVal',
            type: 'Supplier',
          },
        },
      };

      const actual = getImportContactsPayload(state);
      const expected = {
        File: someFile,
        DuplicateCheckMode: 'someAction',
        Region: 'AU',
        IdentifyBy: 'SomeVal',
        Type: 'Supplier',
      };

      expect(actual).toEqual(expected);
    });
  });
});
