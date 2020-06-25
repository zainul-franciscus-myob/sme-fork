import { LOAD_NEW_TRANSFER_MONEY, LOAD_TRANSFER_MONEY_DETAIL } from '../../TransferMoneyIntents';
import {
  getBalance,
  getIsBeforeStartOfFinancialYear,
  getLoadTransferMoneyIntent,
  getLoadTransferMoneyUrlParams,
} from '../transferMoneyDetailSelectors';

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
            currentBalance: '$5,000.00',
            calculatedBalance: '$0.00',
          },
          transferTo: {
            currentBalance: '$10,000.00',
            calculatedBalance: '$5,000.00',
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
            currentBalance: '$5,000.00',
            calculatedBalance: '$10,000.00',
          },
          transferTo: {
            currentBalance: '$1,000.00',
            calculatedBalance: '-$4,000.00',
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
            currentBalance: '$10,000.00',
            calculatedBalance: '$15,000.00',
          },
          transferTo: {
            currentBalance: '$5,000.00',
            calculatedBalance: '$10,000.00',
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
            currentBalance: '$10,000.00',
            calculatedBalance: '$5,000.00',
          },
          transferTo: {
            currentBalance: '$5,000.00',
            calculatedBalance: '$10,000.00',
          },
        };

        expect(getBalance(state)).toEqual(expected);
      });
    });
  });

  describe('getLoadTransferMoneyIntent', () => {
    it('gets load new when creating', () => {
      const state = {
        transferMoneyId: 'new',
      };

      const actual = getLoadTransferMoneyIntent(state);

      expect(actual).toEqual(LOAD_NEW_TRANSFER_MONEY);
    });

    it('gets load existing when not creating', () => {
      const state = {
        transferMoneyId: '🥮',
      };

      const actual = getLoadTransferMoneyIntent(state);

      expect(actual).toEqual(LOAD_TRANSFER_MONEY_DETAIL);
    });
  });

  describe('getLoadTransferMoneyUrlParams', () => {
    it('has transferMoneyId and businessId when existing', () => {
      const state = {
        businessId: '👩‍🚀',
        transferMoneyId: '🥮',
      };

      const actual = getLoadTransferMoneyUrlParams(state);

      expect(actual).toEqual({
        businessId: '👩‍🚀',
        transferMoneyId: '🥮',
      });
    });

    it('has businessId when new', () => {
      const state = {
        businessId: '👩‍🚀',
        transferMoneyId: 'new',
      };

      const actual = getLoadTransferMoneyUrlParams(state);

      expect(actual).toEqual({
        businessId: '👩‍🚀',
      });
    });
  });

  describe('getIsBeforeStartOfFinancialYear', () => {
    it.each([
      ['2014-07-01', '2010-01-01', true],
      ['2014-07-01', '2014-06-30', true],
      ['2014-07-01', '2014-07-01', false],
      ['2014-07-01', '2014-07-02', false],
      ['2014-07-01', '2015-01-01', false],
    ])(
      'when start of financial year date is %s and date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          transferMoney: { date },
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      },
    );
  });
});
