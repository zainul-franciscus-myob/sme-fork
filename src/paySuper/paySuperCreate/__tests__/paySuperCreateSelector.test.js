import { getBalanceValue, getCodeToAuthoriseContent, getTotalPayment } from '../paySuperCreateSelector';
import { getOrder } from '../../../banking/bankingSelectors';

describe('paySuperCreateSelector', () => {
  describe('getBalanceValue', () => {
    const state = {
      selectedAccountId: 3,
      accounts: [
        {
          balance: 110,
          id: 1,
        },
        {
          balance: 120,
          id: 3,
        },
      ],
    };

    it('it returns null when accounts is not provided', () => {
      const stateWithNoAccounts = {
        ...state,
        accounts: undefined,
      };

      const result = getBalanceValue(stateWithNoAccounts);

      expect(result).toBe(null);
    });

    it('it returns null when no accounts available', () => {
      const stateWithEmptyAccounts = {
        ...state,
        accounts: [],
      };

      const result = getBalanceValue(stateWithEmptyAccounts);

      expect(result).toBe(null);
    });

    it('it returns null when no account selected', () => {
      const stateWithNoSelectedAccount = {
        ...state,
        selectedAccountId: null,
      };

      const result = getBalanceValue(stateWithNoSelectedAccount);

      expect(result).toBe(null);
    });

    it('it returns null when selected is is not in the list of accounts', () => {
      const stateWithNoSelectedAccount = {
        ...state,
        selectedAccountId: 10,
      };

      const result = getBalanceValue(stateWithNoSelectedAccount);

      expect(result).toBe(null);
    });

    it('it returns the expected balance, when valid id is', () => {
      const result = getBalanceValue(state);

      expect(result).toBe(120);
    });
  });

  describe('getTotalPayment', () => {
    it('returns zero no super payments', () => {
      const result = getTotalPayment({});

      expect(result).toEqual('$0.00');
    });

    it('returns zero when empty super payment list', () => {
      const state = { superPayments: [] };

      const result = getTotalPayment(state);

      expect(result).toEqual('$0.00');
    });

    it('returns zero when no super payment is selected', () => {
      const state = {
        superPayments: [
          { isSelected: false, amount: 1 },
          { isSelected: false, amount: 2 },
          { isSelected: false, amount: 3 },
        ],
      };

      const result = getTotalPayment(state);

      expect(result).toEqual('$0.00');
    });

    it('returns expected summed amount when sum seleced', () => {
      const state = {
        superPayments: [
          { isSelected: true, amount: 1.5 },
          { isSelected: false, amount: 2 },
          { isSelected: true, amount: 3.25 },
          { isSelected: false, amount: 10 },
        ],
      };

      const result = getTotalPayment(state);

      expect(result).toEqual('$4.75');
    });
  });

  describe('getOrder', () => {
    it('returns the column name as expected', () => {
      const state = { orderBy: 'SomeColumn' };

      const result = getOrder(state);

      expect(result).toEqual({
        column: 'SomeColumn',
        descending: false,
      });
    });

    it('returns descending when the sortOrder is desc', () => {
      const state = { orderBy: 'SomeColumn', sortOrder: 'desc' };

      const result = getOrder(state);

      expect(result).toEqual({
        column: 'SomeColumn',
        descending: true,
      });
    });
  });

  describe('getCodeToAuthoriseContent', () => {
    it('builds the content', () => {
      const batchPaymentId = 'BATCH_PAYMENT_ID';
      const state = { batchPaymentId };

      const result = getCodeToAuthoriseContent(state);

      expect(result).toEqual({
        batchPaymentId,
      });
    });
  });
});
