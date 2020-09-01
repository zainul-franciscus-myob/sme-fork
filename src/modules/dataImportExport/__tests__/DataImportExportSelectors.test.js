import {
  getCurrentDataTypeInCurrentTab,
  getExportChartOfAccountsFileName,
  getIsDuplicateRecordsAddShown,
} from '../selectors/DataImportExportSelectors';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ImportExportDataType from '../types/ImportExportDataType';
import ImportExportFileType from '../types/ImportExportFileType';

describe('DataImportExportSelectors', () => {
  describe('getCurrentDataTypeInCurrentTab', () => {
    it.each([
      ['import', 'chartOfAccounts', 'chartOfAccounts'],
      ['import', 'invalidDataType', ''],
      ['import', '', ''],
      ['export', 'chartOfAccounts', 'chartOfAccounts'],
      ['export', 'invalidDataType', ''],
      ['export', '', ''],
    ])(
      'returns the data type for a particular state data type in the currently selected tab',
      (currentTab, stateDataType, returnedSelectedDataType) => {
        const state = {
          selectedTab: currentTab,
          [currentTab]: { selectedDataType: stateDataType },
        };
        const actual = getCurrentDataTypeInCurrentTab(state);
        expect(actual).toEqual(returnedSelectedDataType);
      }
    );
  });
  describe('getIsDuplicateRecordsAddShown', () => {
    describe(`When selectedDataType is ${ImportExportDataType.CONTACTS}`, () => {
      it(`Returns true when identifyBy is ${ContactIdentifyBy.NAME}`, () => {
        const state = {
          import: {
            selectedDataType: ImportExportDataType.CONTACTS,
            contacts: {
              identifyBy: ContactIdentifyBy.NAME,
            },
          },
        };
        const actual = getIsDuplicateRecordsAddShown(state);
        expect(actual).toEqual(true);
      });
    });
    describe(`When selectedDataType is ${ImportExportDataType.EMPLOYEES}`, () => {
      it(`Returns true when identifyBy is ${ContactIdentifyBy.NAME}`, () => {
        const state = {
          import: {
            selectedDataType: ImportExportDataType.EMPLOYEES,
            contacts: {
              identifyBy: ContactIdentifyBy.NAME,
            },
          },
        };
        const actual = getIsDuplicateRecordsAddShown(state);
        expect(actual).toEqual(true);
      });
    });

    [
      ImportExportDataType.CHART_OF_ACCOUNTS,
      ImportExportDataType.ITEMS,
      ImportExportDataType.GENERAL_JOURNALS,
      ImportExportDataType.TRANSACTION_JOURNALS,
    ].forEach((dataType) => {
      describe(`When selectedDataType is ${dataType}`, () => {
        it(`Returns false when identifyBy is ${ContactIdentifyBy.NAME}`, () => {
          const state = {
            import: {
              selectedDataType: dataType,
              contacts: {
                identifyBy: ContactIdentifyBy.NAME,
              },
            },
          };
          const actual = getIsDuplicateRecordsAddShown(state);
          expect(actual).toEqual(false);
        });
      });
    });
  });

  describe('getExportChartOfAccountsFileName', () => {
    it('Should return file name with only alphanumerical characters in pascal case', () => {
      const state = {
        export: {
          businessName: "Maria Spicy's t0rtill4 special-char_*)$",
          chartOfAccounts: {
            financialYear: '2019',
            fileType: ImportExportFileType.TXT,
          },
        },
      };
      const expectedFileName =
        'MariaSpicyST0rtill4SpecialChar-ChartOfAccounts-2019.txt';
      const actual = getExportChartOfAccountsFileName(state);
      expect(actual).toEqual(expectedFileName);
    });

    it('Should return file name without business name', () => {
      const state = {
        export: {
          businessName: '',
          chartOfAccounts: {
            financialYear: '2019',
            fileType: ImportExportFileType.TXT,
          },
        },
      };
      const expectedFileName = 'ChartOfAccounts-2019.txt';
      const actual = getExportChartOfAccountsFileName(state);
      expect(actual).toEqual(expectedFileName);
    });
  });
});
