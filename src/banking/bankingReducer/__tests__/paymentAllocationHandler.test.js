import { loadPaymentAllocation, loadPaymentAllocationOptions } from '../paymentAllocationHandler';

describe('paymentAllocationHandler', () => {
  const suppliers = [{
    contactType: 'Supplier', displayName: 'A-Z Stationery Supplies', id: '1', displayId: 'SUP000001',
  }];
  const customers = [{
    contactType: 'Customer', displayName: 'Clemons, Iga', id: '3', displayId: 'CUS000001',
  }];

  describe('loadPaymentAllocation', () => {
    const entries = [
      {
        id: '378',
        referenceId: '0000023',
        status: 'Open',
        date: '27/03/2019',
        amount: '120.00',
        discountAmount: '0',
      },
    ];
    const action = {
      index: 0,
      payment: { contactId: '1', entries },
    };

    it('should return correct bill payment state', () => {
      const transaction = { transactionId: '78', withdrawal: 3300 };
      const state = {
        entries: [transaction],
        openEntry: {
          attachments: [],
        },
        suppliers,
        customers,
      };
      const expected = {
        isTableLoading: false,
        isBillPayment: true,
        totalAmount: 3300,
        contacts: suppliers,
        filterOptions: { contactId: '1', showPaid: false },
        entries,
      };

      const actual = loadPaymentAllocation(state, action);
      const {
        openPosition,
        openEntry: { payment },
      } = actual;

      expect(openPosition).toEqual(0);
      expect(payment).toEqual(expected);
    });

    it('should return correct invoice payment state', () => {
      const transaction = { transactionId: '78', deposit: 3300 };
      const state = {
        entries: [transaction],
        openEntry: {
          attachments: [],
        },
        suppliers,
        customers,
      };
      const expected = {
        isTableLoading: false,
        isBillPayment: false,
        totalAmount: 3300,
        contacts: customers,
        filterOptions: { contactId: '1', showPaid: false },
        entries,
      };

      const actual = loadPaymentAllocation(state, action);
      const {
        openPosition,
        openEntry: { payment },
      } = actual;

      expect(openPosition).toEqual(0);
      expect(payment).toEqual(expected);
    });
  });

  describe('loadPaymentAllocationOptions', () => {
    const action = { index: 0 };

    it('should return correct bill payment options', () => {
      const transaction = { transactionId: '78', withdrawal: 3300 };
      const state = {
        entries: [transaction],
        openEntry: {
          attachments: [],
        },
        suppliers,
        customers,
      };
      const expected = {
        isTableLoading: false,
        isBillPayment: true,
        totalAmount: 3300,
        contacts: suppliers,
        filterOptions: { contactId: '', showPaid: false },
        entries: [],
      };
      const actual = loadPaymentAllocationOptions(state, action);
      const {
        openPosition,
        openEntry: { payment },
      } = actual;

      expect(openPosition).toEqual(0);
      expect(payment).toEqual(expected);
    });

    it('should return correct invoice payment options', () => {
      const transaction = { transactionId: '78', deposit: 3300 };
      const state = {
        entries: [transaction],
        openEntry: {
          attachments: [],
        },
        suppliers,
        customers,
      };
      const expected = {
        isTableLoading: false,
        isBillPayment: false,
        totalAmount: 3300,
        contacts: customers,
        filterOptions: { contactId: '', showPaid: false },
        entries: [],
      };
      const actual = loadPaymentAllocationOptions(state, action);
      const {
        openPosition,
        openEntry: { payment },
      } = actual;

      expect(openPosition).toEqual(0);
      expect(payment).toEqual(expected);
    });
  });
});
