import {
  LOAD_PURCHASE_SETTINGS,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import PurchaseSettingsModule from '../PurchaseSettingsModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createPurchaseSettingsDispatcher from '../createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from '../createPurchaseSettingsIntegrator';
import purchaseSettingsDetailReducer from '../purchaseSettingsReducer';
import successResponse from '../mappings/data/success';

describe('PurchaseSettingsDetailModule', () => {
  const setRootView = () => {};
  const setup = () => {
    const store = new TestStore(purchaseSettingsDetailReducer);
    const integration = new TestIntegration();

    const module = new PurchaseSettingsModule({
      store,
      integration,
      setRootView,
    });
    module.store = store;
    module.dispatcher = createPurchaseSettingsDispatcher(store);
    module.integrator = createPurchaseSettingsIntegrator(store, integration);

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
          intent: LOAD_PURCHASE_SETTINGS,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_SETTINGS,
        }),
      ]);
    });

    it('fails to load purchase settings', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_PURCHASE_SETTINGS);

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
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_SETTINGS,
        }),
      ]);
    });
  });

  describe('saveEmailSettings', () => {
    it('saves with correct payload', () => {
      const { module, store, integration } = setupWithRun();

      store.setState({
        ...store.getState(),
        defaultRemittanceEmailSettings: {
          remittanceAdviceEmailBody: 'body',
          remittanceAdviceEmailSubject: 'subject',
        },
      });

      module.saveEmailSettings();

      expect(store.getActions()).toEqual([
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
            message: successResponse.message,
            type: 'success',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_EMAIL_SETTINGS,
          content: {
            remittanceAdviceEmailBody: 'body',
            remittanceAdviceEmailSubject: 'subject',
          },
        }),
      ]);
    });
  });
});