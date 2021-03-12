import {
  CLOSE_MODAL,
  EXPORT_SAMPLE_PDF,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PENDING_TAB,
  SET_TAB,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import { mainTabIds } from '../tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import PurchaseSettingsModule from '../PurchaseSettingsModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createPurchaseSettingsDispatcher from '../createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from '../createPurchaseSettingsIntegrator';
import modalTypes from '../modalTypes';
import openBlob from '../../../common/blobOpener/openBlob';
import purchaseSettingsReducer from '../purchaseSettingsReducer';
import successResponse from '../mappings/data/success';

jest.mock('../../../common/blobOpener/openBlob');

describe('PurchaseSettingsModule', () => {
  const setRootView = () => {};
  const setup = () => {
    const store = new TestStore(purchaseSettingsReducer);
    const integration = new TestIntegration();
    const featureToggles = { isPurchaseOrderEnabled: false };

    const module = new PurchaseSettingsModule({
      store,
      integration,
      setRootView,
      featureToggles,
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
            isPurchaseOrderEnabled: false,
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
            isPurchaseOrderEnabled: false,
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
        tabData: {
          fromName: 'name',
          fromEmail: 'reply@to.com',
          remittanceAdviceEmailBody: 'body',
          remittanceAdviceEmailSubject: 'subject',
          purchaseOrderEmailBody: 'body',
          purchaseOrderEmailSubject: 'subject',
          isPurchaseOrderNumberIncluded: 'true',
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
        {
          intent: SAVE_TAB_DATA,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_EMAIL_SETTINGS,
          content: {
            fromName: 'name',
            fromEmail: 'reply@to.com',
            remittanceAdviceEmailBody: 'body',
            remittanceAdviceEmailSubject: 'subject',
            purchaseOrderEmailBody: 'body',
            purchaseOrderEmailSubject: 'subject',
            isPurchaseOrderNumberIncluded: 'true',
          },
        }),
      ]);
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
      module.dispatcher.updateEmailSettingsField({
        key: 'replyToEmail',
        value: '🦄',
      });
      store.resetActions();

      module.switchTab(mainTabIds.templates);

      expect(store.getActions()).toEqual([
        {
          intent: SET_PENDING_TAB,
          pendingTab: mainTabIds.templates,
        },
        {
          intent: OPEN_MODAL,
          modalType: modalTypes.SWITCH_TAB,
        },
      ]);
    });
  });

  describe('onConfirmSwitchTab', () => {
    const setupWithSwitchTabModal = () => {
      const toolbox = setupWithRun();
      const { module, store } = toolbox;

      module.dispatcher.updateEmailSettingsField({
        key: 'replyToEmail',
        value: '🦄',
      });
      module.switchTab(mainTabIds.emailDefaults);

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
          selectedTab: mainTabIds.emailDefaults,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
      expect(module.replaceURLParams).toHaveBeenCalledWith({
        selectedTab: mainTabIds.emailDefaults,
      });
    });
  });

  describe('exportPdf', () => {
    it('downloads sample PDF', () => {
      const { module, integration } = setupWithRun();

      module.exportPdf();

      expect(openBlob).toBeCalledWith(
        expect.objectContaining({ shouldDownload: true })
      );

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: EXPORT_SAMPLE_PDF,
        }),
      ]);
    });
  });
});
