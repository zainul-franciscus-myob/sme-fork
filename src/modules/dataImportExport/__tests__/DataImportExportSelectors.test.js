import {
  getCanImportChartOfAccounts,
  getCurrentDataTypeInCurrentTab,
} from '../selectors/DataImportExportSelectors';

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

  describe('getCanImportChartOfAccounts', () => {
    it('returns true if the file and duplicateRecordsOption have been selected', () => {
      const state = {
        import: {
          chartOfAccounts: {
            importFile: { 1: 'a' },
            duplicateRecordsOption: 'someAction',
          },
        },
      };
      const actual = getCanImportChartOfAccounts(state);

      expect(actual).toEqual(true);
    });

    it('returns false if either the file or duplicateRecordsOption is not present', () => {
      const state = {
        import: { chartOfAccounts: { importFile: undefined, duplicateRecordsOption: 'someAction' } },
      };
      const actual = getCanImportChartOfAccounts(state);

      expect(actual).toEqual(false);
    });
  });
});
