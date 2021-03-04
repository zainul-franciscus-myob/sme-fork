import {
  CLOSE_MODAL,
  EXPORT_SAMPLE_PDF,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import PurchaseSettingsModule from '../PurchaseSettingsModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createPurchaseSettingsDispatcher from '../createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from '../createPurchaseSettingsIntegrator';
import modalTypes from '../modalTypes';
import openBlob from '../../../common/blobOpener/openBlob';
import purchaseSettingsDetailReducer from '../purchaseSettingsReducer';
import successResponse from '../mappings/data/success';

jest.mock('../../../common/blobOpener/openBlob');

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

  const setupWithEditedPage = () => {
    const toolbox = setupWithRun();
    const { module, store } = toolbox;

    module.updateEmailSettingsField({
      remittanceAdviceEmailBody: 'woot',
    });

    store.resetActions();

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
        defaultPurchasesEmailSettings: {
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

  describe('handlePageTransition', () => {
    it('opens unsaved modal when page is edited', () => {
      const { module, store } = setupWithEditedPage();

      module.handlePageTransition('/#/foo');

      expect(store.getActions()).toEqual([
        {
          intent: SET_REDIRECT_URL,
          redirectUrl: '/#/foo',
        },
        {
          intent: OPEN_MODAL,
          modalType: modalTypes.UNSAVED,
        },
      ]);
    });

    it('redirect when page is not edited', () => {
      const { module } = setupWithRun();
      module.navigateTo = jest.fn();
      module.handlePageTransition('/#/foo');

      expect(module.navigateTo).toBeCalledWith('/#/foo');
    });
  });

  describe('unsavedModal', () => {
    it('navigates without saving when discarded', () => {
      const { module, integration } = setupWithEditedPage();
      module.navigateTo = jest.fn();

      module.handlePageTransition('/#/bar');
      module.discardAndRedirect();

      expect(integration.getRequests()).toHaveLength(0);

      expect(module.navigateTo).toBeCalledWith('/#/bar');
    });

    it('should not navigate on cancel', () => {
      const { module, store } = setupWithEditedPage();
      module.closeUnsavedModal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_REDIRECT_URL,
          redirectUrl: '',
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
    });
  });
});
