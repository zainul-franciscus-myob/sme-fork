import {
  CLOSE_MODAL,
  CREATE_INVOICE_PAYMENT,
  DELETE_INVOICE_PAYMENT,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_CUSTOMER,
  UPDATE_INVOICE_PAYMENT,
  UPDATE_INVOICE_PAYMENT_DETAILS,
  UPDATE_SHOW_PAID_INVOICES,
} from '../../InvoicePaymentIntent';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
} from '../../InvoicePaymentMessageTypes';
import InvoicePaymentDetailModule from '../InvoicePaymentDetailModule';
import InvoicePaymentModalTypes from '../../InvoicePaymentModalTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoicePaymentDetailDispatcher from '../createInvoicePaymentDetailDisptacher';
import createInvoicePaymentDetailIntegrator from '../createInvoicePaymentDetailIntegrator';
import invoicePaymentDetailReducer from '../invoicePaymentDetailReducer';

describe('InvoicePaymentDetailModule', () => {
  const setup = () => {
    const store = new TestStore(invoicePaymentDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = jest.fn();

    const module = new InvoicePaymentDetailModule({ integration, setRootView, pushMessage });
    module.store = store;

    module.dispatcher = createInvoicePaymentDetailDispatcher(store);
    module.integrator = createInvoicePaymentDetailIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithNew = ({ applyPaymentToInvoiceId } = {}) => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '1', region: 'au', invoicePaymentId: 'new', applyPaymentToInvoiceId,
    });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ businessId: '1', region: 'au', invoicePaymentId: '1' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithPageEdited = () => {
    const toolbox = setupWithExisting();
    const { module, store } = toolbox;

    module.dispatcher.updateInvoicePaymentDetails({ key: 'accountId', value: '1' });

    expect(store.getActions()).toEqual([
      {
        intent: UPDATE_INVOICE_PAYMENT_DETAILS,
        key: 'accountId',
        value: '1',
      },
    ]);

    store.resetActions();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        invoicePaymentId: 'new',
        intent: LOAD_NEW_INVOICE_PAYMENT_DETAIL,
      },
      {
        name: 'existing',
        invoicePaymentId: '1',
        intent: LOAD_INVOICE_PAYMENT_DETAIL,
      },
    ].forEach(({ name, invoicePaymentId, intent }) => {
      it(`successflly loads ${name}`, () => {
        const { module, store, integration } = setup();

        module.run({ invoicePaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              invoicePaymentId,
            },
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          expect.objectContaining({
            intent: LOAD_INVOICE_PAYMENT_DETAIL,
          }),
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent,
          }),
        ]);
      });

      it(`fails to load ${name}`, () => {
        const { module, store, integration } = setup();
        integration.mapFailure(intent);

        module.run({ invoicePaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              invoicePaymentId,
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
            intent,
          }),
        ]);
      });
    });

    it('also triggers update customer if customerId exists', () => {
      const { module, store, integration } = setup();

      module.run({ invoicePaymentId: '1', customerId: '11' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            invoicePaymentId: '1',
            customerId: '11',
          },
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        expect.objectContaining({
          intent: LOAD_INVOICE_PAYMENT_DETAIL,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: UPDATE_CUSTOMER,
          value: '11',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_PAYMENT_DETAIL,
        }),
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });
  });

  describe('deleteInvoicePayment', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: InvoicePaymentModalTypes.DELETE,
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully deletes', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();

      module.deleteInvoicePayment();

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
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_INVOICE_PAYMENT,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
        content: expect.any(String),
      });
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/transactionList'));
    });

    it('fails to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_INVOICE_PAYMENT);

      module.deleteInvoicePayment();

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
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_INVOICE_PAYMENT,
        }),
      ]);
    });
  });

  describe('cancelInvoicePayment', () => {
    it('redirect to transaction list on existing invoice payment', () => {
      const { module } = setupWithExisting();

      module.cancelInvoicePayment();

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/transactionList'));
    });

    it('redirect to invoice list on new invoice payment', () => {
      const { module } = setupWithNew();

      module.cancelInvoicePayment();

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/invoice'));
    });

    it('redirect to invoice detail on prefilled invoice payment', () => {
      const { module } = setupWithNew({ applyPaymentToInvoiceId: 'invoiceId' });

      module.cancelInvoicePayment();

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/invoice/invoiceId'));
    });
  });

  describe('saveHandler', () => {
    const setupWithOpenModal = (modalType, openHandler) => {
      const toolbox = setupWithPageEdited();
      const { module, store } = toolbox;

      module[openHandler]();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: modalType,
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    const setupWithOpenUnsavedModal = (url) => {
      const toolbox = setupWithPageEdited();
      const { module, store } = toolbox;

      module.openUnsavedModal(url);

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: InvoicePaymentModalTypes.UNSAVED,
            url,
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    [
      {
        modalType: InvoicePaymentModalTypes.CANCEL,
        openHandler: 'openCancelModal',
      },
      {
        modalType: InvoicePaymentModalTypes.DELETE,
        openHandler: 'openDeleteModal',
      },
    ].forEach(({ modalType, openHandler }) => {
      it(`does nothing when ${modalType} modal open`, () => {
        const { module, store, integration } = setupWithOpenModal(modalType, openHandler);

        module.saveHandler();

        expect(store.getActions()).toEqual([]);
        expect(integration.getRequests()).toEqual([]);
      });
    });

    it('saves changes when UNSAVED modal open', () => {
      const { module, integration } = setupWithOpenUnsavedModal('/#/au/1/inTray');

      module.saveHandler();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_INVOICE_PAYMENT,
        }),
      ]);
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inTray'));
    });

    [
      {
        name: 'create',
        setupHandler: setupWithNew,
        intent: CREATE_INVOICE_PAYMENT,
        redirectUrl: '/#/au/1/invoice',
      },
      {
        name: 'update',
        setupHandler: setupWithExisting,
        intent: UPDATE_INVOICE_PAYMENT,
        redirectUrl: '/#/au/1/transactionList',
      },
    ].forEach(({
      name, setupHandler, intent, redirectUrl,
    }) => {
      it(`successfully ${name}`, () => {
        const { module, store, integration } = setupHandler();
        module.pushMessage = jest.fn();

        module.saveHandler();

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
            intent,
          }),
        ]);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
          content: 'Great Work! You\'ve done it well!',
        });
        expect(window.location.href).toEqual(expect.stringContaining(redirectUrl));
      });

      it(`fails to ${name}`, () => {
        const { module, store, integration } = setupHandler();
        integration.mapFailure(intent);

        module.saveHandler();

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
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent,
          }),
        ]);
      });
    });
  });

  describe('updateCustomer', () => {
    it('successfully loads invoices', () => {
      const { module, store, integration } = setupWithExisting();

      module.updateCustomer('2');

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_CUSTOMER,
          value: '2',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });

    it('fails to load invoices', () => {
      const { module, store, integration } = setupWithExisting();
      integration.mapFailure(LOAD_INVOICE_LIST);

      module.updateCustomer('2');

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_CUSTOMER,
          value: '2',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });
  });

  describe('updateShowPaidInvoices', () => {
    const setupWithCustomerId = (value) => {
      const toolbox = setupWithExisting();
      const { module, store, integration } = toolbox;

      module.dispatcher.updateInvoicePaymentDetails({ key: 'customerId', value });
      store.resetActions();
      integration.resetRequests();

      return toolbox;
    };

    it('successfully loads invoices', () => {
      const { module, store, integration } = setupWithCustomerId('2');

      module.updateShowPaidInvoices(true);

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_SHOW_PAID_INVOICES,
          value: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });

    it('fails to load invoices', () => {
      const { module, store, integration } = setupWithCustomerId('2');
      integration.mapFailure(LOAD_INVOICE_LIST);

      module.updateShowPaidInvoices(true);

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_SHOW_PAID_INVOICES,
          value: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });

    it('does not load invoices when customer id is empty', () => {
      const { module, integration } = setupWithCustomerId('');

      module.updateShowPaidInvoices(true);

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('openCancelModal', () => {
    it('opens cancel modal', () => {
      const { module, store } = setupWithPageEdited();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: InvoicePaymentModalTypes.CANCEL,
          },
        },
      ]);
    });

    describe('when page not edited', () => {
      it('redirect to transaction list on existing invoice payment', () => {
        const { module, store } = setupWithExisting();

        module.openCancelModal();

        expect(store.getActions()).toEqual([]);
        expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/transactionList'));
      });

      it('redirect to invoice list on new invoice payment', () => {
        const { module } = setupWithNew();

        module.openCancelModal();

        expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/invoice'));
      });

      it('redirect to invoice detail on prefilled invoice payment', () => {
        const { module } = setupWithNew({ applyPaymentToInvoiceId: 'invoiceId' });

        module.openCancelModal();

        expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/invoice/invoiceId'));
      });
    });
  });

  describe('handlePageTransition', () => {
    it('redirects when page not edited', () => {
      const { module } = setupWithExisting();

      module.handlePageTransition('/#/au/1/inTray');

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inTray'));
    });

    it('open unsaved modal when page edited', () => {
      const { module, store } = setupWithPageEdited();

      module.handlePageTransition('/#/au/1/inTray');

      expect(store.actions).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: InvoicePaymentModalTypes.UNSAVED,
            url: '/#/au/1/inTray',
          },
        },
      ]);
    });
  });
});
