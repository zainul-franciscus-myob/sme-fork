import { SET_MATCH_TRANSFER_MONEY_SELECTION } from '../../../BankingIntents';
import {
  loadMatchTransferMoney,
  setMatchTransferMoneySelection,
} from '../transferMoneyHandlers';
import TabItems from '../../../types/TabItems';

describe('transferMoneyHandlers', () => {
  describe('loadNewTransferMoney', () => {
    it('should load transfer money data in the open entry for a withdrawal transaction', () => {
      const state = {
        entries: [{ withdrawal: '10.00', bankAccountId: '1' }],
        openEntry: {
          attachments: [],
        },
      };

      const expected = {
        openPosition: 0,
        openEntry: {
          isCreating: true,
          activeTabId: TabItems.transfer,
          transfer: {
            isTableLoading: false,
            isWithdrawal: true,
            orderBy: 'Date',
            sortOrder: 'desc',
            transferFrom: '1',
            transferTo: '',
            amount: '10.00',
          },
        },
      };

      const newState = loadMatchTransferMoney(state, { index: 0 });
      const result = {
        openPosition: newState.openPosition,
        openEntry: {
          isCreating: newState.openEntry.isCreating,
          activeTabId: newState.openEntry.activeTabId,
          transfer: newState.openEntry.transfer,
        },
      };

      expect(result).toEqual(expected);
    });

    it('should load transfer money data in the open entry for a deposit transaction', () => {
      const state = {
        entries: [{ deposit: '20.00', bankAccountId: '1' }],
        openEntry: {
          attachments: [],
        },
      };

      const expected = {
        openPosition: 0,
        openEntry: {
          isCreating: true,
          activeTabId: TabItems.transfer,
          transfer: {
            isTableLoading: false,
            isWithdrawal: false,
            orderBy: 'Date',
            sortOrder: 'desc',
            transferFrom: '',
            transferTo: '1',
            amount: '20.00',
          },
        },
      };

      const newState = loadMatchTransferMoney(state, { index: 0 });
      const result = {
        openPosition: newState.openPosition,
        openEntry: {
          isCreating: newState.openEntry.isCreating,
          activeTabId: newState.openEntry.activeTabId,
          transfer: newState.openEntry.transfer,
        },
      };

      expect(result).toEqual(expected);
    });
    describe('updateMatchTransferMoneyTransactionSelection', () => {
      it('sets selected to true when index of the entries list is equal to the action.index', () => {
        const state = {
          openEntry: {
            transfer: {
              entries: [
                {
                  id: '1',
                  selected: true,
                },
                {
                  id: '2',
                  selected: false,
                },
              ],
            },
          },
        };

        const action = {
          intent: SET_MATCH_TRANSFER_MONEY_SELECTION,
          index: 1,
        };

        const actual = setMatchTransferMoneySelection(state, action);

        expect(actual.openEntry.transfer).toEqual({
          entries: [
            {
              id: '1',
              selected: false,
            },
            {
              id: '2',
              selected: true,
            },
          ],
        });
      });
    });
  });
});
