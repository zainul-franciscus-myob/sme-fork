import {
  CLOSE_MODAL,
  LOAD_PAY_DIRECT_SETTINGS,
  LOAD_SALES_SETTINGS,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
  SET_PENDING_TAB,
  SET_TAB,
} from '../../SalesSettingsIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { TEMPLATE_UPDATED } from '../../../template/MessageTypes';
import { mainTabIds } from '../tabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import SalesSettingsDetailModule from '../SalesSettingsDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createSalesSettingsDispatcher from '../createSalesSettingsDispatcher';
import createSalesSettingsIntegrator from '../createSalesSettingsIntegrator';
import modalTypes from '../modalTypes';
import salesSettingsDetailReducer from '../salesSettingsDetailReducer';

describe('SalesSettingsDetailModule', () => {
  const setup = () => {
    const store = new TestStore(salesSettingsDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const popMessages = () => [];

    const module = new SalesSettingsDetailModule({
      store, integration, setRootView, popMessages,
    });
    module.store = store;
    module.dispatcher = createSalesSettingsDispatcher(store);
    module.integrator = createSalesSettingsIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      businessId: '🦖',
      region: 'au',
    });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('successfully loads', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🦖',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦖',
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
          intent: LOAD_SALES_SETTINGS,
        }),
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_PAY_DIRECT_SETTINGS,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_SALES_SETTINGS,
        }),
        expect.objectContaining({
          intent: LOAD_PAY_DIRECT_SETTINGS,
        }),
      ]);
    });

    it('fails to load sales settings', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_SALES_SETTINGS);

      module.run({
        businessId: '🦖',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦖',
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
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_PAY_DIRECT_SETTINGS,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_SALES_SETTINGS,
        }),
        expect.objectContaining({
          intent: LOAD_PAY_DIRECT_SETTINGS,
        }),
      ]);
    });

    it('fails to load pay direct settings', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_PAY_DIRECT_SETTINGS);

      module.run({
        businessId: '🦖',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦖',
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
          intent: LOAD_SALES_SETTINGS,
        }),
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
          isLoading: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_SALES_SETTINGS,
        }),
        expect.objectContaining({
          intent: LOAD_PAY_DIRECT_SETTINGS,
        }),
      ]);
    });

    it('doesnt load paydirect settings when not au', () => {
      const { module, integration } = setup();

      module.run({
        businessId: '🦖',
        region: 'nz',
      });

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_SALES_SETTINGS,
        }),
      ]);
    });

    it('shows alert when receive template updated message', () => {
      const { module, store } = setup();
      module.popMessages = () => [{
        type: TEMPLATE_UPDATED,
        content: '🚀',
      }];

      module.run({
        businessId: '🦖',
        region: 'au',
      });

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🚀',
        },
      });
    });
  });

  describe('switchTab', () => {
    it('sets tab to selected tab', () => {
      const { module, store } = setupWithRun();
      module.replaceURLParams = jest.fn();

      module.switchTab(mainTabIds.emailDefaults);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          selectedTab: mainTabIds.emailDefaults,
        },
      ]);
      expect(module.replaceURLParams).toHaveBeenCalledWith({
        selectedTab: mainTabIds.emailDefaults,
      });
    });

    it('opens switch tab modal when page edited', () => {
      const { module, store } = setupWithRun();
      module.dispatcher.updateEmailSettings({ key: 'replyToEmail', value: '🦄' });
      store.resetActions();

      module.switchTab(mainTabIds.layoutAndTheme);

      expect(store.getActions()).toEqual([
        {
          intent: SET_PENDING_TAB,
          pendingTab: mainTabIds.layoutAndTheme,
        },
        {
          intent: OPEN_MODAL,
          modalType: modalTypes.switchTab,
        },
      ]);
    });
  });

  describe('onConfirmSwitchTab', () => {
    const setupWithSwitchTabModal = () => {
      const toolbox = setupWithRun();
      const { module, store } = toolbox;

      module.dispatcher.updateEmailSettings({ key: 'replyToEmail', value: '🦄' });
      module.switchTab(mainTabIds.layoutAndTheme);

      store.resetActions();

      return toolbox;
    };

    it('sets tab to pending tab', () => {
      const { module, store } = setupWithSwitchTabModal();
      module.replaceURLParams = jest.fn();

      module.onConfirmSwitchTab();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          selectedTab: mainTabIds.layoutAndTheme,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
      expect(module.replaceURLParams).toHaveBeenCalledWith({
        selectedTab: mainTabIds.layoutAndTheme,
      });
    });
  });
});
