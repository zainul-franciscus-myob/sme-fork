import {
  getCreateTransferMoneyPayload,
  getIsTableEmpty,
  getMatchTransferMoneyPayload,
  getMatchTransferMoneyQueryParams,
  getTransferMoneyModal,
} from '../transferMoneySelectors';
import { getShowCreateTransferMoneyButton } from '../../../selectors';
import TabItems from '../../../types/TabItems';

describe('transferMoneySelectors', () => {
  describe('getCreateTransferMoneyPayload', () => {
    it('should get the transfer money allocation create payload for a deposit transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '50.00',
            withdrawal: '',
            bankAccountId: '1',
          },
        ],
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
        isWithdrawal: false,
        baseTransactionId: '2',
        baseAccountId: '1',
        transferAccountId: '20',
        amount: '50.00',
        date: '2019-01-01',
      };

      const actual = getCreateTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });

    it('should get the transfer money allocation create payload for a withdrawal transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '',
            withdrawal: '20.00',
            bankAccountId: '1',
          },
        ],
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
        isWithdrawal: true,
        baseTransactionId: '2',
        baseAccountId: '1',
        transferAccountId: '20',
        amount: '20.00',
        date: '2019-01-01',
      };

      const actual = getCreateTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });
  });

  describe('getMatchTransferMoneyPayload', () => {
    it('should get the transfer money allocation create payload for a withdrawal transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '',
            withdrawal: '20.00',
            description: 'BB',
            bankAccountId: '1',
          },
        ],
        openPosition: 0,
        openEntry: {
          transfer: {
            isWithdrawal: true,
            entries: [
              {
                bankFeedTransactionId: '372',
                accountId: '37',
                selected: true,
              },
            ],
          },
        },
      };

      const expected = {
        isWithdrawal: true,
        baseTransactionId: '2',
        baseAccountId: '1',
        transferTransactionId: '372',
        transferAccountId: '37',
        amount: '20.00',
        date: '2019-01-01',
        description: 'BB',
      };

      const actual = getMatchTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });

    it('should get the transfer money allocation create payload for a deposit transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '20.00',
            withdrawal: '',
            bankAccountId: '1',
          },
        ],
        openPosition: 0,
        openEntry: {
          transfer: {
            isWithdrawal: false,
            entries: [
              {
                bankFeedTransactionId: '372',
                accountId: '37',
                date: '2020-01-01',
                description: 'MATCH',
                selected: true,
              },
            ],
          },
        },
      };

      const expected = {
        isWithdrawal: false,
        baseTransactionId: '2',
        baseAccountId: '1',
        transferTransactionId: '372',
        transferAccountId: '37',
        amount: '20.00',
        date: '2020-01-01',
        description: 'MATCH',
      };

      const actual = getMatchTransferMoneyPayload(state, 0);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTransferMoneyModal', () => {
    let state;
    let accountList;

    beforeEach(() => {
      accountList = [
        { id: '1', displayId: 'ID', displayName: 'NAME' },
        { id: '20', displayId: 'ID2', displayName: 'NAME2' },
      ];
      state = {
        transferAccounts: accountList,
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '50.00',
            withdrawal: '',
          },
        ],
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

      const result = getTransferMoneyModal(state);

      expect(result).toEqual(expected);
    });

    it('should set the the transfer display type to transferFrom when transaction is a deposit', () => {
      state = {
        ...state,
        openEntry: {
          ...state.openEntry,
          isCreating: true,
          transfer: {
            isWithdrawal: false,
          },
        },
      };
      const expected = 'transferFrom';
      const result = getTransferMoneyModal(state).transferDisplayType;
      expect(result).toBe(expected);
    });

    it('should set the the transfer display type to transferTo when transaction is a withdrawal', () => {
      state = {
        ...state,
        entries: [
          {
            transactionId: '2',
            date: '2019-01-01',
            deposit: '',
            withdrawal: '50.00',
          },
        ],
        openEntry: {
          ...state.openEntry,
          isCreating: true,
          transfer: {
            isWithdrawal: true,
          },
        },
      };
      const expected = 'transferTo';
      const result = getTransferMoneyModal(state).transferDisplayType;
      expect(result).toBe(expected);
    });
  });

  describe('getIsTableEmpty', () => {
    it('should return true when no entries', () => {
      const state = {
        openEntry: {
          transfer: {
            entries: [],
          },
        },
      };
      const actual = getIsTableEmpty(state);
      expect(actual).toEqual(true);
    });

    it('should return false when entries in list exist', () => {
      const state = {
        openEntry: {
          transfer: {
            entries: [{ a: '1' }, { b: '2' }],
          },
        },
      };
      const actual = getIsTableEmpty(state);
      expect(actual).toEqual(false);
    });
  });

  describe('getShowCreateTransferMoneyButton', () => {
    it('should return true when activeTabId is TabItems.transfer', () => {
      const state = {
        openEntry: {
          activeTabId: TabItems.transfer,
        },
      };
      const actual = getShowCreateTransferMoneyButton(state);
      expect(actual).toEqual(true);
    });

    it('should return false when activeTabId is not tabId.transfer', () => {
      const state = {
        openEntry: {
          activeTabId: TabItems.someOtherId,
        },
      };
      const actual = getShowCreateTransferMoneyButton(state);
      expect(actual).toEqual(false);
    });
  });

  describe('getMatchTransferMoneyQueryParams', () => {
    it.each(['deposit', 'withdrawal'])(
      'should return correct request params for a %s',
      (transactionType) => {
        const state = {
          entries: [
            {
              transactionId: '1',
              [transactionType]: '100',
              date: '2018-05-20',
            },
          ],
          openEntry: {
            transfer: {
              sortOrder: 'desc',
              orderBy: 'Date',
            },
          },
        };

        const expected = {
          bankFeedTransactionId: '1',
          dateFrom: '2018-05-13',
          dateTo: '2018-05-27',
          amountFrom: 99.9,
          amountTo: 100.1,
          sortOrder: 'desc',
          orderBy: 'Date',
        };

        const index = 0;
        const actual = getMatchTransferMoneyQueryParams(state, index);
        expect(actual).toEqual(expected);
      }
    );
  });
});
