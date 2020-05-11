import {
  BULK_DELETE_UNUSED_ACCOUNTS,
  IMPORT_CHART_OF_ACCOUNTS,
  IMPORT_CONTACTS,
  IMPORT_EMPLOYEES,
  IMPORT_GENERAL_JOURNALS,
  IMPORT_ITEMS,
  IMPORT_TIMESHEETS,
  IMPORT_TRANSACTION_JOURNALS,
  LOAD_DATA_IMPORT_EXPORT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_IMPORT_DATA_TYPE,
} from '../DataImportExportIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import DataImportExportModule from '../DataImportExportModule';
import ImportExportDataType from '../types/ImportExportDataType';
import LoadingState from '../../../components/PageView/LoadingState';
import TabItem from '../types/TabItem';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createDataImportExportDispatcher from '../createDataImportExportDispatcher';
import createDataImportExportIntegrator from '../createDataImportExportIntegrator';
import dataImportExportReducer from '../dataImportExportReducer';

describe('DataImportExportModule', () => {
  const setup = () => {
    const integration = new TestIntegration();
    const store = new TestStore(dataImportExportReducer);
    const setRootView = () => {};
    const replaceURLParams = () => {};
    const module = new DataImportExportModule({
      integration, setRootView, replaceURLParams,
    });
    module.store = store;
    module.dispatcher = createDataImportExportDispatcher(store);
    module.integrator = createDataImportExportIntegrator(store, integration);

    return { integration, store, module };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { integration, store, module } = toolbox;

    module.run({ region: 'au' });
    integration.resetRequests();
    store.resetActions();

    return toolbox;
  };

  describe('run', () => {
    it('successfully load', () => {
      const { integration, store, module } = setup();

      module.run();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_DATA_IMPORT_EXPORT,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_DATA_IMPORT_EXPORT,
        }),
      ]);
    });

    it('fails to load', () => {
      const { integration, store, module } = setup();
      integration.mapFailure(LOAD_DATA_IMPORT_EXPORT);

      module.run();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_DATA_IMPORT_EXPORT,
        }),
      ]);
    });
  });

  describe('importData', () => {
    [
      {
        dataType: ImportExportDataType.CHART_OF_ACCOUNTS,
        intent: [IMPORT_CHART_OF_ACCOUNTS],
      },
      {
        dataType: ImportExportDataType.CHART_OF_ACCOUNTS,
        intent: [BULK_DELETE_UNUSED_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS],
        options: {
          deleteBeforeImport: true,
        },
      },
      {
        dataType: ImportExportDataType.CONTACTS,
        intent: [IMPORT_CONTACTS],
      },
      {
        dataType: ImportExportDataType.EMPLOYEES,
        intent: [IMPORT_EMPLOYEES],
      },
      {
        dataType: ImportExportDataType.ITEMS,
        intent: [IMPORT_ITEMS],
      },
      {
        dataType: ImportExportDataType.GENERAL_JOURNALS,
        intent: [IMPORT_GENERAL_JOURNALS],
      },
      {
        dataType: ImportExportDataType.TRANSACTION_JOURNALS,
        intent: [IMPORT_TRANSACTION_JOURNALS],
      },
      {
        dataType: ImportExportDataType.TIMESHEETS,
        intent: [IMPORT_TIMESHEETS],
      },
    ].forEach((test) => {
      const setupWithDataType = (options) => {
        const toolbox = setupWithRun();
        const { store, module } = toolbox;

        module.dispatcher.setSelectedTab(TabItem.IMPORT);
        module.updateImportDataType({ value: test.dataType });

        if (options && options.deleteBeforeImport) {
          module.dispatcher.updateDeleteUnusedAccounts({ value: true });
        }

        store.resetActions();

        return toolbox;
      };

      it(`successfully imports ${test.dataType}`, () => {
        const { store, integration, module } = setupWithDataType(test.options);

        module.importData();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_TYPE,
            modalType: undefined,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          {
            intent: UPDATE_IMPORT_DATA_TYPE,
            dataType: ImportExportDataType.NONE,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
          {
            intent: SET_ALERT,
            alert: {
              type: 'success',
              message: expect.any(String),
            },
          },
        ]);
        expect(integration.getRequests()).toEqual(
          test.intent.map(intent => expect.objectContaining({
            intent,
          })),
        );
      });

      it(`fails to imports ${test.dataType}`, () => {
        const { store, integration, module } = setupWithDataType(test.options);
        test.intent.forEach(intent => integration.mapFailure(intent));

        module.importData();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_TYPE,
            modalType: undefined,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
          {
            intent: SET_ALERT,
            alert: {
              type: 'danger',
              message: 'fails',
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent[0],
          }),
        ]);
      });
    });

    it('alerts when no data type selected', () => {
      const { store, integration, module } = setupWithRun();

      module.importData();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: undefined,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'Invalid Data Type selected.',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });
  });
});
