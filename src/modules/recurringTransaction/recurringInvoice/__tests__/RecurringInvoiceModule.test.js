import {
  CREATE_RECURRING_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_CUSTOMER,
  LOAD_NEW_RECURRING_INVOICE,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  RESET_CUSTOMER,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_INVOICE_HEADER_OPTIONS,
  UPDATE_RECURRING_INVOICE,
} from '../RecurringInvoiceIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';
import LoadingState from '../../../../components/PageView/LoadingState';
import RecurringInvoiceModalType from '../types/RecurringInvoiceModalType';
import RecurringInvoiceModule from '../RecurringInvoiceModule';
import Region from '../../../../common/types/Region';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import TransactionType from '../../types/TransactionType';
import createRecurringInvoiceDispatcher from '../createRecurringInvoiceDispatcher';
import createRecurringInvoiceIntegrator from '../createRecurringInvoiceIntegrator';
import loadRecurringInvoiceResponse from '../mappings/data/loadRecurringInvoiceResponse.json';
import recurringInvoiceReducer from '../reducer/RecurringInvoiceReducer';

export const setup = () => {
  const store = new TestStore(recurringInvoiceReducer);
  const integration = new TestIntegration();
  const module = new RecurringInvoiceModule({
    integration,
    setRootView: () => {},
    pushMessage: () => {},
    popMessages: () => [],
    replaceURLParams: () => {},
    navigateTo: () => {},
    isToggleOn: () => {},
    featureToggles: { isRecurringTransactionEnabled: true },
  });
  module.store = store;
  module.dispatcher = createRecurringInvoiceDispatcher(store);
  module.integrator = createRecurringInvoiceIntegrator(store, integration);

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
    recurringTransactionId: isCreating ? 'new' : 'recurringTransactionId',
  });

  if (isPageEdited) {
    module.updateInvoiceHeaderOptions({ key: 'note', value: 'random' });
  }

  store.resetActions();
  integration.resetRequests();

  return { store, integration, module };
};

describe('RecurringInvoiceModule', () => {
  describe('run', () => {
    describe('existing recurring transaction', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        recurringTransactionId: 'recurringTransactionId',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_RECURRING_INVOICE }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_RECURRING_INVOICE }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_CUSTOMER }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        ])
      );
    });

    describe('existing recurring transaction with invalid transaction type', () => {
      const { store, integration, module } = setup();
      integration.mapSuccess(LOAD_RECURRING_INVOICE, {
        ...loadRecurringInvoiceResponse,
        transactionType: TransactionType.BILL,
      });
      module.navigateTo = jest.fn();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        recurringTransactionId: 'recurringTransactionId',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_RECURRING_INVOICE }),
          expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
        ])
      );
      expect(module.navigateTo).toHaveBeenCalled();
    });

    describe('new recurring transaction', () => {
      const { store, integration, module } = setup();

      module.run({
        businessId: 'businessId',
        region: Region.au,
        recurringTransactionId: 'new',
      });

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_INITIAL_STATE }),
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_RECURRING_INVOICE }),
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: true },
        { intent: SET_PAY_DIRECT_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_PAY_DIRECT }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_NEW_RECURRING_INVOICE }),
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
          recurringTransactionId: 'recurringTransactionId',
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
          recurringTransactionId: 'recurringTransactionId',
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
  });

  describe('createOrUpdateRecurringInvoice', () => {
    describe.each([
      {
        isCreating: true,
        intent: CREATE_RECURRING_INVOICE,
        setupTest: setupWithRun,
      },
      {
        isCreating: false,
        intent: UPDATE_RECURRING_INVOICE,
        setupTest: setupWithRun,
      },
    ])('On %s', ({ isCreating, intent, setupTest }) => {
      it('successfully save invoice', () => {
        const { store, integration, module } = setupTest({ isCreating });

        module.createOrUpdateRecurringInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent }),
        ]);
      });
    });
  });

  describe('saveRecurringInvoice', () => {
    describe('new recurring invoice', () => {
      it('create recurring invoice', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        module.pushMessage = jest.fn();
        module.redirectToRecurringTransactionList = jest.fn();

        module.saveRecurringInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_RECURRING_INVOICE }),
        ]);
        expect(module.pushMessage).toHaveBeenCalled();
        expect(module.redirectToRecurringTransactionList).toHaveBeenCalled();
      });

      it('show danger alert when create recurring failed', () => {
        const { module, store, integration } = setupWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_RECURRING_INVOICE, { message });

        module.saveRecurringInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_RECURRING_INVOICE }),
        ]);
      });
    });

    describe('existing recurring invoice', () => {
      it('update recurring invoice', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        module.pushMessage = jest.fn();
        module.redirectToRecurringTransactionList = jest.fn();

        module.saveRecurringInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_RECURRING_INVOICE }),
        ]);
        expect(module.pushMessage).toHaveBeenCalled();
        expect(module.redirectToRecurringTransactionList).toHaveBeenCalled();
      });

      it('show danger alert when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_RECURRING_INVOICE, { message });

        module.saveRecurringInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_RECURRING_INVOICE }),
        ]);
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
          modalType: RecurringInvoiceModalType.REDIRECT_TO_URL,
        },
      ]);
    });
  });

  describe('updateInvoiceHeaderOptions', () => {
    describe('When update customerId', () => {
      it('successfully loads contact', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        module.updateInvoiceHeaderOptions({
          key: 'customerId',
          value: 'cust0001',
        });
        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_INVOICE_HEADER_OPTIONS,
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
        ]);
      });
      it('fails to load contact', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        integration.mapFailure(LOAD_CUSTOMER);
        module.updateInvoiceHeaderOptions({
          key: 'customerId',
          value: 'cust0001',
        });
        expect(store.getActions()).toContainEqual({
          intent: LOAD_CUSTOMER,
        });
      });
      it('fails to load abn', () => {
        const { module, integration, store } = setupWithRun({
          isCreating: true,
        });
        integration.mapFailure(LOAD_ABN_FROM_CUSTOMER);
        module.updateInvoiceHeaderOptions({
          key: 'customerId',
          value: 'cust0001',
        });
        expect(store.getActions()).toContainEqual({
          intent: LOAD_ABN_FROM_CUSTOMER,
          abn: {
            status: AbnStatus.UNAVAILABLE,
          },
        });
      });
    });
  });
});
