import {
  getExportChartOfAccountsQueryParams,
  getExportCompanyFileQueryParams,
  getImportChartOfAccountsPayload,
  getImportContactsPayload,
  getImportEmployeesPayload,
  getImportGeneralJournalsPayload,
  getImportItemsPayload,
  getImportTimesheetsPayload,
  getImportTransactionJournalsPayload,
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
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          duplicateRecordsOption: 'someAction',
        },
      };

      const actual = getImportChartOfAccountsPayload(state);
      const expected = {
        File: someFile,
        DuplicateCheckMode: 'someAction',
        Region: 'AU',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportContactsPayload', () => {
    it('returns the right payload to import Contacts', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          isFileValid: true,
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
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportEmployeesPayload', () => {
    it('returns the right payload to import Employees', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          isFileValid: true,
          duplicateRecordsOption: 'someAction',
          contacts: {
            identifyBy: 'SomeVal',
          },
        },
      };

      const actual = getImportEmployeesPayload(state);
      const expected = {
        File: someFile,
        DuplicateCheckMode: 'someAction',
        Region: 'AU',
        IdentifyBy: 'SomeVal',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportItemsPayload', () => {
    it('returns the right payload to import Items', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          isFileValid: true,
          duplicateRecordsOption: 'someAction',
        },
      };

      const actual = getImportItemsPayload(state);
      const expected = {
        File: someFile,
        DuplicateCheckMode: 'someAction',
        Region: 'AU',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportGeneralJournalsPayload', () => {
    it('returns the right payload to import General Journals', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          isFileValid: true,
        },
      };

      const actual = getImportGeneralJournalsPayload(state);
      const expected = {
        File: someFile,
        Region: 'AU',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportTransactionJournalsPayload', () => {
    it('returns the right payload to import Transaction Journals', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          isFileValid: true,
          importFile: someFile,
        },
      };

      const actual = getImportTransactionJournalsPayload(state);
      const expected = {
        File: someFile,
        Region: 'AU',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getImportTimesheetsPayload', () => {
    it('returns the right payload to import Timesheets', () => {
      const someFile = {
        name: 'someName',
        data: 'someData',
      };

      const state = {
        region: 'AU',
        businessId: '123',
        email: 'abc@test.com',
        import: {
          importFile: someFile,
          isFileValid: true,
          contacts: {
            identifyBy: 'SomeVal',
          },
        },
      };

      const actual = getImportTimesheetsPayload(state);
      const expected = {
        File: someFile,
        Region: 'AU',
        IdentifyBy: 'SomeVal',
        BusinessId: '123',
        Email: 'abc@test.com',
      };

      expect(actual).toEqual(expected);
    });
  });
});
