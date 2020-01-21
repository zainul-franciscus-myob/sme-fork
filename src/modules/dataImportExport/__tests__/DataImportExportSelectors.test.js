import {
  getCurrentDataTypeInCurrentTab, getIsDuplicateRecordsAddShown,
} from '../selectors/DataImportExportSelectors';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ImportExportDataType from '../types/ImportExportDataType';

describe('DataImportExportSelectors', () => {
  describe('getCurrentDataTypeInCurrentTab', () => {
    it.each([
      ['import', 'chartOfAccounts', 'chartOfAccounts'],
      ['import', 'invalidDataType', ''],
      ['import', '', ''],
      ['export', 'chartOfAccounts', 'chartOfAccounts'],
      ['export', 'invalidDataType', ''],
      ['export', '', ''],
    ])('returns the data type for a particular state data type in the currently selected tab', (
      currentTab,
      stateDataType,
      returnedSelectedDataType,
    ) => {
      const state = {
        selectedTab: currentTab,
        [currentTab]: { selectedDataType: stateDataType },
      };
      const actual = getCurrentDataTypeInCurrentTab(state);
      expect(actual).toEqual(returnedSelectedDataType);
    });
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
    describe(`When selectedDataType is not ${ImportExportDataType.CONTACTS}`, () => {
      it(`Returns false when identifyBy is ${ContactIdentifyBy.NAME}`, () => {
        const state = {
          import: {
            selectedDataType: ImportExportDataType.CHART_OF_ACCOUNTS,
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
