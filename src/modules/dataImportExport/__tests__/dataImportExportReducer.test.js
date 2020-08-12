import {
  ADD_IMPORT_FILE,
  LOAD_DATA_IMPORT_EXPORT,
  UPDATE_CONTACTS_IDENTIFY_BY,
  UPDATE_IMPORT_DATA_TYPE,
  UPDATE_PERIOD_DATE_RANGE,
} from '../DataImportExportIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ContactType from '../types/ContactType';
import DuplicateRecordOption from '../types/DuplicateRecordOption';
import ImportExportDataType from '../types/ImportExportDataType';
import Periods from '../../../components/PeriodPicker/Periods';
import dataImportExportReducer from '../dataImportExportReducer';
import getDateRangeByPeriodAndRegion from '../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

jest.mock('../../../components/PeriodPicker/getDateRangeByPeriodAndRegion');

describe('dataImportExportReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    getDateRangeByPeriodAndRegion.mockReturnValue({
      dateFrom: '2019-11-01',
      dateTo: '2019-11-30',
    });

    const initialState = {
      settingsVersion: 'a version',
      import: { selectedDataType: '' },
      export: {
        selectedDataType: '',
        companyFile: {
          dateFrom: '',
          dateTo: '',
          fileType: '',
          period: Periods.lastMonth,
        },
      },
    };

    it.each([
      ['someImportType', 'someExportType', 'someImportType', 'someExportType'],
      ['someImportType', undefined, 'someImportType', ''],
      [undefined, 'someExportType', '', 'someExportType'],
      [undefined, undefined, '', ''],
    ])(
      'set the initial state correctly with the query params provided',
      (
        importTypeQueryParam,
        exportTypeQueryParam,
        selectedDataTypeForImport,
        selectedDataTypeForExport
      ) => {
        const state = {
          import: { selectedDataType: '' },
          export: {
            selectedDataType: '',
            companyFile: { period: Periods.lastMonth },
          },
        };

        const action = {
          intent: SET_INITIAL_STATE,
          context: {
            importType: importTypeQueryParam,
            exportType: exportTypeQueryParam,
          },
          settings: {},
        };

        const actual = dataImportExportReducer(state, action);

        expect(actual.import.selectedDataType).toEqual(
          selectedDataTypeForImport
        );
        expect(actual.export.selectedDataType).toEqual(
          selectedDataTypeForExport
        );
      }
    );

    it('Set initial dateFrom/dateTo to last month if no settings from local storage', () => {
      const actual = dataImportExportReducer(initialState, {
        intent: SET_INITIAL_STATE,
        context: {},
        settings: {},
      });

      expect(actual.export.companyFile.period).toEqual(Periods.lastMonth);
      expect(actual.export.companyFile.dateFrom).toEqual('2019-11-01');
      expect(actual.export.companyFile.dateTo).toEqual('2019-11-30');
    });

    [
      {
        name: 'undefined',
        settings: undefined,
      },
      {
        name: 'different settingsVersion',
        settings: {
          settingsVersion: 'a different version 😭',
          dateFrom: '2020-01-01',
          dateTo: '2021-01-01',
          fileType: 'Test File Type',
        },
      },
    ].forEach((test) => {
      it(`uses default settings when settings is ${test.name}`, () => {
        const actual = dataImportExportReducer(initialState, {
          intent: SET_INITIAL_STATE,
          context: {},
          settings: test.settings,
        });

        expect(actual.export.companyFile).toEqual({
          dateFrom: expect.any(String),
          dateTo: expect.any(String),
          fileType: expect.any(String),
          period: Periods.lastMonth,
        });
      });
    });

    it('uses given settings when settingsVersion are the same', () => {
      const actual = dataImportExportReducer(initialState, {
        intent: SET_INITIAL_STATE,
        context: {},
        settings: {
          settingsVersion: 'a version',
          period: Periods.custom,
          dateFrom: '12/12/2020',
          dateTo: '12/01/2021',
          fileType: 'Test File Type',
        },
      });

      expect(actual.export.companyFile).toEqual({
        period: Periods.custom,
        dateFrom: '12/12/2020',
        dateTo: '12/01/2021',
        fileType: 'Test File Type',
      });
    });
  });

  describe('LOAD_DATA_IMPORT_EXPORT', () => {
    it('Updates account export state properly', () => {
      const state = {
        export: {
          chartOfAccounts: {
            otherProps: '...',
            fileType: 'fileType1',
            fileTypeOptions: [
              { name: 'fileType1Name', value: 'fileType1' },
              { name: 'fileType2Name', value: 'fileType2' },
            ],
          },
        },
      };

      const action = {
        intent: LOAD_DATA_IMPORT_EXPORT,
        export: {
          chartOfAccounts: {
            fileType: 'fileType2',
          },
        },
      };

      const expectedExportChartOfAccounts = {
        ...state.export.chartOfAccounts,
        fileType: 'fileType2',
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual.export.chartOfAccounts).toEqual(
        expectedExportChartOfAccounts
      );
    });
  });

  describe('UPDATE_CONTACTS_IDENTIFY_BY', () => {
    it('Sets contact identifyBy', () => {
      const state = {
        import: {
          contacts: {
            identifyBy: ContactIdentifyBy.ID,
          },
        },
      };

      const action = {
        intent: UPDATE_CONTACTS_IDENTIFY_BY,
        identifyBy: ContactIdentifyBy.NAME,
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual.import.contacts.identifyBy).toEqual(ContactIdentifyBy.NAME);
    });

    describe(`when duplicateRecordsOption is ${DuplicateRecordOption.ADD}`, () => {
      [ContactIdentifyBy.DISPLAY_ID, ContactIdentifyBy.ID].forEach(
        (identifyBy) => {
          it(`Sets duplicateRecordsOption to default and when identifyBy is ${identifyBy}`, () => {
            const state = {
              import: {
                duplicateRecordsOption: DuplicateRecordOption.ADD,
                contacts: {
                  identifyBy: ContactIdentifyBy.NAME,
                },
              },
            };

            const action = {
              intent: UPDATE_CONTACTS_IDENTIFY_BY,
              identifyBy,
            };

            const actual = dataImportExportReducer(state, action);

            expect(actual.import.duplicateRecordsOption).toEqual(
              DuplicateRecordOption.UPDATE_EXISTING
            );
          });
        }
      );
    });
  });
  describe('UPDATE_IMPORT_DATA_TYPE', () => {
    it('Sets import selectedDataType', () => {
      const state = {
        import: {
          selectedDataType: ImportExportDataType.CONTACTS,
        },
      };

      const action = {
        intent: UPDATE_IMPORT_DATA_TYPE,
        dataType: ImportExportDataType.CHART_OF_ACCOUNTS,
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual.import.selectedDataType).toEqual(
        ImportExportDataType.CHART_OF_ACCOUNTS
      );
    });

    it('Always resets import', () => {
      const state = {
        import: {
          selectedDataType: ImportExportDataType.CONTACTS,
          duplicateRecordsOption: DuplicateRecordOption.ADD,
        },
      };

      const action = {
        intent: UPDATE_IMPORT_DATA_TYPE,
        dataType: ImportExportDataType.CHART_OF_ACCOUNTS,
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual.import).toEqual({
        selectedDataType: ImportExportDataType.CHART_OF_ACCOUNTS,
        importFile: undefined,
        isFileValid: false,
        fileValidationError: 'File is required.',
        deleteUnusedAccounts: false,
        duplicateRecordsOption: DuplicateRecordOption.UPDATE_EXISTING,
        contacts: {
          identifyBy: ContactIdentifyBy.NAME,
          type: ContactType.CUSTOMER,
        },
      });
    });
  });

  describe('ADD_IMPORT_FILE', () => {
    it('Sets default state and clears error for file with valid size', () => {
      const state = {
        import: {
          importFile: {
            name: 'abc.txt',
            size: 300000000000000,
          },
          isFileValid: false,
          fileValidationError: 'File is above 25MB',
        },
      };

      const expected = {
        import: {
          importFile: {
            name: 'def.txt',
            size: 1500,
          },
          isFileValid: true,
          fileValidationError: '',
        },
      };

      const action = {
        intent: ADD_IMPORT_FILE,
        file: {
          name: 'def.txt',
          size: 1500,
        },
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('Sets failed state and error for file with invalid size', () => {
      const state = {
        import: {
          importFile: {
            name: 'abc.txt',
            size: 1500,
          },
          isFileValid: true,
          fileValidationError: '',
        },
      };

      const expected = {
        import: {
          importFile: {
            name: 'def.txt',
            size: 3000000000000000,
          },
          isFileValid: false,
          fileValidationError: 'File must be under 25MB.',
        },
      };

      const action = {
        intent: ADD_IMPORT_FILE,
        file: {
          name: 'def.txt',
          size: 3000000000000000,
        },
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('UPDATE_PERIOD_DATE_RANGE', () => {
    it('should update the selected tab', () => {
      const state = {
        export: {
          companyFile: {
            period: Periods.thisMonth,
            dateFrom: '',
            dateTo: '',
          },
        },
      };

      const period = Periods.thisMonth;
      const dateFrom = '21/02/2019';
      const dateTo = '21/03/2019';

      const action = {
        intent: UPDATE_PERIOD_DATE_RANGE,
        period,
        dateFrom,
        dateTo,
      };

      const actual = dataImportExportReducer(state, action);

      expect(actual.export.companyFile.period).toEqual(period);
      expect(actual.export.companyFile.dateFrom).toEqual(dateFrom);
      expect(actual.export.companyFile.dateTo).toEqual(dateTo);
    });
  });
});
