import {
  CLOSE_MODAL,
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  EXPORT_PDF,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_DETAILS,
  OPEN_MODAL,
  SEND_EMAIL,
  SET_ALERT_MESSAGE,
  SET_IS_SUPPLIER_LOADING,
  SET_IS_TABLE_LOADING,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_PAYMENT,
  UPDATE_BILL_PAYMENT_ID,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
} from '../../BillPaymentIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
} from '../../../../common/types/MessageTypes';
import BillPaymentModule from '../BillPaymentDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import billPaymentDetailReducer from '../billPaymentDetailReducer';
import billPaymentModalTypes from '../billPaymentModalTypes';
import createBillPaymentDetailDispatcher from '../createBillPaymentDetailDispatcher';
import createBillPaymentDetailIntegrator from '../createBillPaymentDetailIntegrator';
import openBlob from '../../../../common/blobOpener/openBlob';
import remittanceAdviceTypes from '../remittanceAdviceTypes';

jest.mock('../../../../common/blobOpener/openBlob');

describe('BillPaymentDetailModule', () => {
  const setup = () => {
    const store = new TestStore(billPaymentDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};
    const popMessages = () => [];
    const replaceURLParams = jest.fn();
    const navigateTo = jest.fn((url) => {
      window.location.href = url;
    });

    const module = new BillPaymentModule({
      integration,
      setRootView,
      pushMessage,
      navigateTo,
      replaceURLParams,
      popMessages,
    });
    module.store = store;
    module.dispatcher = createBillPaymentDetailDispatcher(store);
    module.integrator = createBillPaymentDetailIntegrator(store, integration);

    return {
      store,
      integration,
      module,
      navigateTo,
    };
  };

  const setupWithNew = ({ applyPaymentToBillId } = {}) => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '33',
      billPaymentId: 'new',
      applyPaymentToBillId,
    });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ businessId: '33', billPaymentId: '1' });
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
      it(`successfully loads ${test.name}`, () => {
        const { module, store, integration } = setup();

        module.run({ billPaymentId: test.billPaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: expect.objectContaining({
              billPaymentId: test.billPaymentId,
            }),
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
        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: test.intent,
            }),
          ])
        );
      });

      it(`fails to load ${test.name}`, () => {
        const { module, store, integration } = setup();
        integration.mapFailure(test.intent);

        module.run({ billPaymentId: test.billPaymentId });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: expect.objectContaining({
              billPaymentId: test.billPaymentId,
            }),
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

      it(`displays alert from inbox after loading ${test.name}`, () => {
        const { store, module } = setup();
        module.popMessages = jest.fn().mockReturnValue([
          {
            content: '????',
          },
        ]);

        module.run({});

        expect(store.getActions()).toContainEqual({
          intent: SET_ALERT_MESSAGE,
          type: 'success',
          message: '????',
        });
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
          modalType: billPaymentModalTypes.delete,
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
      expect(module.navigateTo).toHaveBeenCalled();
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
          message: 'fails',
          type: 'danger',
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

      expect(window.location.href).toEqual(
        expect.stringContaining('/transactionList')
      );
    });

    it('redirect to bill list on new bill payment', () => {
      const { module } = setupWithNew();

      module.cancelBillPayment();

      expect(window.location.href).toEqual(expect.stringContaining('/bill'));
    });

    it('redirect to bill detail on prefilled bill payment', () => {
      const { module } = setupWithNew({ applyPaymentToBillId: 'billId' });

      module.cancelBillPayment();

      expect(window.location.href).toEqual(
        expect.stringContaining('/bill/billId')
      );
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
        expect(window.location.href).toEqual(
          expect.stringContaining(test.redirectUrl)
        );
      });

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
        expect(window.location.href).toEqual(
          expect.stringContaining(test.redirectUrl)
        );
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
            message: 'fails',
            type: 'danger',
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

    it(`shows email remittance advice modal when send remittance is selected`, () => {
      const { module, store, integration } = setupWithNew();
      module.pushMessage = jest.fn();

      module.dispatcher.updateShouldSendRemittanceAdvice({ value: true });
      module.saveBillPayment();

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            intent: UPDATE_BILL_PAYMENT_ID,
            billPaymentId: 1,
          },
          expect.objectContaining({
            intent: LOAD_BILL_PAYMENT,
          }),
          {
            intent: OPEN_MODAL,
            modalType: billPaymentModalTypes.remittanceAdvice,
          },
          {
            intent: SET_ALERT_MESSAGE,
            message: "Great Work! You've done it well!",
            type: 'success',
          },
        ])
      );

      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: CREATE_BILL_PAYMENT,
          }),
          expect.objectContaining({
            intent: LOAD_BILL_PAYMENT,
          }),
        ])
      );

      expect(module.replaceURLParams).toHaveBeenCalledWith({
        billPaymentId: 1,
      });
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
          modalType: billPaymentModalTypes.delete,
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
          content: "Great Work! You've done it well!",
        });
        expect(window.location.href).toEqual(
          expect.stringContaining(test.redirectUrl)
        );
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
            message: 'fails',
            type: 'danger',
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

  describe('updateIsElectronicPayment', () => {
    it('should update account to electronic clearing when true', () => {
      const { module, store } = setupWithNew();
      const { electronicClearingAccountId } = store.getState();

      module.updateIsElectronicPayment({ value: true });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: UPDATE_HEADER_OPTION,
          key: 'accountId',
          value: electronicClearingAccountId,
        }),
        expect.objectContaining({
          intent: UPDATE_REFERENCE_ID,
        }),
      ]);
    });

    it('should update account to bank account for bill payment when false', () => {
      const { module, store } = setupWithExisting();

      module.updateIsElectronicPayment({ value: true });
      module.updateIsElectronicPayment({ value: false });
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'accountId',
            value: '123',
          },
          expect.objectContaining({
            intent: UPDATE_REFERENCE_ID,
          }),
        ])
      );
    });
  });

  describe('updateHeaderOption', () => {
    it('updates option', () => {
      const { module, store } = setupWithExisting();

      module.updateHeaderOption({ key: 'description', value: '????' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '????',
        },
      ]);
    });

    it('bank statement text is updated when reference is edited', () => {
      const { module, store, integration } = setupWithNew();
      module.updateHeaderOption({ key: 'referenceId', value: '2' });

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'referenceId',
            value: '2',
          },
        ])
      );
      expect(integration.getRequests()).toEqual([]);
    });

    describe('update account id', () => {
      it('successfully updates reference id and bank text', () => {
        const { module, store } = setupWithNew();
        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_HEADER_OPTION,
            key: 'accountId',
            value: '2',
          },
          {
            intent: UPDATE_REFERENCE_ID,
            referenceId: 'BP0010003',
          },
        ]);
      });

      it('fails to update reference id', () => {
        const { module, store, integration } = setupWithNew();
        integration.mapFailure(UPDATE_REFERENCE_ID);

        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: UPDATE_HEADER_OPTION,
              key: 'accountId',
              value: '2',
            },
            {
              intent: SET_ALERT_MESSAGE,
              message: 'fails',
              type: 'danger',
            },
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: UPDATE_REFERENCE_ID,
          }),
        ]);
      });
    });

    describe('update supplier id', () => {
      it('successfully loads supplier', () => {
        const { module, store, integration } = setupWithExisting();

        module.updateHeaderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: UPDATE_HEADER_OPTION,
              key: 'supplierId',
              value: '2',
            },
            {
              intent: SET_IS_SUPPLIER_LOADING,
              isSupplierLoading: true,
            },
            {
              intent: SET_IS_SUPPLIER_LOADING,
              isSupplierLoading: false,
            },
            expect.objectContaining({
              intent: LOAD_SUPPLIER_DETAILS,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAILS,
          }),
        ]);
      });

      it('fails to load supplier details', () => {
        const { module, store, integration } = setupWithExisting();
        integration.mapFailure(LOAD_SUPPLIER_DETAILS);

        module.updateHeaderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: UPDATE_HEADER_OPTION,
              key: 'supplierId',
              value: '2',
            },
            {
              intent: SET_ALERT_MESSAGE,
              message: 'fails',
              type: 'danger',
            },
          ])
        );
        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: LOAD_SUPPLIER_DETAILS,
            }),
          ])
        );
      });

      it('does not load supplier when empty', () => {
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
            intent: SET_IS_TABLE_LOADING,
            isTableLoading: true,
          },
          {
            intent: SET_IS_TABLE_LOADING,
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

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: UPDATE_HEADER_OPTION,
              key: 'showPaidBills',
              value: true,
            },
            {
              intent: SET_ALERT_MESSAGE,
              message: 'fails',
              type: 'danger',
            },
          ])
        );
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

      module.updateHeaderOption({ key: 'description', value: '????' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '????',
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
          modalType: billPaymentModalTypes.cancel,
        },
      ]);
    });

    describe('when page not edited', () => {
      it('redirect to transaction list on existing bill payment', () => {
        const { module, store } = setupWithExisting();

        module.openCancelModal();

        expect(store.getActions()).toEqual([]);
        expect(window.location.href).toEqual(
          expect.stringContaining('/transactionList')
        );
      });

      it('redirect to bill list on new bill payment', () => {
        const { module } = setupWithNew();

        module.openCancelModal();

        expect(window.location.href).toEqual(expect.stringContaining('/bill'));
      });

      it('redirect to bill detail on prefilled bill payment', () => {
        const { module } = setupWithNew({ applyPaymentToBillId: 'billId' });

        module.openCancelModal();

        expect(window.location.href).toEqual(
          expect.stringContaining('/billId')
        );
      });
    });
  });

  describe('sendRemittanceAdviceModal', () => {
    it('should not show when send remittance advice checkbox is unchecked', () => {
      const { module, store } = setupWithExisting();

      module.dispatcher.updateShouldSendRemittanceAdvice({ value: false });
      module.saveBillPayment();

      expect(store.getActions()).not.toContain({
        intent: OPEN_MODAL,
        action: remittanceAdviceTypes.email,
      });
    });

    it('should first save payment if it had been edited', () => {
      const { module, integration } = setupWithExisting();

      module.dispatcher.updateHeaderOption({
        key: 'description',
        value: 'wawa',
      });

      module.dispatcher.updateShouldSendRemittanceAdvice({ value: true });

      module.saveBillPayment();

      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: UPDATE_BILL_PAYMENT,
          }),
        ])
      );
    });

    it('should close and return to bill payment after clicking cancel', () => {
      const { module, store } = setupWithExisting();

      module.openRemittanceAdviceModal();
      store.resetActions();

      module.closeRemittanceAdviceModal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT_MESSAGE,
          message: '',
          type: '',
        },
        {
          intent: UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
          shouldSendRemittanceAdvice: false,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
    });

    it('should not be shown when loading an existing bill', () => {
      const toolbox = setupWithExisting();
      const { store } = toolbox;

      expect(store.getActions()).not.toContain(
        expect.objectContaining({
          intent: OPEN_MODAL,
          action: remittanceAdviceTypes.email,
        })
      );
    });

    it('should send remittance advice request on confirm', () => {
      const toolbox = setupWithExisting();
      const { store, module, integration } = toolbox;

      module.openRemittanceAdviceModal();
      store.resetActions();

      module.sendRemittanceAdviceEmail();

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_ALERT_MESSAGE,
          message: '',
          type: '',
        },
        {
          intent: UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
          shouldSendRemittanceAdvice: false,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SEND_EMAIL,
          urlParams: { businessId: '33', billPaymentId: '1' },
          content: expect.objectContaining({
            ...store.getState().remittanceAdviceDetails,
            ccAddresses: [],
          }),
        },
      ]);
    });

    it('should download remittance advice request on confirm', () => {
      const toolbox = setupWithExisting();
      const { store, module, integration } = toolbox;

      module.openRemittanceAdviceModal();
      store.resetActions();

      module.downloadRemittanceAdvicePdf();

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_ALERT_MESSAGE,
          message: '',
          type: '',
        },
        {
          intent: UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
          shouldSendRemittanceAdvice: false,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: EXPORT_PDF,
          urlParams: { businessId: '33', billPaymentId: '1' },
          params: { formName: 'c' },
        },
      ]);

      expect(openBlob).toHaveBeenCalled();
    });
  });

  describe('handlePageTransition', () => {
    const setupWithEditedPage = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.updateHeaderOption({ key: 'description', value: '????' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '????',
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
          modalType: billPaymentModalTypes.unsaved,
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

      module.updateHeaderOption({ key: 'description', value: '????' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '????',
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
