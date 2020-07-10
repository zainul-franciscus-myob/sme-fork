import {
  LOAD_BILL_LIST,
  LOAD_NEW_BILL_PAYMENT,
  RESET_BANK_STATEMENT_TEXT,
  UPDATE_REFERENCE_ID,
} from '../../BillPaymentIntents';
import billPaymentDetailReducer from '../billPaymentDetailReducer';

describe('billPaymentDetailReducer', () => {
  describe('LOAD_BILL_LIST', () => {
    const action = {
      intent: LOAD_BILL_LIST,
      entries: [
        {
          id: '1',
          billNumber: '0000023',
          status: 'Open',
          date: '27/03/2019',
          billAmount: '250.05',
          discountAmount: '',
          paidAmount: '',
        },
        {
          id: '378',
          billNumber: '0000024',
          status: 'Open',
          date: '27/03/2019',
          billAmount: '2500.05',
          discountAmount: '',
          paidAmount: '',
        },
      ],
    };

    it('loads entries', () => {
      const state = {
        entries: [],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toEqual(action.entries);
    });

    it('applies payment amount when has matching bill id', () => {
      const state = {
        applyPaymentToBillId: '1',
        paymentAmount: '200',
        entries: [],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toContainEqual(
        expect.objectContaining({
          id: '1',
          paidAmount: '200',
        })
      );
    });

    it('keeps the previous paidAmount and discountAmount', () => {
      const state = {
        entries: [
          {
            ...action.entries[0],
            paidAmount: '300',
            discountAmount: '200',
          },
        ],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toContainEqual(
        expect.objectContaining({
          id: '1',
          paidAmount: '300',
          discountAmount: '200',
        })
      );
    });
  });

  describe('RESET_BANK_STATEMENT_TEXT', () => {
    it("should reset bank statement text if it's cleared", () => {
      const state = {
        bankStatementText: 'some-text',
        originalBankStatementText: 'the-original-text',
      };

      const action = {
        intent: RESET_BANK_STATEMENT_TEXT,
        value: '',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('the-original-text');
    });

    it("should use the given value if it hasn't been cleared", () => {
      const state = {
        bankStatementText: 'some-text',
        originalBankStatementText: 'the-original-text',
      };

      const action = {
        intent: RESET_BANK_STATEMENT_TEXT,
        value: 'some-new-value',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('some-new-value');
    });
  });

  describe('UPDATE_REFERENCE_ID', () => {
    it('should set the bankStatementText to the new referenceId', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '1',
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('Payment 123');
      expect(actual.originalBankStatementText).toEqual('Payment 123');
    });

    it('should not set the bankStatementText and should keep the originalBankStatementText', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '2',
        originalBankStatementText: 'Payment 567',
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('');
      expect(actual.originalBankStatementText).toEqual('Payment 567');
    });
  });

  describe('LOAD_NEW_BILL_PAYMENT', () => {
    it('should set the bankStatementText if the initially set account is electronics clearing account', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        electronicClearingAccountId: '1',
        accountId: '1',
        referenceId: '123',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('Payment 123');
      expect(actual.originalBankStatementText).toEqual('Payment 123');
    });

    it('should not set the bankStatementText', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BILL_PAYMENT,
        electronicClearingAccountId: '2',
        accountId: '1',
        referenceId: '123',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('');
      expect(actual.originalBankStatementText).toEqual('');
    });
  });
});
