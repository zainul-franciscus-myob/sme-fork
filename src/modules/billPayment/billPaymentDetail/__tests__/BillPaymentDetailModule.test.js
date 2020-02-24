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
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
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

describe('BillPaymentDetailModule', () => {
  const setup = () => {
    const store = new TestStore(billPaymentDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};

    const module = new BillPaymentModule({ integration, setRootView, pushMessage });
    module.store = store;

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ billPaymentId: 'new' });
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

  describe('saveBillPayment', () => {
    [
      {
        name: 'create',
        setup: setupWithNew,
        intent: CREATE_BILL_PAYMENT,
      },
      {
        name: 'update',
        setup: setupWithExisting,
        intent: UPDATE_BILL_PAYMENT,
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = test.setup();
        module.pushMessage = jest.fn();
        module.redirectToTransactionList = jest.fn();

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
        expect(module.redirectToTransactionList).toHaveBeenCalled();
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
      module.setSubmittingState(true);
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
      },
      {
        name: 'update',
        setup: setupWithExisting,
        intent: UPDATE_BILL_PAYMENT,
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = test.setup();
        module.pushMessage = jest.fn();
        module.redirectToTransactionList = jest.fn();

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
        expect(module.redirectToTransactionList).toHaveBeenCalled();
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
      it('does nothing when reference id edited', () => {
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

    it('redirects when page not edited', () => {
      const { module, store } = setupWithExisting();
      module.redirectToTransactionList = jest.fn();

      module.openCancelModal();

      expect(store.getActions()).toEqual([]);
      expect(module.redirectToTransactionList).toHaveBeenCalled();
    });
  });
});
