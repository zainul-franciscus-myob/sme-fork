import {
  CLOSE_MODAL,
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  PAD_ACCOUNT_NUMBER,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_DETAILS,
} from '../../AccountIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AccountDetailModule from '../AccountDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import accountDetailReducer from '../accountDetailReducer';
import createAccountDetailDispatcher from '../createAccountDetailDispatcher';
import createAccountDetailIntegrator from '../createAccountDetailIntegrator';

describe('AccountDetailModule', () => {
  const setup = () => {
    const store = new TestStore(accountDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};
    const isToggleOn = () => true;

    const module = new AccountDetailModule({
      integration,
      setRootView,
      pushMessage,
      isToggleOn,
    });
    module.store = store;
    module.dispatcher = createAccountDetailDispatcher(store);
    module.integrator = createAccountDetailIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ accountId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('create account', () => {
    it('successfully load new account', () => {
      const { store, integration, module } = setupWithNew();

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
        expect.objectContaining({
          intent: LOAD_ACCOUNT_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_NEW_ACCOUNT,
        }),
      ]);
    });

    it('fails to load new account', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(LOAD_NEW_ACCOUNT);

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
        expect.objectContaining({
          intent: LOAD_NEW_ACCOUNT,
        }),
      ]);
    });

    it('successfully save new account', () => {
      const { store, integration, module } = setupWithNew();

      module.updateOrCreateAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_ACCOUNT,
        }),
      ]);
    });

    it('fails to save new account', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_ACCOUNT);

      module.updateOrCreateAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_ACCOUNT,
        }),
      ]);
    });
  });

  describe('update account', () => {
    it('successfully load account', () => {
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
        expect.objectContaining({
          intent: LOAD_ACCOUNT_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_DETAIL,
        }),
      ]);
    });

    it('fails to load account', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_ACCOUNT_DETAIL);

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
        expect.objectContaining({
          intent: LOAD_ACCOUNT_DETAIL,
        }),
      ]);
    });

    it('successfully save account', () => {
      const { store, integration, module } = setup();

      module.updateOrCreateAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_ACCOUNT,
        }),
      ]);
    });

    it('fails to save account', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(UPDATE_ACCOUNT);

      module.updateOrCreateAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_ACCOUNT,
        }),
      ]);
    });
  });

  describe('delete account', () => {
    it('successfully delete account', () => {
      const { store, integration, module } = setup();

      module.deleteAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_ACCOUNT,
        }),
      ]);
    });

    it('fail to delete account', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(DELETE_ACCOUNT);

      module.deleteAccount();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_ACCOUNT,
        }),
      ]);
    });
  });

  describe('on account number blur', () => {
    it('does not set parent for flex accounts', () => {
      const { store, module } = setup();

      module.onAccountNumberBlur({ key: 'accountNumber', value: '1-1000' });

      expect(store.getActions()).toEqual([
        {
          intent: PAD_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: '1-1000',
        },
      ]);
    });

    it('sets parent for non-flex accounts', () => {
      const { store, module } = setup();

      module.run({ isFlexAccount: false });
      store.resetActions();

      module.onAccountNumberBlur({ key: 'accountNumber', value: '1-1000' });

      expect(store.getActions()).toEqual([
        {
          intent: PAD_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: '1-1000',
        },
        expect.objectContaining({
          intent: UPDATE_ACCOUNT_DETAILS,
          key: 'parentAccountId',
        }),
      ]);
    });
  });
});
