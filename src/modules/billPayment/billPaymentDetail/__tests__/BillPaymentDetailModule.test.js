import {
  CLOSE_MODAL,
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_BILL_PAYMENT,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
} from '../../BillPaymentIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_PAYMENT, SUCCESSFULLY_SAVED_BILL_PAYMENT } from '../../BillPaymentMessageTypes';
import BillPaymentModule from '../BillPaymentDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import billPaymentDetailReducer from '../billPaymentDetailReducer';
import createBillPaymentDetailDispatcher from '../createBillPaymentDetailDispatcher';
import createBillPaymentDetailIntegrator from '../createBillPaymentDetailIntegrator';

describe('BillPaymentDetailModule', () => {
  const setup = () => {
    const store = new TestStore(billPaymentDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};
    const navigateTo = jest.fn((url) => {
      window.location.href = url;
    });

    const module = new BillPaymentModule({
      integration, setRootView, pushMessage, navigateTo,
    });
    module.store = store;
    module.dispatcher = createBillPaymentDetailDispatcher(store);
    module.integrator = createBillPaymentDetailIntegrator(store, integration);

    return {
      store, integration, module, navigateTo,
    };
  };

  const setupWithNew = ({ applyPaymentToBillId } = {}) => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ billPaymentId: 'new', applyPaymentToBillId });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ billPaymentId: '1' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        billPaymentId: 'new',
        intent: LOAD_NEW_BILL_PAYMENT,
      },
      {
        name: 'existing',
        billPaymentId: '1',
        intent: LOAD_BILL_PAYMENT,
      },
    ].forEach((test) => {
      it(`successflly loads ${test.name}`, () => {
        const { module, store, integration } = setup();

        module.run({ billPaymentId: test.billPaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              billPaymentId: test.billPaymentId,
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
            intent: test.intent,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);
      });

      it(`fails to load ${test.name}`, () => {
        const { module, store, integration } = setup();
        integration.mapFailure(test.intent);

        module.run({ billPaymentId: test.billPaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              billPaymentId: test.billPaymentId,
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
            intent: test.intent,
          }),
        ]);
      });
    });
  });

  describe('deleteBillPayment', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'delete',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully deletes', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();
      module.redirectToTransactionList = jest.fn();

      module.deleteBillPayment();

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
          intent: DELETE_BILL_PAYMENT,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_BILL_PAYMENT,
        content: expect.any(String),
      });
      expect(module.redirectToTransactionList).toHaveBeenCalled();
    });

    it('fails to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_BILL_PAYMENT);

      module.deleteBillPayment();

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
          intent: DELETE_BILL_PAYMENT,
        }),
      ]);
    });
  });

  describe('cancelBillPayment', () => {
    it('redirect to transaction list on existing bill payment', () => {
      const { module } = setupWithExisting();

      module.cancelBillPayment();

      expect(window.location.href).toEqual(expect.stringContaining('/transactionList'));
    });

    it('redirect to bill list on new bill payment', () => {
      const { module } = setupWithNew();

      module.cancelBillPayment();

      expect(window.location.href).toEqual(expect.stringContaining('/bill'));
    });

    it('redirect to bill detail on prefilled bill payment', () => {
      const { module } = setupWithNew({ applyPaymentToBillId: 'billId' });

      module.cancelBillPayment();

      expect(window.location.href).toEqual(expect.stringContaining('/bill/billId'));
    });
  });

  describe('saveBillPayment', () => {
    [
      {
        name: 'create',
        setup: setupWithNew,
        intent: CREATE_BILL_PAYMENT,
        redirectUrl: '/bill',
      },
      {
        name: 'update',
        setup: setupWithExisting,
        intent: UPDATE_BILL_PAYMENT,
        redirectUrl: '/transactionList',
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = test.setup();
        module.pushMessage = jest.fn();

        module.saveBillPayment();

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
            intent: test.intent,
          }),
        ]);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
          content: expect.any(String),
        });
        expect(window.location.href).toEqual(expect.stringContaining(test.redirectUrl));
      });

      it(`fails to ${test.name}`, () => {
        const { module, store, integration } = test.setup();
        integration.mapFailure(test.intent);

        module.saveBillPayment();

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
            intent: test.intent,
          }),
        ]);
      });
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('saveHandler', () => {
    const setupWithOpenModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'delete',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('does nothing when modal open', () => {
      const { module, store, integration } = setupWithOpenModal();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    [
      {
        name: 'create',
        setup: setupWithNew,
        intent: CREATE_BILL_PAYMENT,
        redirectUrl: '/bill',
      },
      {
        name: 'update',
        setup: setupWithExisting,
        intent: UPDATE_BILL_PAYMENT,
        redirectUrl: '/transactionList',
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = test.setup();
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
            intent: test.intent,
          }),
        ]);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
          content: 'Great Work! You\'ve done it well!',
        });
        expect(window.location.href).toEqual(expect.stringContaining(test.redirectUrl));
      });

      it(`fails to ${test.name}`, () => {
        const { module, store, integration } = test.setup();
        integration.mapFailure(test.intent);

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
            intent: test.intent,
          }),
        ]);
      });
    });
  });

  describe('updateHeaderOption', () => {
    it('updates option', () => {
      const { module, store } = setupWithExisting();

      module.updateHeaderOption({ key: 'description', value: '🤞' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '🤞',
        },
      ]);
    });

    describe('update account id', () => {
      it('only updates the bank statement text when reference id edited', () => {
        const { module, store, integration } = setupWithExisting();
        module.updateHeaderOption({ key: 'referenceId', value: '123' });
        store.resetActions();

        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'accountId',
            value: '2',
          },
          {
            intent: UPDATE_BANK_STATEMENT_TEXT,
          },
        ]);
        expect(integration.getRequests()).toEqual([]);
      });

      it('successfully updates reference id', () => {
        const { module, store, integration } = setupWithExisting();

        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'accountId',
            value: '2',
          },
          expect.objectContaining({
            intent: UPDATE_REFERENCE_ID,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: UPDATE_REFERENCE_ID,
          }),
        ]);
      });

      it('fails to update reference id', () => {
        const { module, store, integration } = setupWithExisting();
        integration.mapFailure(UPDATE_REFERENCE_ID);

        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'accountId',
            value: '2',
          },
          {
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: UPDATE_REFERENCE_ID,
          }),
        ]);
      });
    });

    describe('update supplier id', () => {
      it('successfully loads bills', () => {
        const { module, store, integration } = setupWithExisting();

        module.updateHeaderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'supplierId',
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
            intent: LOAD_BILL_LIST,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_BILL_LIST,
          }),
        ]);
      });

      it('fails to load bills', () => {
        const { module, store, integration } = setupWithExisting();
        integration.mapFailure(LOAD_BILL_LIST);

        module.updateHeaderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'supplierId',
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
            intent: LOAD_BILL_LIST,
          }),
        ]);
      });

      it('does not load bills when empty', () => {
        const { module, integration } = setupWithExisting();

        module.updateHeaderOption({ key: 'supplierId', value: '' });

        expect(integration.getRequests()).toEqual([]);
      });
    });

    describe('update to show paid bills', () => {
      const setupWithSupplierId = (value) => {
        const toolbox = setupWithExisting();
        const { module, store, integration } = toolbox;

        module.updateHeaderOption({ key: 'supplierId', value });
        store.resetActions();
        integration.resetRequests();

        return toolbox;
      };

      it('successfully loads bills', () => {
        const { module, store, integration } = setupWithSupplierId('2');

        module.updateHeaderOption({ key: 'showPaidBills', value: true });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'showPaidBills',
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
            intent: LOAD_BILL_LIST,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_BILL_LIST,
          }),
        ]);
      });

      it('fails to load bills', () => {
        const { module, store, integration } = setupWithSupplierId('2');
        integration.mapFailure(LOAD_BILL_LIST);

        module.updateHeaderOption({ key: 'showPaidBills', value: true });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'showPaidBills',
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
            intent: LOAD_BILL_LIST,
          }),
        ]);
      });

      it('does not load bills when supplier id is empty', () => {
        const { module, integration } = setupWithSupplierId('');

        module.updateHeaderOption({ key: 'showPaidBills', value: true });

        expect(integration.getRequests()).toEqual([]);
      });
    });
  });

  describe('openCancelModal', () => {
    const setupWithEditedPage = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.updateHeaderOption({ key: 'description', value: '🐄' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '🐄',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('opens cancel modal', () => {
      const { module, store } = setupWithEditedPage();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'cancel',
        },
      ]);
    });

    describe('when page not edited', () => {
      it('redirect to transaction list on existing bill payment', () => {
        const { module, store } = setupWithExisting();

        module.openCancelModal();

        expect(store.getActions()).toEqual([]);
        expect(window.location.href).toEqual(expect.stringContaining('/transactionList'));
      });

      it('redirect to bill list on new bill payment', () => {
        const { module } = setupWithNew();

        module.openCancelModal();

        expect(window.location.href).toEqual(expect.stringContaining('/bill'));
      });

      it('redirect to bill detail on prefilled bill payment', () => {
        const { module } = setupWithNew({ applyPaymentToBillId: 'billId' });

        module.openCancelModal();

        expect(window.location.href).toEqual(expect.stringContaining('/billId'));
      });
    });
  });

  describe('handlePageTransition', () => {
    const setupWithEditedPage = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.updateHeaderOption({ key: 'description', value: '🐄' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '🐄',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

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
          modalType: 'unsaved',
        },
      ]);
    });

    it('redirect when page is not edited', () => {
      const { module, navigateTo } = setupWithExisting();

      module.handlePageTransition('/#/foo');

      expect(navigateTo).toBeCalledWith('/#/foo');
    });

    it('should save and redirect when confirm modal', () => {
      const { module, integration, navigateTo } = setupWithEditedPage();
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.saveAndRedirect();
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UPDATE_BILL_PAYMENT }),
      ]);
      expect(navigateTo).toBeCalledWith('/#/bar');
    });

    it(' redirect when discard modal', () => {
      const { module, integration, navigateTo } = setupWithEditedPage();
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.discardAndRedirect();
      expect(navigateTo).toBeCalledWith('/#/bar');
    });
  });

  describe('closeUnsaveModal', () => {
    const setupWithEditedPage = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.updateHeaderOption({ key: 'description', value: '🐄' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '🐄',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('should clear redirect url', () => {
      const { module, store } = setupWithEditedPage();

      module.closeUnsaveModal();

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
