import {
  CREATE_INVOICE_DETAIL,
  CREATE_PRE_CONVERSION_INVOICE_DETAIL,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_QUOTES,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_PAY_DIRECT,
  LOAD_PREFILL_FROM_RECURRING_INVOICE,
  RELOAD_INVOICE_DETAIL,
  RESET_CUSTOMER,
  RESET_SEND_EINVOICE,
  SEND_EINVOICE,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_CUSTOMER_QUOTES_LOADING_STATE,
  SET_INVOICE_HISTORY_LOADING,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_STATE,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_INVOICE_DETAIL,
  UPDATE_INVOICE_DETAIL_HEADER_OPTIONS,
  UPDATE_INVOICE_ID_AFTER_CREATE,
  UPDATE_PRE_CONVERSION_INVOICE_DETAIL,
} from '../../InvoiceIntents';
import {
  DUPLICATE_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
  SUCCESSFULLY_SENT_EINVOICE,
} from '../../../../common/types/MessageTypes';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceDetailModule from '../InvoiceDetailModule';
import InvoiceLayout from '../types/InvoiceLayout';
import LoadingState from '../../../../components/PageView/LoadingState';
import Region from '../../../../common/types/Region';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoiceDetailDispatcher from '../createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from '../createInvoiceDetailIntegrator';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';
import loadInvoiceDetailResponse from '../../mappings/data/serviceLayout/invoiceServiceDetail';
import loadPrefillFromRecurringInvoiceResponse from '../../mappings/data/loadPrefillFromRecurringInvoiceResponse';

export const setup = () => {
  const store = new TestStore(invoiceDetailReducer);
  const integration = new TestIntegration();
  const module = new InvoiceDetailModule({
    integration,
    setRootView: () => {},
    pushMessage: () => {},
    popMessages: () => [],
    replaceURLParams: () => {},
    reload: () => {},
    featureToggles: { isRecurringTransactionEnabled: false },
    isToggleOn: () => {},
  });
  module.store = store;
  module.dispatcher = createInvoiceDetailDispatcher(store);
  module.integrator = createInvoiceDetailIntegrator(store, integration);

  return { store, module, integration };
};

export const setupWithRun = ({
  isCreating = false,
  isPageEdited = false,
} = {}) => {
  const { store, integration, module } = setup();

  module.run({
    businessId: 'businessId',
    region: Region.au,
    invoiceId: isCreating ? 'new' : 'invoiceId',
  });

  if (isPageEdited) {
    module.updateHeaderOptions({ key: 'note', value: 'random' });
  }

  store.resetActions();
  integration.resetRequests();

  return { store, integration, module };
};

const setupWithPreConversion = (isCreating = false, isPageEdited = false) => {
  const { module, integration, store } = setupWithRun(isCreating, isPageEdited);
  module.updateHeaderOptions({ key: 'issueDate', value: '2020-01-01' });
  module.validateIssueDate();
  module.convertToPreConversionInvoice();
  store.resetActions();
  integration.resetRequests();

  return { module, integration, store };
};

