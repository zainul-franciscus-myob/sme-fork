import { getBalance } from '../transferMoneyDetailSelectors';

const accounts = [
  {
    id: 'b1',
    accountType: 'Asset',
    currentBalance: '5000.00',
  },
  {
    id: 'b2',
    accountType: 'Asset',
    currentBalance: '1000.00',
  },
  {
    id: 'c1',
    accountType: 'Liability',
    currentBalance: '10000.00',
  },
  {
    id: 'c2',
    accountType: 'Liability',
    currentBalance: '5000.00',
  },
];

describe('transferMoneyDetailSelectors', () => {
  describe('getBalance', () => {
    describe('returns correct balance of accounts when', () => {
      it('transferring from bank to credit card', () => {
        const state = {
          transferMoney: {
            accounts,
            selectedTransferFromAccountId: 'b1',
            selectedTransferToAccountId: 'c1',
            amount: '5000.00',
          },
        };

        const expected = {
          transferFrom: {
            currentBalance: '$5000.00',
            calculatedBalance: '$0.00',
          },
          transferTo: {
            currentBalance: '$10000.00',
            calculatedBalance: '$5000.00',
          },
        };

        expect(getBalance(state)).toEqual(expected);
      });

      it('transferring from bank to bank', () => {
        const state = {
          transferMoney: {
            accounts,
            selectedTransferFromAccountId: 'b1',
            selectedTransferToAccountId: 'b2',
            amount: '-5000.00',
          },
        };

        const expected = {
          transferFrom: {
            currentBalance: '$5000.00',
            calculatedBalance: '$10000.00',
          },
          transferTo: {
            currentBalance: '$1000.00',
            calculatedBalance: '-$4000.00',
          },
        };

        expect(getBalance(state)).toEqual(expected);
      });

      it('transferring from credit card to bank', () => {
        const state = {
          transferMoney: {
            accounts,
            selectedTransferFromAccountId: 'c1',
            selectedTransferToAccountId: 'b1',
            amount: '5000.00',
          },
        };

        const expected = {
          transferFrom: {
            currentBalance: '$10000.00',
            calculatedBalance: '$15000.00',
          },
          transferTo: {
            currentBalance: '$5000.00',
            calculatedBalance: '$10000.00',
          },
        };

        expect(getBalance(state)).toEqual(expected);
      });

      it('transferring from credit card to credit card', () => {
        const state = {
          transferMoney: {
            accounts,
            selectedTransferFromAccountId: 'c1',
            selectedTransferToAccountId: 'c2',
            amount: '-5000.00',
          },
        };

        const expected = {
          transferFrom: {
            currentBalance: '$10000.00',
            calculatedBalance: '$5000.00',
          },
          transferTo: {
            currentBalance: '$5000.00',
            calculatedBalance: '$10000.00',
          },
        };

        expect(getBalance(state)).toEqual(expected);
      });
    });
  });
});
