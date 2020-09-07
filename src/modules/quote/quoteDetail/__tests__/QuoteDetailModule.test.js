import {
  CLOSE_MODAL,
  CREATE_QUOTE_DETAIL,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  RELOAD_QUOTE_DETAIL,
  SET_ALERT,
  SET_DUPLICATE_ID,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_SUBMITTING_STATE,
  UPDATE_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
} from '../../QuoteIntents';
import {
  DUPLICATE_QUOTE,
  SUCCESSFULLY_SAVED_QUOTE,
} from '../../../../common/types/MessageTypes';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
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
    const replaceURLParams = () => {};
    const isToggleOn = () => true;
    const integration = new TestIntegration();

    const module = new QuoteDetailModule({
      integration,
      setRootView,
      pushMessage,
      popMessages,
      replaceURLParams,
      isToggleOn,
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

    module.run({
      quoteId: isCreating ? 'new' : 'quoteId',
      businessId: 'businessId',
      region: 'au',
    });

    if (isPageEdited) {
      module.updateQuoteDetailHeaderOptions({ key: 'note', value: 'random' });
    }

    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('run', () => {
    [
      {
        case: 'new',
        quoteId: 'new',
        intent: LOAD_NEW_QUOTE_DETAIL,
      },
      {
        case: 'existing',
        quoteId: '1',
        intent: LOAD_QUOTE_DETAIL,
      },
    ].forEach((test) => {
      describe(`when ${test.case}`, () => {
        it('succesfully load', () => {
          const { module, store, integration } = setUp();

          module.run({
            businessId: 'businessId',
            region: 'au',
            quoteId: test.quoteId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: 'businessId',
                region: 'au',
                quoteId: test.quoteId,
                isQuoteJobColumnEnabled: true,
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
              intent: LOAD_QUOTE_DETAIL,
            }),
          ]);
          expect(integration.getRequests()).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                intent: test.intent,
              }),
            ])
          );
        });

        it('fails to load new', () => {
          const { module, store, integration } = setUp();
          integration.mapFailure(test.intent);

          module.run({
            businessId: 'businessId',
            region: 'au',
            quoteId: test.quoteId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: 'businessId',
                region: 'au',
                quoteId: test.quoteId,
                isQuoteJobColumnEnabled: true,
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
          expect(integration.getRequests()).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                intent: test.intent,
              }),
            ])
          );
        });
      });
    });

    it('shows success alert when got saved message', () => {
      const { module, store } = setUp();
      module.popMessages = () => [
        {
          type: SUCCESSFULLY_SAVED_QUOTE,
          content: '🤣',
        },
      ];

      module.run({ businessId: 'businessId', region: 'au', quoteId: 'new' });

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🤣',
        },
      });
    });

    it('successfully loads duplicate', () => {
      const { module, store, integration } = setUp();
      module.popMessages = () => [
        {
          type: DUPLICATE_QUOTE,
          duplicateId: '🐛',
        },
      ];

      module.run({ businessId: 'businessId', region: 'au', quoteId: 'new' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: 'businessId',
            region: 'au',
            quoteId: 'new',
            isQuoteJobColumnEnabled: true,
          },
        },
        {
          intent: SET_DUPLICATE_ID,
          duplicateId: '🐛',
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
          intent: LOAD_QUOTE_DETAIL,
        }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
            urlParams: {
              businessId: 'businessId',
              duplicateId: '🐛',
            },
          }),
        ])
      );
    });

    it('fails to load duplicate', () => {
      const { module, store, integration } = setUp();
      integration.mapFailure(LOAD_NEW_DUPLICATE_QUOTE_DETAIL);
      module.popMessages = () => [
        {
          type: DUPLICATE_QUOTE,
          duplicateId: '🐛',
        },
      ];

      module.run({ businessId: 'businessId', region: 'au', quoteId: 'new' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: 'businessId',
            region: 'au',
            quoteId: 'new',
            isQuoteJobColumnEnabled: true,
          },
        },
        {
          intent: SET_DUPLICATE_ID,
          duplicateId: '🐛',
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
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
            urlParams: {
              businessId: 'businessId',
              duplicateId: '🐛',
            },
          }),
        ])
      );
    });
  });

  describe('saveQuote', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, and show success alert', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          {
            intent: SET_ALERT,
            alert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('show danger alert when create quote failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          {
            intent: SET_ALERT,
            alert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('show danger alert when update quote failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_QUOTE } },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open email modal when create quote failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_QUOTE_DETAIL }),
          { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_QUOTE } },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_QUOTE_DETAIL }),
          expect.objectContaining({ intent: LOAD_QUOTE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update quote failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        module.run({
          quoteId: 'quoteId',
          businessId: 'businessId',
          region: 'au',
        });
        store.resetActions();
        integration.resetRequests();

        module.saveAndEmailQuote();

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { intent: OPEN_MODAL, modal: { type: ModalType.EMAIL_SETTINGS } },
          ])
        );
      });
    });
  });

  describe('exportPdfOrSaveAndExportPdf', () => {
    describe('new quote', () => {
      it('create quote, update quote id, update url params, reload quote, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
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
      module.navigateTo = jest.fn();
      const url = 'some-url';

      module.handlePageTransition(url);

      expect(module.navigateTo).toHaveBeenCalledWith(url);
    });
  });

  describe('saveAndDuplicate', () => {
    it('should create and redirect with response id', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      integration.mapSuccess(CREATE_QUOTE_DETAIL, {
        message: '🤞',
        id: '👨🏻‍💻',
      });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveAndDuplicate();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: UPDATE_QUOTE_ID_AFTER_CREATE,
          quoteId: '👨🏻‍💻',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_QUOTE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_QUOTE,
        content: '🤞',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_QUOTE,
        duplicateId: '👨🏻‍💻',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/quote/new?layout=itemAndService'
      );
    });

    it('fails to create', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      integration.mapFailure(CREATE_QUOTE_DETAIL);
      module.pushMessage = jest.fn();

      module.saveAndDuplicate();

      expect(store.getActions()).toEqual([
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
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_QUOTE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
    });

    it('should update and redirect with current id', () => {
      const { module, store, integration } = setUpWithRun({
        isCreating: false,
      });
      integration.mapSuccess(UPDATE_QUOTE_DETAIL, {
        message: '🤞',
        id: '👨🏻‍💻',
      });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveAndDuplicate();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_QUOTE_DETAIL,
          urlParams: {
            businessId: 'businessId',
            quoteId: 'quoteId',
          },
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_QUOTE,
        content: '🤞',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_QUOTE,
        duplicateId: 'quoteId',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/quote/new?layout=itemAndService'
      );
    });

    it('fails to update', () => {
      const { module, store, integration } = setUpWithRun({
        isCreating: false,
      });
      integration.mapFailure(UPDATE_QUOTE_DETAIL);
      module.pushMessage = jest.fn();

      module.saveAndDuplicate();

      expect(store.getActions()).toEqual([
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
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_QUOTE_DETAIL,
          urlParams: {
            businessId: 'businessId',
            quoteId: 'quoteId',
          },
        }),
      ]);
    });
  });

  // TODO: Test redirect after save success once Nav Spike is done
  describe('saveUnsavedChanges', () => {
    it('successfully creates', () => {
      const { module, store, integration } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

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

      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/quote/new'
      );
    });

    it('successfully updates', () => {
      const { module, store, integration } = setUpWithRun({
        isPageEdited: true,
      });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

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

      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/quote/new'
      );
    });

    it('fails to save and close unsaved modal', () => {
      const { module, store, integration } = setUpWithRun({
        isPageEdited: true,
      });
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
        type: 'inventory quick add',
        setup: (module, integration) => {
          const onChange = () => {};
          module.openInventoryModal(onChange);
          integration.resetRequests();
        },
      },
    ].forEach((test) => {
      describe(`when ${test.type}`, () => {
        it(`should not save quote given the modal type ${test.type}`, () => {
          const { module, integration } = setUpWithRun({ isPageEdited: true });

          test.setup(module, integration);
          module.saveHandler();

          expect(integration.getRequests()).not.toContain(
            expect.objectContaining({
              intent: UPDATE_QUOTE_DETAIL,
            })
          );
        });

        it('should save quote given an unsaved modal is open', () => {
          const { module, store, integration } = setUpWithRun({
            isPageEdited: true,
          });
          module.pushMessage = jest.fn();
          module.navigateTo = jest.fn();

          const navRedirectToUrl = '/#/au/businessId/quote/new';
          module.handlePageTransition(navRedirectToUrl); // open unsaved modal
          store.resetActions();

          module.saveHandler();

          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: UPDATE_QUOTE_DETAIL,
            }),
          ]);
          expect(module.navigateTo).toHaveBeenCalledWith(
            '/#/au/businessId/quote/new'
          );
        });
      });
    });
  });
});
