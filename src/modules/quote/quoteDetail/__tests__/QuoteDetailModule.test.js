import {
  CREATE_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  RELOAD_QUOTE_DETAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_SUBMITTING_STATE,
  UPDATE_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
} from '../../QuoteIntents';
import ModalType from '../ModalType';
import QuoteDetailModule from '../QuoteDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createQuoteDetailDispatcher from '../createQuoteDetailDispatcher';
import createQuoteDetailIntegrator from '../createQuoteDetailIntegrator';
import loadQuoteDetailResponse from '../../mappings/data/loadQuoteDetail';
import quoteDetailReducer from '../reducer/quoteDetailReducer';

describe('QuoteDetailModule', () => {
  const setUp = () => {
    const setRootView = () => {};
    const pushMessage = () => {};
    const popMessages = () => [];
    const reload = () => {};
    const replaceURLParams = () => {};
    const integration = new TestIntegration();

    const module = new QuoteDetailModule({
      integration,
      setRootView,
      pushMessage,
      popMessages,
      reload,
      replaceURLParams,
    });
    module.redirectToUrl = jest.fn();
    const store = new TestStore(quoteDetailReducer);
    module.store = store;
    module.dispatcher = createQuoteDetailDispatcher(store);
    module.integrator = createQuoteDetailIntegrator(store, integration);

    return { module, store, integration };
  };

  const setUpWithNew = () => {
    const { module, integration, store } = setUp();

    module.run({ quoteId: 'new', businessId: 'businessId', region: 'au' });

    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  const setUpWithExisting = () => {
    const { module, integration, store } = setUp();

    module.run({ quoteId: 'quoteId', businessId: 'businessId', region: 'au' });

    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('saveAndEmailQuote', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithNew();
        module.replaceURLParams = jest.fn();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_QUOTE } },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open email modal when create quote failed', () => {
        const { module, store, integration } = setUpWithNew();
        const message = 'Error';
        integration.mapFailure(CREATE_QUOTE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload quote failed', () => {
        const { module, store, integration } = setUpWithNew();
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
      });
    });

    describe('existing quote', () => {
      const setUpWithEdited = () => {
        const { module, store, integration } = setUpWithExisting();
        module.updateQuoteDetailHeaderOptions({ key: 'note', value: 'random' });
        store.resetActions();

        return { module, store, integration };
      };

      it('update quote, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithEdited();
        module.replaceURLParams = jest.fn();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_QUOTE } },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update quote failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(UPDATE_QUOTE_DETAIL, { message });

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload quote failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
      });
    });

    describe('does not have reply email address', () => {
      it('open email settings', () => {
        const { module, store, integration } = setUp();
        integration.mapSuccess(LOAD_QUOTE_DETAIL, {
          ...loadQuoteDetailResponse,
          emailQuote: {
            ...loadQuoteDetailResponse.emailQuote,
            hasEmailReplyDetails: false,
          },
        });
        module.run({ quoteId: 'quoteId', businessId: 'businessId', region: 'au' });
        store.resetActions();
        integration.resetRequests();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual(expect.arrayContaining([
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_SETTINGS } },
        ]));
      });
    });
  });

  describe('exportPdfOrSaveAndExportPdf', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithNew();
        module.replaceURLParams = jest.fn();

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EXPORT_PDF } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open export pdf modal when create quote failed', () => {
        const { module, store, integration } = setUpWithNew();
        const message = 'Error';
        integration.mapFailure(CREATE_QUOTE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload quote failed', () => {
        const { module, store, integration } = setUpWithNew();
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
      });
    });

    describe('existing quote that has been edited', () => {
      const setUpWithEdited = () => {
        const { module, store, integration } = setUpWithExisting();
        module.updateQuoteDetailHeaderOptions({ key: 'note', value: 'random' });
        store.resetActions();

        return { module, store, integration };
      };

      it('update quote, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithEdited();
        module.replaceURLParams = jest.fn();

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EXPORT_PDF } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update quote failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(UPDATE_QUOTE_DETAIL, { message });

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload quote failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
      });
    });

    describe('existing quote that has not been edited', () => {
      it('open export pdf modal', () => {
        const { module, store, integration } = setUpWithExisting();

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: OPEN_MODAL, modal: { type: ModalType.EXPORT_PDF } },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });
  });
});
