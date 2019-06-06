import {
  getFormattedTransfer, getTransferMoneyPayload,
} from '../transferMoneySelectors';

describe('transferMoneySelectors', () => {
  describe('getTransferMoneyPayload', () => {
    it('should get the transfer money allocation create payload for a deposit transaction', () => {
      const state = {
        entries: [{
          transactionId: '2', date: '2019-01-01', deposit: '50.00', withdrawal: '',
        }],
        filterOptions: { bankAccount: '1' },
        openPosition: 0,
        openEntry: {
          transfer: {
            transferFrom: '20',
            transferTo: '1',
            amount: '$50.00',
          },
        },
      };

      const expected = {
        bankAccountId: '1',
        transactionId: '2',
        transferFrom: '20',
        transferTo: '1',
        date: '2019-01-01',
        amount: '50.00',
      };

      const actual = getTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });

    it('should get the transfer money allocation create payload for a withdrawal transaction', () => {
      const state = {
        entries: [{
          transactionId: '2', date: '2019-01-01', deposit: '', withdrawal: '20.00',
        }],
        filterOptions: { bankAccount: '1' },
        openPosition: 0,
        openEntry: {
          transfer: {
            transferFrom: '1',
            transferTo: '20',
            amount: '$20.00',
          },
        },
      };

      const expected = {
        bankAccountId: '1',
        transactionId: '2',
        transferFrom: '1',
        transferTo: '20',
        date: '2019-01-01',
        amount: '20.00',
      };

      const actual = getTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });
  });


  describe('getFormattedTransfer', () => {
    let state;
    let accountList;

    beforeEach(() => {
      accountList = [
        { id: '1', displayId: 'ID', displayName: 'NAME' },
        { id: '20', displayId: 'ID2', displayName: 'NAME2' },
      ];
      state = {
        transferAccounts: accountList,
        entries: [{
          transactionId: '2', date: '2019-01-01', deposit: '50.00', withdrawal: '',
        }],
        filterOptions: { bankAccount: '1' },
        openPosition: 0,
        openEntry: {
          transfer: {
            transferFrom: '20',
            transferTo: '1',
            amount: '$50.00',
          },
        },
      };
    });

    it('getTransfer should extract the required data for transfer money', () => {
      const expected = {
        transferFrom: '20',
        transferTo: '1',
        amount: '$50.00',
        accountList,
        transferDisplayType: 'readOnly',
        transferToDisplayName: 'ID NAME',
        transferFromDisplayName: 'ID2 NAME2',
      };

      const result = getFormattedTransfer(state);

      expect(result).toEqual(expected);
    });

    it('should set the the transfer display type to transferFrom when transaction is a deposit', () => {
      state = {
        ...state,
        openEntry: {
          ...(state.openEntry),
          isCreating: true,
        },
      };
      const expected = 'transferFrom';
      const result = getFormattedTransfer(state).transferDisplayType;
      expect(result).toBe(expected);
    });

    it('should set the the transfer display type to transferTo when transaction is a withdrawal', () => {
      state = {
        ...state,
        entries: [{
          transactionId: '2', date: '2019-01-01', deposit: '', withdrawal: '50.00',
        }],
        openEntry: {
          ...(state.openEntry),
          isCreating: true,
        },
      };
      const expected = 'transferTo';
      const result = getFormattedTransfer(state).transferDisplayType;
      expect(result).toBe(expected);
    });
  });
});
