import { LOAD_NEW_BILL_PAYMENT, UPDATE_REFERENCE_ID } from '../BillIntents';
import billReducer from '../reducer/billReducer';

describe('billRecordPaymentReducer', () => {
  describe('UPDATE_REFERENCE_ID', () => {
    it('should set the bankStatementText to referenceId when no supplier default', () => {
      const state = {
        recordBillPayment: {
          accountId: '1',
          electronicClearingAccountId: '1',
          supplierStatementText: '',
          referenceId: '1',
        },
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('PAYMENT 123');
    });
  });

  describe('LOAD_NEW_BILL_PAYMENT', () => {
    it('should set the bankStatementText if the initially set account is electronics clearing account', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        response: {
          electronicClearingAccountId: '1',
          accountId: '1',
          referenceId: '123',
        },
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('PAYMENT 123');
    });

    it('should set the bankStatementText to supplier default text', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        response: {
          electronicClearingAccountId: '1',
          accountId: '1',
          referenceId: '123',
          supplierStatementText: 'WAWA',
        },
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('WAWA');
    });

    it('should set the bankStatementText using reference when empty', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        response: {
          electronicClearingAccountId: '1',
          accountId: '1',
          referenceId: '123',
          supplierStatementText: '',
        },
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('PAYMENT 123');
    });
  });
});
