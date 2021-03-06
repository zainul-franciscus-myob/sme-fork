import {
  CHANGE_REFERENCE_ID,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_DETAILS,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_REFERENCE_ID,
} from '../../BillPaymentIntents';
import billPaymentDetailReducer from '../billPaymentDetailReducer';
import supplierPaymentDetails from '../../mappings/data/supplierDetails.json';

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

  describe('CHANGE_REFERENCE_ID', () => {
    it('should set the bankStatementText to reference when referenceId changes and no supplier default', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '1',
        supplierStatementText: '',
      };

      const action = {
        intent: CHANGE_REFERENCE_ID,
        referenceId: '2',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('PAYMENT 2');
    });

    it('should not set the bankStatementText when a supplier has a default', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '1',
        supplierStatementText: 'SUPPLIER DEFAULT',
        bankStatementText: 'SUPPLIER DEFAULT',
      };

      const action = {
        intent: CHANGE_REFERENCE_ID,
        key: 'referenceId',
        value: '2',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('SUPPLIER DEFAULT');
    });

    it('should not set the bankStatementText user has edited', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '1',
        supplierStatementText: '',
        bankStatementText: 'CUSTOM',
      };

      const action = {
        intent: CHANGE_REFERENCE_ID,
        key: 'referenceId',
        value: '2',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('CUSTOM');
    });
  });

  describe('UPDATE_REFERENCE_ID', () => {
    it('should set the bankStatementText to referenceId when no supplier default', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '1',
        supplierStatementText: '',
        referenceId: '1',
      };

      const action = {
        intent: UPDATE_REFERENCE_ID,
        referenceId: '123',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('PAYMENT 123');
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

      expect(actual.bankStatementText).toEqual('PAYMENT 123');
    });
  });

  describe('LOAD_SUPPLIER_DETAILS', () => {
    it('should set the supplier payment details', () => {
      const state = {
        bankStatementText: '',
        arePaymentDetailsComplete: false,
        entries: [],
      };

      const action = {
        intent: LOAD_SUPPLIER_DETAILS,
        ...supplierPaymentDetails,
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('WAWA');
      expect(actual.arePaymentDetailsComplete).toEqual(true);
      expect(actual.entries).toEqual([
        {
          billAmount: '250.05',
          billNumber: '0000023',
          date: '27/03/2019',
          discountAmount: '',
          id: '1',
          paidAmount: '',
          status: 'Open',
        },
        {
          billAmount: '2500.05',
          billNumber: '0000024',
          date: '27/03/2019',
          discountAmount: '',
          id: '378',
          paidAmount: '',
          status: 'Open',
        },
      ]);
    });

    it('should not set the bankStatementText when modified', () => {
      const state = {
        bankStatementText: 'MY TEXT',
        entries: [],
      };

      const action = {
        intent: LOAD_SUPPLIER_DETAILS,
        ...supplierPaymentDetails,
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('MY TEXT');
    });

    it('should not set the bankStatementText when modified', () => {
      const state = {
        bankStatementText: 'MY TEXT',
        entries: [],
      };

      const action = {
        intent: LOAD_SUPPLIER_DETAILS,
        ...supplierPaymentDetails,
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('MY TEXT');
    });
  });

  describe('LOAD_BILL_PAYMENT', () => {
    [
      {
        fromName: 'someone',
        fromEmail: 'some@email.com',
        expected: true,
      },
      {
        fromName: '',
        fromEmail: 'some@email.com',
        expected: false,
      },
      {
        fromName: 'someone',
        fromEmail: '',
        expected: false,
      },
    ].forEach(({ fromName, fromEmail, expected }) => {
      it('emailSettingsSet should be true when fromName or fromEmail are not set', () => {
        const state = {
          areEmailSettingsSet: false,
        };

        const action = {
          intent: LOAD_BILL_PAYMENT,
          entries: [],
          remittanceAdviceDefaults: {
            fromName,
            fromEmail,
          },
        };

        const actual = billPaymentDetailReducer(state, action);
        expect(actual.areEmailSettingsSet).toBe(expected);
      });
    });
  });

  describe('UPDATE_BANK_STATEMENT_TEXT', () => {
    it('should set the bankStatementText when modified', () => {
      const state = {
        supplierStatementText: 'SUPP TEXT',
        bankStatementText: 'CUSTOM TEXT',
        originalBankStatementText: 'CUSTOM TEXT',
        referenceId: 'REF TEXT',
      };

      const action = {
        intent: UPDATE_BANK_STATEMENT_TEXT,
        bankStatementText: 'I IZ PAYING YOU',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('I IZ PAYING YOU');
    });

    it('should set the bankStatementText using reference when empty', () => {
      const state = {
        supplierStatementText: '',
        bankStatementText: '',
        referenceId: 'REF TEXT',
      };

      const action = {
        intent: UPDATE_BANK_STATEMENT_TEXT,
        bankStatementText: '',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('PAYMENT REF TEXT');
    });

    it('should set the bankStatementText using supplier text when empty', () => {
      const state = {
        supplierStatementText: 'SUPP TEXT',
        bankStatementText: '',
        referenceId: 'REF TEXT',
      };

      const action = {
        intent: UPDATE_BANK_STATEMENT_TEXT,
        bankStatementText: '',
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.bankStatementText).toEqual('SUPP TEXT');
    });
  });
});
