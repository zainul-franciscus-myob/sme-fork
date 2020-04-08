import {
  CLOSE_MODAL,
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
import { SUCCESSFULLY_SAVED_QUOTE } from '../QuoteMessageTypes';
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
      featureToggles: { isQuoteJobColumnEnabled: true },
    });
    module.redirectToUrl = jest.fn();
    const store = new TestStore(quoteDetailReducer);
    module.store = store;
    module.dispatcher = createQuoteDetailDispatcher(store);
    module.integrator = createQuoteDetailIntegrator(store, integration);

    return { module, store, integration };
  };

  const setUpWithRun = ({ isCreating = false, isPageEdited = false } = {}) => {
    const { module, integration, store } = setUp();

    module.run({ quoteId: isCreating ? 'new' : 'quoteId', businessId: 'businessId', region: 'au' });

    if (isPageEdited) {
      module.updateQuoteDetailHeaderOptions({ key: 'note', value: 'random' });
    }

    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('saveQuote', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, and show success alert', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        module.replaceURLParams = jest.fn();

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: SET_ALERT, alert: { type: 'success', message: 'Great Work! You\'ve done it well!' } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('show danger alert when create quote failed', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(CREATE_QUOTE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
        ]);
      });

      it('show danger alert when reload quote failed', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.saveQuote();

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
      it('update quote, reload quote, show success alert', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        module.replaceURLParams = jest.fn();

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: SET_ALERT, alert: { type: 'success', message: 'Great Work! You\'ve done it well!' } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('show danger alert when update quote failed', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(UPDATE_QUOTE_DETAIL, { message });

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
        ]);
      });

      it('show danger alert when reload quote failed', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(LOAD_QUOTE_DETAIL, { message });

        module.saveQuote();

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
  });

  describe('saveAndEmailQuote', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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

    describe('existing quote that has been edited', () => {
      it('update quote, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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

    describe('existing quote that has not been edited', () => {
      it('open email modal', () => {
        const { module, store, integration } = setUpWithRun();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_QUOTE } },
        ]);
        expect(integration.getRequests().length).toBe(0);
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
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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
        const { module, store, integration } = setUpWithRun({ isCreating: true });
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
      it('update quote, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
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
        const { module, store, integration } = setUpWithRun();

        module.exportPdfOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: OPEN_MODAL, modal: { type: ModalType.EXPORT_PDF } },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });
  });

  describe('handlePageTransition', () => {
    it('should open an unsaved modal if page has been edited', () => {
      const { module, store } = setUpWithRun({ isPageEdited: true });

      const url = 'some-url';

      module.handlePageTransition(url);
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.UNSAVED,
            url,
          },
        },
      ]);
    });

    it('should redirect to a url if page has not been edited', () => {
      const { module } = setUpWithRun();
      module.redirectToUrl = jest.fn();

      const url = 'some-url';

      module.handlePageTransition(url);
      expect(module.redirectToUrl).toHaveBeenCalledWith(url);
    });
  });

  // TODO: Test redirect after save success once Nav Spike is done
  describe('saveUnsavedChanges', () => {
    it('successfully creates', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true, isPageEdited: true });
      module.pushMessage = jest.fn();
      module.reload = jest.fn();

      const navRedirectToUrl = '/#/au/businessId/quote/new';
      module.handlePageTransition(navRedirectToUrl); // open unsaved modal
      store.resetActions();

      module.saveUnsavedChanges();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_QUOTE_DETAIL,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_QUOTE,
        content: expect.any(String),
      });
    });

    it('successfully updates', () => {
      const { module, store, integration } = setUpWithRun({ isPageEdited: true });
      module.pushMessage = jest.fn();

      const navRedirectToUrl = '/#/au/businessId/quote/new';
      module.handlePageTransition(navRedirectToUrl); // open unsaved modal
      store.resetActions();

      module.saveUnsavedChanges();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_QUOTE_DETAIL,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_QUOTE,
        content: expect.any(String),
      });
    });

    it('fails to save and close unsaved modal', () => {
      const { module, store, integration } = setUpWithRun({ isPageEdited: true });
      integration.mapFailure(UPDATE_QUOTE_DETAIL);

      const navRedirectToUrl = '/#/au/businessId/quote/new';
      module.handlePageTransition(navRedirectToUrl); // open unsaved modal
      store.resetActions();

      module.saveUnsavedChanges();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alert: { message: 'fails', type: 'danger' },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_QUOTE_DETAIL,
        }),
      ]);
    });

    it('should close modal and do an early return', () => {
      const { store, integration, module } = setUpWithRun({ isCreating: true });

      // Setup
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.saveUnsavedChanges();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('saveHandler', () => {
    [
      {
        type: ModalType.CANCEL,
        setup: (module) => {
          module.openCancelModal();
        },
      },
      {
        type: ModalType.DELETE,
        setup: (module) => {
          module.openDeleteModal();
        },
      },
      {
        type: 'account quick add',
        setup: (module, integration) => {
          const onChange = () => {};
          module.openAccountModal(onChange);
          integration.resetRequests();
        },
      },
      {
        type: 'contact quick add',
        setup: (module, integration) => {
          module.openContactModal();
          integration.resetRequests();
        },
      },
      {
        type: 'inventory quick add',
        setup: (module, integration) => {
          const onChange = () => {};
          module.openInventoryModal(onChange);
          integration.resetRequests();
        },
      },
    ].forEach((test) => {
      it(`should not save quote given the modal type ${test.type}`, () => {
        const { module, integration } = setUpWithRun({ isPageEdited: true });

        test.setup(module, integration);
        module.saveHandler();

        expect(integration.getRequests()).not.toContain(
          expect.objectContaining({
            intent: UPDATE_QUOTE_DETAIL,
          }),
        );
      });

      it('should save quote given an unsaved modal is open', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        module.pushMessage = jest.fn();

        const navRedirectToUrl = '/#/au/businessId/quote/new';
        module.handlePageTransition(navRedirectToUrl); // open unsaved modal
        store.resetActions();

        module.saveHandler();
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: UPDATE_QUOTE_DETAIL,
          }),
        ]);
      });
    });
  });
});
