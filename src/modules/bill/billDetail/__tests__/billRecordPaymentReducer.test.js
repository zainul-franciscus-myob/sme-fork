import { LOAD_NEW_BILL_PAYMENT, UPDATE_REFERENCE_ID } from '../BillIntents';
import { getDefaultState } from '../reducer/getDefaultState';
import BillLineType from '../types/BillLineType';
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

    it('should set the bankStatementText to referenceId when new referenceId is fetched', () => {
      const state = {
        recordBillPayment: {
          accountId: '1',
          electronicClearingAccountId: '1',
          bankStatementText: 'PAYMENT 123',
          referenceId: '123',
        },
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '124',
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('PAYMENT 124');
    });

    it('should not set the bankStatementText when modified', () => {
      const state = {
        recordBillPayment: {
          bankStatementText: 'MY TEXT',
        },
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('MY TEXT');
    });

    it('should not set the bankStatementText when modified', () => {
      const state = {
        recordBillPayment: {
          bankStatementText: 'MY TEXT',
        },
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.bankStatementText).toEqual('MY TEXT');
    });
  });

  describe('LOAD_NEW_BILL_PAYMENT', () => {
    it('should set paid amount equal to balance due', () => {
      const state = {
        ...getDefaultState(),
        bill: {
          billNumber: '000005',
          amountPaid: '0',
          isTaxInclusive: true,
          lines: [
            {
              type: BillLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: BillLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
      };

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        response: {},
      };

      const actual = billReducer(state, action);

      expect(actual.recordBillPayment.paidAmount).toEqual('10');
    });

    it('should set the bankStatementText if the initially set account is electronics clearing account', () => {
      const state = getDefaultState();

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
      expect(actual.recordBillPayment.paidAmount).toEqual('0');
    });

    it('should set the bankStatementText to supplier default text', () => {
      const state = getDefaultState();

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
      const state = getDefaultState();

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
