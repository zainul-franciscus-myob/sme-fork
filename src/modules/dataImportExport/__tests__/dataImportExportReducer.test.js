import { SET_INITIAL_STATE } from '../../../SystemIntents';
import { UPDATE_CONTACTS_IDENTIFY_BY, UPDATE_IMPORT_DATA_TYPE } from '../DataImportExportIntents';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ContactType from '../types/ContactType';
import DuplicateRecordOption from '../types/DuplicateRecordOption';
import ImportExportDataType from '../types/ImportExportDataType';
import dataImportExportReducer from '../dataImportExportReducer';

describe('dataImportExportReducer', () => {
  it.each([
    ['someImportType', 'someExportType', 'someImportType', 'someExportType'],
    ['someImportType', undefined, 'someImportType', ''],
    [undefined, 'someExportType', '', 'someExportType'],
    [undefined, undefined, '', ''],
  ])('set the initial state correctly with the query params provided', (
    importTypeQueryParam,
    exportTypeQueryParam,
    selectedDataTypeForImport,
    selectedDataTypeForExport,
  ) => {
    const state = {
      import: { selectedDataType: '' },
      export: { selectedDataType: '' },
    };

    const action = {
      intent: SET_INITIAL_STATE,
      importType: importTypeQueryParam,
      exportType: exportTypeQueryParam,
    };

    const actual = dataImportExportReducer(state, action);

    expect(actual.import.selectedDataType).toEqual(selectedDataTypeForImport);
    expect(actual.export.selectedDataType).toEqual(selectedDataTypeForExport);
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
      [ContactIdentifyBy.DISPLAY_ID, ContactIdentifyBy.ID].forEach((identifyBy) => {
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

          expect(actual.import.duplicateRecordsOption)
            .toEqual(DuplicateRecordOption.UPDATE_EXISTING);
        });
      });
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

      expect(actual.import.selectedDataType).toEqual(ImportExportDataType.CHART_OF_ACCOUNTS);
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
        duplicateRecordsOption: DuplicateRecordOption.UPDATE_EXISTING,
        contacts: {
          identifyBy: ContactIdentifyBy.NAME,
          type: ContactType.CUSTOMER,
        },
      });
    });
  });
});
