import {
  CLOSE_MODAL,
  CREATE_BILL_PAYMENT,
  GET_REFERENCE_ID,
  LOAD_BILL,
  LOAD_NEW_BILL_PAYMENT,
  OPEN_ALERT,
  OPEN_MODAL,
  RELOAD_BILL,
  SET_PAYMENT_MODAL_ALERT,
  SET_PAYMENT_MODAL_LOADING_STATE,
  SET_PAYMENT_MODAL_SUBMITTING_STATE,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
} from '../BillIntents';
import { mockCreateObjectUrl, setUpWithRun } from './BillModule.test';
import ModalType from '../types/ModalType';
import loadNewBillPaymentResponse from '../mappings/data/loadNewBillPaymentWithSupplier';

jest.mock('../../../../telemetry', () => ({
  trackUserEvent: jest.fn(),
}));

describe('BillModule_RecordBillPaymentModal', () => {
  mockCreateObjectUrl();

  const setupWithExisting = () => {
    const toolbox = setUpWithRun();
    const { store, integration, module } = toolbox;

    module.loadNewBillPayment();
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('load new bill payment', () => {
    it('opens bill payment modal', () => {
      const { module, store } = setUpWithRun();

      module.openRecordPaymentModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.RecordPayment },
      ]);
    });

    it('sends request to load new bill payment for the current bill', () => {
      const { module, store, integration } = setUpWithRun();
      store.state.supplierId = '1';

      module.loadNewBillPayment();

      expect(store.getActions()).toEqual([
        { intent: SET_PAYMENT_MODAL_LOADING_STATE, isModalLoading: true },
        { intent: SET_PAYMENT_MODAL_LOADING_STATE, isModalLoading: false },
        {
          intent: LOAD_NEW_BILL_PAYMENT,
          response: {
            ...loadNewBillPaymentResponse,
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_NEW_BILL_PAYMENT }),
      ]);
    });

    it('shows alert when request to load new bill payment fails for the current bill', () => {
      const { module, store, integration } = setUpWithRun();
      store.state.supplierId = '1';
      integration.mapFailure(LOAD_NEW_BILL_PAYMENT, {
        message: 'load new bill payment failure',
      });

      module.loadNewBillPayment();

      expect(store.getActions()).toEqual([
        { intent: SET_PAYMENT_MODAL_LOADING_STATE, isModalLoading: true },
        { intent: SET_PAYMENT_MODAL_LOADING_STATE, isModalLoading: false },
        {
          intent: SET_PAYMENT_MODAL_ALERT,
          alert: { type: 'danger', message: 'load new bill payment failure' },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_NEW_BILL_PAYMENT }),
      ]);
    });
  });

  describe('updateIsElectronicPayment', () => {
    it('should update account to electronic clearing when true', () => {
      const { module, store } = setupWithExisting();
      const {
        recordBillPayment: { electronicClearingAccountId },
      } = store.getState();

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

      module.updateHeaderOption({ key: 'description', value: '🤞' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_HEADER_OPTION,
          key: 'description',
          value: '🤞',
        },
      ]);
    });

    it('bank statement text is updated when reference is edited', () => {
      const { module, store, integration } = setUpWithRun();
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
        const { module, store } = setUpWithRun();
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
        const { module, store, integration } = setUpWithRun();
        integration.mapFailure(GET_REFERENCE_ID);

        module.updateHeaderOption({ key: 'accountId', value: '2' });

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: UPDATE_HEADER_OPTION,
              key: 'accountId',
              value: '2',
            },
            {
              intent: SET_PAYMENT_MODAL_ALERT,
              alert: { type: 'danger', message: 'fails' },
            },
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: GET_REFERENCE_ID,
          }),
        ]);
      });
    });
  });

  describe('saveBillPayment', () => {
    it(`successfully create bill payment`, () => {
      const { module, store, integration } = setupWithExisting();

      module.saveBillPayment();

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            intent: SET_PAYMENT_MODAL_SUBMITTING_STATE,
            isSubmitting: true,
          },
          expect.objectContaining({
            intent: RELOAD_BILL,
          }),
          {
            intent: SET_PAYMENT_MODAL_SUBMITTING_STATE,
            isSubmitting: false,
          },
          {
            intent: CLOSE_MODAL,
          },
          {
            intent: OPEN_ALERT,
            message: expect.any(String),
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
            intent: LOAD_BILL,
          }),
        ])
      );
    });

    it(`fails to create bill payment`, () => {
      const { module, store, integration } = setupWithExisting();
      integration.mapFailure(CREATE_BILL_PAYMENT);

      module.saveBillPayment();

      expect(store.getActions()).toEqual([
        {
          intent: SET_PAYMENT_MODAL_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_PAYMENT_MODAL_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_PAYMENT_MODAL_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL_PAYMENT,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.dispatcher.setBillPaymentModalSubmittingState(true);
      store.resetActions();

      module.saveBillPayment();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });
});
