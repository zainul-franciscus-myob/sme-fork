import { SET_INITIAL_STATE } from '../../SystemIntents';
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
});
