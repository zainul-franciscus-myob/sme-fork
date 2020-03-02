import {
  LOAD_LINKED_ACCOUNTS,
  SAVE_LINKED_ACCOUNTS,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_SELECTED_TAB,
  UPDATE_ACCOUNT,
  UPDATE_HAS_ACCOUNT_OPTION,
} from '../LinkedAccountsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LinkedAccountsModule from '../LinkedAccountsModule';
import LoadingState from '../../../components/PageView/LoadingState';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createLinkedAccountsDispatcher from '../createLinkedAccountsDispatcher';
import createLinkedAccountsIntegrator from '../createLinkedAccountsIntegrator';
import linkedAccountsReducer from '../linkedAccountsReducer';

const setup = () => {
  const store = new TestStore(linkedAccountsReducer);
  const integration = new TestIntegration();
  const setRootView = () => { };

  const module = new LinkedAccountsModule({ integration, setRootView });
  module.store = store;
  module.dispatcher = createLinkedAccountsDispatcher({ store });
  module.integrator = createLinkedAccountsIntegrator({ store, integration });

  return { store, integration, module };
};

const setupWithRun = () => {
  const { store, integration, module } = setup();

  module.run({});
  store.resetActions();
  integration.resetRequests();

  return { store, integration, module };
};

describe('LinkedAccountsModule', () => {
  describe('run', () => {
    it('should load linked accounts', () => {
      const { store, integration, module } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_LINKED_ACCOUNTS }),
      ]);
      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_LINKED_ACCOUNTS,
        },
      ]);
    });

    it('should have a failed loading state when linked accounts fail to load', () => {
      const { store, integration, module } = setup();

      integration.mapFailure(LOAD_LINKED_ACCOUNTS);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
        {
          intent: LOAD_LINKED_ACCOUNTS,
        },
      ]);
    });
  });

  describe('updateAccount', () => {
    it('should dispatch an intent to update the account', () => {
      const { store, module } = setupWithRun();

      module.updateAccount({ key: 'accountKey', value: '2' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_ACCOUNT,
          key: 'accountKey',
          value: '2',
        },
      ]);
    });
  });

  describe('updateHasAccountOption', () => {
    it('should dispatch an intent to update has account option', () => {
      const { store, module } = setupWithRun();

      module.updateHasAccountOption({ key: 'accountKey', value: false });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HAS_ACCOUNT_OPTION,
          key: 'accountKey',
          value: false,
        },
      ]);
    });
  });

  describe('saveLinkedAccounts', () => {
    it('should save a linked account', () => {
      const { store, integration, module } = setupWithRun();

      module.saveLinkedAccounts();

      expect(store.getActions()).toEqual([
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'success',
          }),
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SAVE_LINKED_ACCOUNTS,
        },
      ]);
    });

    it('should not save a linked account if actions are disabled', () => {
      const { store, module } = setupWithRun();

      // Set up
      module.setIsSubmitting(true);
      store.resetActions();
      module.saveLinkedAccounts();

      expect(store.getActions()).toEqual([]);
    });

    it('should display an alert if a linked account was not able to be saved', () => {
      const { store, integration, module } = setupWithRun();

      integration.mapFailure(SAVE_LINKED_ACCOUNTS);

      module.saveLinkedAccounts();

      expect(store.getActions()).toEqual([
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'danger',
          }),
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SAVE_LINKED_ACCOUNTS,
        },
      ]);
    });
  });

  describe('setSelectedTab', () => {
    it('should set a new selected tab', () => {
      const { module, store } = setupWithRun();

      module.setSelectedTab(1);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SELECTED_TAB,
          selectedTab: 1,
        },
      ]);
    });
  });

  describe('resetState', () => {
    it('should reset the state of the module', () => {
      const { module, store } = setupWithRun();

      module.resetState();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_STATE,
        },
      ]);
    });
  });

  describe('dismissAlert', () => {
    it('should set the alert to undefined', () => {
      const { module, store } = setupWithRun();

      module.dismissAlert();

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: undefined,
        },
      ]);
    });
  });
});
