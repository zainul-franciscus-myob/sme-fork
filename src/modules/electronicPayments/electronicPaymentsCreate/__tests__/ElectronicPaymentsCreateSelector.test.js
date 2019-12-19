import {
  getTotalPayment,
} from '../ElectronicPaymentsCreateSelector';

describe('ElectronicPaymentsCreateSelector', () => {
  describe('getTotalPayment', () => {
    const state = {
      transactions: [
        {
          id: 1,
          date: '02/12/2018',
          referenceNumber: '23',
          name: 'Leonard Dunn',
          paymentType: 'Pay employees',
          amount: 408.05,
          isSelected: true,
        },
        {
          id: 2,
          date: '05/12/2018',
          referenceNumber: '24',
          name: 'Eliza Fuller',
          paymentType: 'Pay employees',
          amount: 828.55,
          isSelected: true,
        },
      ],
    };

    it('calculates and formats payments', () => {
      const actual = getTotalPayment(state);

      expect(actual).toEqual('$1,236.60');
    });

    it('calculates and formats selected payments', () => {
      const modifiedState = {
        ...state,
        transactions: [
          ...state.transactions,
          {
            id: 3,
            date: '05/12/2018',
            referenceNumber: '24',
            name: 'Eliza Fuller',
            paymentType: 'Pay employees',
            amount: 828.55,
            isSelected: false,
          },
        ],
      };

      const actual = getTotalPayment(modifiedState);

      expect(actual).toEqual('$1,236.60');
    });

    it('returns zero when no payments are selected', () => {
      const modifiedState = {
        ...state,
        transactions: [],
      };

      const actual = getTotalPayment(modifiedState);

      expect(actual).toEqual('$0.00');
    });
  });
});
