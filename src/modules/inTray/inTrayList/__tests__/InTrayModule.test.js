import * as debounce from '../../../../common/debounce/debounce';
import {
  LOAD_IN_TRAY,
  SET_ALERT,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SORT_AND_FILTER_IN_TRAY_LIST,
} from '../../InTrayIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL } from '../../inTrayMessageTypes';
import {
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from '../../../bill/billDetail/types/BillMessageTypes';
import {
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
} from '../../../spendMoney/spendMoneyMessageTypes';
import InTrayModule from '../InTrayModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInTrayDispatcher from '../createInTrayDispatcher';
import createInTrayIntegrator from '../createInTrayIntegrator';
import inTrayReducer from '../reducer/inTrayReducer';
import loadInTrayResponse from '../../mappings/data/loadInTrayResponse.json';

describe('InTrayModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const store = new TestStore(inTrayReducer);
    const integration = new TestIntegration();
    const popMessages = () => [];

    const module = new InTrayModule({ setRootView, integration, popMessages });
    module.store = store;
    module.dispatcher = createInTrayDispatcher(store);
    module.integrator = createInTrayIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '🐛',
      region: 'au',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithLoadingEntry = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;
    const { id } = loadInTrayResponse.entries[0];

    module.run({
      businessId: '🐛',
      region: 'au',
    });

    store.resetActions();

    module.dispatcher.setInTrayListEntrySubmittingState(id, true);

    expect(store.getActions()).toEqual([
      {
        intent: SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
        id,
        isSubmitting: true,
      },
    ]);

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };


  describe('run', () => {
    it('successfully load', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🐛',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🐛',
            region: 'au',
          },
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
          intent: LOAD_IN_TRAY,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_IN_TRAY,
        }),
      ]);
    });

    it('fails to load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_IN_TRAY);

      module.run({
        businessId: '🐛',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🐛',
            region: 'au',
          },
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
          intent: LOAD_IN_TRAY,
        }),
      ]);
    });

    [
      SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
      SUCCESSFULLY_SAVED_BILL,
      SUCCESSFULLY_SAVED_SPEND_MONEY,
      SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
    ].forEach(messageType => {
      it(`alerts when message with type \`${messageType.toString()}\` popped`, () => {
        const { module, store } = setup();
        module.popMessages = () => [
          {
            type: messageType,
            content: '😻',
          },
        ];

        module.run({
          businessId: '🐛',
          region: 'au',
        });

        expect(store.getActions()).toContainEqual({
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: '😻',
          },
        });
      });
    });

    it(`info alerts when message with type \`${SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK.toString()}\` popped`, () => {
      const { module, store } = setup();
      module.popMessages = () => [
        {
          type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
          content: '😻',
        },
      ];

      module.run({
        businessId: '🐛',
        region: 'au',
      });

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'info',
          message: '😻',
        },
      });
    });
  });

  describe('updateFilterOptions', () => {
    const setupWithMockedDebounce = () => {
      const toolbox = setupWithRun();
      debounce.default = jest.fn().mockImplementation(fn => fn);
      return toolbox;
    };

    it('successfully filters', () => {
      const { module, store, integration } = setupWithMockedDebounce();

      module.updateFilterOptions({ key: 'keywords', value: '👨🏻‍💻' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_IN_TRAY_LIST_FILTER_OPTIONS,
          key: 'keywords',
          value: '👨🏻‍💻',
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
      expect(debounce.default).toHaveBeenCalled();
    });

    it('fails to filter', () => {
      const { module, store, integration } = setupWithMockedDebounce();
      integration.mapFailure(SORT_AND_FILTER_IN_TRAY_LIST);

      module.updateFilterOptions({ key: 'keywords', value: '👨🏻‍💻' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_IN_TRAY_LIST_FILTER_OPTIONS,
          key: 'keywords',
          value: '👨🏻‍💻',
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
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
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
    });

    it('does nothing when an entry is loading', () => {
      const { module, store, integration } = setupWithLoadingEntry();

      module.updateFilterOptions({ key: 'keywords', value: '👨🏻‍💻' });

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('sortInTrayList', () => {
    it('successfully sorts', () => {
      const { module, store, integration } = setupWithRun();

      module.sortInTrayList('InvoiceNumber');

      expect(store.getActions()).toEqual([
        {
          intent: SET_IN_TRAY_LIST_SORT_ORDER,
          orderBy: 'InvoiceNumber',
          sortOrder: 'asc',
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
    });

    it('fails to sort', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_IN_TRAY_LIST);

      module.sortInTrayList('InvoiceNumber');

      expect(store.getActions()).toEqual([
        {
          intent: SET_IN_TRAY_LIST_SORT_ORDER,
          orderBy: 'InvoiceNumber',
          sortOrder: 'asc',
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
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
          intent: SORT_AND_FILTER_IN_TRAY_LIST,
        }),
      ]);
    });

    it('does nothing when an entry is loading', () => {
      const { module, store, integration } = setupWithLoadingEntry();

      module.sortInTrayList('InvoiceNumber');

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });
});
