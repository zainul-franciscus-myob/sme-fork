import { loadNewTransferMoney } from '../transferMoneyHandlers';
import { tabIds } from '../../tabItems';

describe('transferMoneyHandlers', () => {
  describe('loadNewTransferMoney', () => {
    it('should load transfer money data in the open entry for a withdrawal transaction', () => {
      const state = {
        entries: [{ withdrawal: '10.00' }],
        filterOptions: { bankAccount: '1' },
      };

      const expected = {
        openPosition: 0,
        openEntry: {
          isCreating: true,
          activeTabId: tabIds.transfer,
          transfer: {
            transferFrom: '1',
            transferTo: '',
            amount: '10.00',
          },
        },
      };

      const newState = loadNewTransferMoney(state, { index: 0 });
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
        entries: [{ deposit: '20.00' }],
        filterOptions: { bankAccount: '1' },
      };

      const expected = {
        openPosition: 0,
        openEntry: {
          isCreating: true,
          activeTabId: tabIds.transfer,
          transfer: {
            transferFrom: '',
            transferTo: '1',
            amount: '20.00',
          },
        },
      };

      const newState = loadNewTransferMoney(state, { index: 0 });
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
  });
});