describe('InvoiceDetailModule', () => {
  describe('run', () => {
    describe('existing invoice', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        invoiceId: 'invoiceId',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        { intent: SET_INVOICE_HISTORY_LOADING },
        expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
        ])
      );
    });

    describe('new invoice', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        invoiceId: 'new',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_NEW_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        ])
      );
    });

    describe('new duplicate invoice', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        invoiceId: 'new',
        duplicateId: 'duplicateId',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        {
          intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
          isLoadingCustomerQuotes: true,
        },
        expect.objectContaining({ intent: LOAD_CUSTOMER_QUOTES }),
        {
          intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
          isLoadingCustomerQuotes: false,
        },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          expect.objectContaining({ intent: LOAD_CUSTOMER_QUOTES }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        ])
      );
    });

    describe('new invoice from quote', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        invoiceId: 'new',
        quoteId: 'quoteId',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        ])
      );
    });

    describe('abn', () => {
      it('load abn for au business', () => {
        const { store, integration, module } = setup();
        module.run({
          businessId: 'businessId',
          region: Region.au,
          invoiceId: 'invoiceId',
        });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
            { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
            expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          ])
        );

        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          ])
        );
      });

      it('does not load abn for nz business', () => {
        const { store, integration, module } = setup();
        module.run({
          businessId: 'businessId',
          region: Region.nz,
          invoiceId: 'invoiceId',
        });

        expect(store.getActions()).toEqual(
          expect.not.arrayContaining([
            { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
            { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
            expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          ])
        );

        expect(integration.getRequests()).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          ])
        );
      });
    });

    describe('pay direct', () => {
      it('load pay direct for au business', () => {
        const { store, integration, module } = setup();
        module.run({
          businessId: 'businessId',
          region: Region.au,
          invoiceId: 'invoiceId',
        });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
            { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
            expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
          ])
        );

        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
          ])
        );
      });

      it('does not load pay direct for nz business', () => {
        const { store, integration, module } = setup();
        module.run({
          businessId: 'businessId',
          region: Region.nz,
          invoiceId: 'invoiceId',
        });

        expect(store.getActions()).toEqual(
          expect.not.arrayContaining([
            { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
            { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
            expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
          ])
        );

        expect(integration.getRequests()).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
          ])
        );
      });
    });
  });

  describe('createOrUpdateInvoice', () => {
    describe.each([
      {
        isCreating: true,
        intent: CREATE_INVOICE_DETAIL,
        setupTest: setupWithRun,
      },
      {
        isCreating: false,
        intent: UPDATE_INVOICE_DETAIL,
        setupTest: setupWithRun,
      },
      {
        isCreating: true,
        intent: CREATE_PRE_CONVERSION_INVOICE_DETAIL,
        setupTest: setupWithPreConversion,
      },
      {
        isCreating: false,
        intent: UPDATE_PRE_CONVERSION_INVOICE_DETAIL,
        setupTest: setupWithPreConversion,
      },
    ])('On %s', ({ isCreating, intent, setupTest }) => {
      it('successfully save invoice', () => {
        const { store, integration, module } = setupTest({ isCreating });

        module.createOrUpdateInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent }),
        ]);
      });

      it('show upgrade modal when monthly limit reach', () => {
        const monthlyLimit = { hasHitLimit: true };

        const { store, integration, module } = setupTest({ isCreating });
        integration.overrideMapping(intent, ({ onSuccess }) => {
          onSuccess({
            message: 'You’ve reached your monthly limit of invoices.',
            monthlyLimit,
          });
        });

        module.createOrUpdateInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          {
            intent: SET_UPGRADE_MODAL_SHOWING,
            isUpgradeModalShowing: true,
            monthlyLimit,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent }),
        ]);
      });
    });
  });

  describe('handleSaveInvoice', () => {
    const setUpWithClosedInvoiceEdited = () => {
      const { module, store, integration } = setup();
      integration.overrideMapping(LOAD_INVOICE_DETAIL, ({ onSuccess }) => {
        onSuccess({
          ...loadInvoiceDetailResponse,
          invoice: {
            ...loadInvoiceDetailResponse.invoice,
            status: 'Closed',
          },
        });
      });

      module.run({ invoiceId: 'invoiceId', businessId: 'bizId', region: 'au' });
      module.updateHeaderOptions({ key: 'option', value: 'A' });

      store.resetActions();
      integration.resetRequests();

      return { module, store, integration };
    };

    it('should open save amount due warning modal', () => {
      const { module, store } = setUpWithClosedInvoiceEdited();

      module.handleSaveInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: InvoiceDetailModalType.SAVE_AMOUNT_DUE_WARNING,
        },
      ]);
    });
  });

  describe('saveInvoice', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, load history, and show success alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_ALERT,
            alert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('show danger alert when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('show danger alert when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice', () => {
      it('update invoice, reload invoice and show success alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_ALERT,
            alert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('show danger alert when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('show danger alert when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });
  });

  describe('saveAndEmailInvoice', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, load history, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EMAIL_INVOICE,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open email modal when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has been edited', () => {
      it('update invoice, reload invoice, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EMAIL_INVOICE,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open email modal when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has not been edited', () => {
      const setUpWithEdited = () => {
        const { module, store, integration } = setupWithRun();
        module.updateHeaderOptions({ key: 'note', value: 'random' });
        store.resetActions();

        return { module, store, integration };
      };

      it('update invoice, reload invoice, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithEdited();
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EMAIL_INVOICE,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open email modal when update invoice failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('does not have reply email address', () => {
      it('open email settings', () => {
        const { module, store, integration } = setup();
        integration.mapSuccess(LOAD_INVOICE_DETAIL, {
          ...loadInvoiceDetailResponse,
          emailInvoice: {
            ...loadInvoiceDetailResponse.emailInvoice,
            hasEmailReplyDetails: false,
          },
        });
        module.run({
          invoiceId: 'invoiceId',
          businessId: 'businessId',
          region: 'au',
        });
        store.resetActions();
        integration.resetRequests();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { intent: SET_MODAL_TYPE, modalType: '' },
            {
              intent: SET_MODAL_TYPE,
              modalType: InvoiceDetailModalType.EMAIL_SETTINGS,
            },
          ])
        );
      });
    });
  });

  describe('saveAndSendEInvoice', () => {
    describe('new invoice', () => {
      it('save and reload invoice, open sendEInvoice modal', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });

        module.saveAndSendEInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.NONE },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.SEND_EINVOICE,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
      });
    });

    describe('existing invoice', () => {
      it('update and reload invoice, open sendEInvoice modal when invoice has been edited', () => {
        const { module, integration, store } = setupWithRun({
          isPageEdited: true,
        });

        module.saveAndSendEInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.NONE },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.SEND_EINVOICE,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
      });

      it('open sendEInvoice modal when invoice has not been edited', () => {
        const { module, store } = setupWithRun({
          isCreating: false,
        });

        module.saveAndSendEInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.NONE },
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.SEND_EINVOICE,
          },
        ]);
      });
    });
  });

  describe('sendEInvoiceModal', () => {
    describe('openSendEInvoiceModal', () => {
      it('opens sendEInvoice Modal', () => {
        const { module, store } = setupWithRun();

        module.openSendEInvoiceModal();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.SEND_EINVOICE,
          },
        ]);
      });

      it('closes sendEInvoice Modal', () => {
        const { module, store } = setupWithRun();

        module.closeSendEInvoiceModal();

        expect(store.getActions()).toEqual([
          { intent: RESET_SEND_EINVOICE },
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.NONE,
          },
        ]);
      });
    });
  });

  describe('sendEInvoice', () => {
    describe('send e-invoice successfully', () => {
      it('send e-invoice and redirect to invoice list', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: false,
        });
        const message = '🦕';
        integration.mapSuccess(SEND_EINVOICE, { message });
        module.navigateTo = jest.fn();
        module.pushMessage = jest.fn();
        module.globalCallbacks = { invoiceSaved: jest.fn() };

        module.sendEInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(module.globalCallbacks.invoiceSaved).toHaveBeenCalled();
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SENT_EINVOICE,
          content: message,
        });
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: SEND_EINVOICE }),
        ]);
        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/businessId/invoice'
        );
      });
    });

    describe('send e-invoice failed', () => {
      it('display failure alert', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: false,
        });
        const message = '🦕';
        integration.mapFailure(SEND_EINVOICE, { message });

        module.sendEInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: SEND_EINVOICE }),
        ]);
      });
    });
  });

  describe('openExportPdfModalOrSaveAndExportPdf', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, history, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EXPORT_PDF,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open export pdf modal when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has been edited', () => {
      it('update invoice, reload invoice, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EXPORT_PDF,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has not been edited', () => {
      it('open export pdf modal', () => {
        const { module, store, integration } = setupWithRun();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EXPORT_PDF,
          },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });
  });

  describe('handlePageTransition', () => {
    describe('page is not edited', () => {
      const { module } = setupWithRun({ isPageEdited: false });
      module.navigateTo = jest.fn();

      module.handlePageTransition('foo');

      expect(module.navigateTo).toHaveBeenCalledWith('foo');
    });

    describe('page is edited', () => {
      const { module, store } = setupWithRun({ isPageEdited: true });

      module.handlePageTransition('foo');

      expect(store.getActions()).toEqual([
        {
          intent: SET_REDIRECT_STATE,
          redirectUrl: 'foo',
          isOpenInNewTab: false,
        },
        {
          intent: SET_MODAL_TYPE,
          modalType: InvoiceDetailModalType.REDIRECT_TO_URL,
        },
      ]);
    });
  });

  describe('saveAndCreateNewInvoice', () => {
    it('successfully creates', () => {
      const { module, integration, store } = setupWithRun({ isCreating: true });
      integration.mapSuccess(CREATE_INVOICE_DETAIL, { message: '🦕' });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndCreateNewInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
        },
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
          intent: CREATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_INVOICE,
        content: '🦕',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/invoice/new?layout=item'
      );
    });

    it('successfully updates', () => {
      const { module, integration, store } = setupWithRun({
        isCreating: false,
      });
      integration.mapSuccess(UPDATE_INVOICE_DETAIL, { message: '🦕' });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndCreateNewInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
        },
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
          intent: UPDATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
            invoiceId: 'invoiceId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_INVOICE,
        content: '🦕',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/invoice/new?layout=service'
      );
    });

    it('fails to create', () => {
      const { module, integration, store } = setupWithRun({ isCreating: true });
      integration.mapFailure(CREATE_INVOICE_DETAIL);
      module.navigateTo = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndCreateNewInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
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
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).not.toHaveBeenCalled();
    });
  });

  describe('saveAndDuplicateInvoice', () => {
    it('successfully creates', () => {
      const { module, integration, store } = setupWithRun({ isCreating: true });
      integration.mapSuccess(CREATE_INVOICE_DETAIL, {
        message: '🦕',
        id: '🍍',
      });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndDuplicateInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
        },
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
          intent: CREATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_INVOICE,
        content: '🦕',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_INVOICE,
        duplicateId: '🍍',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/invoice/new?layout=item'
      );
    });

    it('successfully updates', () => {
      const { module, integration, store } = setupWithRun({
        isCreating: false,
      });
      integration.mapSuccess(UPDATE_INVOICE_DETAIL, { message: '🦕' });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndDuplicateInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
        },
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
          intent: UPDATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
            invoiceId: 'invoiceId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_INVOICE,
        content: '🦕',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_INVOICE,
        duplicateId: 'invoiceId',
      });
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/businessId/invoice/new?layout=service'
      );
    });

    it('fails to create', () => {
      const { module, integration, store } = setupWithRun({ isCreating: true });
      integration.mapFailure(CREATE_INVOICE_DETAIL);
      module.navigateTo = jest.fn();
      module.globalCallbacks = { invoiceSaved: jest.fn() };

      module.saveAndDuplicateInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: '',
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
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_INVOICE_DETAIL,
          urlParams: {
            businessId: 'businessId',
          },
        }),
      ]);
      expect(module.globalCallbacks.invoiceSaved).not.toHaveBeenCalled();
    });
  });
  describe('updateHeaderOptions', () => {
    describe('When update customerId', () => {
      it('successfully loads contact and their quotes', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        module.updateHeaderOptions({ key: 'customerId', value: 'cust0001' });
        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_INVOICE_DETAIL_HEADER_OPTIONS,
            key: 'customerId',
            value: 'cust0001',
          },
          {
            intent: RESET_CUSTOMER,
          },
          expect.objectContaining({
            intent: LOAD_CUSTOMER,
          }),
          {
            intent: SET_ABN_LOADING_STATE,
            isAbnLoading: true,
          },
          {
            intent: SET_ABN_LOADING_STATE,
            isAbnLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_ABN_FROM_CUSTOMER,
          }),
          {
            intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
            isLoadingCustomerQuotes: true,
          },
          expect.objectContaining({
            intent: LOAD_CUSTOMER_QUOTES,
          }),
          {
            intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
            isLoadingCustomerQuotes: false,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_CUSTOMER,
            urlParams: {
              businessId: 'businessId',
              customerId: 'cust0001',
            },
          }),
          expect.objectContaining({
            intent: LOAD_ABN_FROM_CUSTOMER,
            urlParams: {
              businessId: 'businessId',
              customerId: 'cust0001',
            },
          }),
          expect.objectContaining({
            intent: LOAD_CUSTOMER_QUOTES,
            urlParams: {
              businessId: 'businessId',
              customerId: 'cust0001',
            },
          }),
        ]);
      });
      it('fails to load contact', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        integration.mapFailure(LOAD_CUSTOMER);
        module.updateHeaderOptions({ key: 'customerId', value: 'cust0001' });
        expect(store.getActions()).toContainEqual({
          intent: LOAD_CUSTOMER,
        });
      });
      it('fails to load abn', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        integration.mapFailure(LOAD_ABN_FROM_CUSTOMER);
        module.updateHeaderOptions({ key: 'customerId', value: 'cust0001' });
        expect(store.getActions()).toContainEqual({
          intent: LOAD_ABN_FROM_CUSTOMER,
          abn: {
            status: AbnStatus.UNAVAILABLE,
          },
        });
      });
      it('fails to customer quotes', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        integration.mapFailure(LOAD_CUSTOMER_QUOTES);
        module.updateHeaderOptions({ key: 'customerId', value: 'cust0001' });
        expect(store.getActions()).not.toContainEqual(
          expect.objectContaining({
            intent: LOAD_CUSTOMER_QUOTES,
          })
        );
      });
    });
  });

  describe('loadPrefillFromRecurringInvoice', () => {
    it('prefills invoice with recurring transaction', () => {
      const { store, integration, module } = setupWithRun({ isCreating: true });

      module.loadPrefillFromRecurringInvoice('id');

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({
          intent: LOAD_PREFILL_FROM_RECURRING_INVOICE,
        }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({
          intent: LOAD_ABN_FROM_CUSTOMER,
        }),
        {
          intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
          isLoadingCustomerQuotes: true,
        },
        expect.objectContaining({
          intent: LOAD_CUSTOMER_QUOTES,
        }),
        {
          intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
          isLoadingCustomerQuotes: false,
        },
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_PREFILL_FROM_RECURRING_INVOICE,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          expect.objectContaining({ intent: LOAD_CUSTOMER_QUOTES }),
        ])
      );
    });

    it('does not prefill invoice if recurring transaction is read-only', () => {
      const { store, integration, module } = setupWithRun({ isCreating: true });
      integration.mapSuccess(LOAD_PREFILL_FROM_RECURRING_INVOICE, {
        ...loadPrefillFromRecurringInvoiceResponse,
        invoice: {
          ...loadPrefillFromRecurringInvoiceResponse.invoice,
          layout: InvoiceLayout.MISCELLANEOUS,
        },
      });

      module.loadPrefillFromRecurringInvoice('id');

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: SET_ALERT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_PREFILL_FROM_RECURRING_INVOICE,
          }),
        ])
      );
    });
  });
});
