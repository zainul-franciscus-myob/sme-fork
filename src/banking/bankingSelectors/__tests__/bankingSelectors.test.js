import { businessEventTypes } from '../../businessEventTypes';
import {
  getCalculatedAllocatedBalances,
  getCalculatedUnallocatedBalances,
  getDisplayBalances,
  getIsAllocated,
  getOpenEntryDefaultTabId,
} from '../index';
import { tabIds } from '../../tabItems';

describe('bankingSelector', () => {
  describe('getIsAllocated', () => {
    [
      ['singleAllocation', true],
      ['splitAllocation', true],
      ['matched', false],
      ['unmatched', false],
    ].forEach((args) => {
      const [type, expected] = args;

      it(`should return ${expected} when type is ${type}`, () => {
        const isAllocated = getIsAllocated({ type, journalId: '123' });

        expect(isAllocated).toEqual(expected);
      });
    });
  });

  describe('getBankTransactionLineDefaultTabId', () => {
    [
      ['singleAllocation', businessEventTypes.spendMoney, tabIds.allocate],
      ['singleAllocation', businessEventTypes.receiveMoney, tabIds.allocate],
      ['singleAllocation', businessEventTypes.generalJournal, tabIds.match],
      ['singleAllocation', businessEventTypes.transferMoney, tabIds.match],
      ['splitAllocation', businessEventTypes.spendMoney, tabIds.allocate],
      ['splitAllocation', businessEventTypes.receiveMoney, tabIds.allocate],
      ['splitAllocation', businessEventTypes.generalJournal, tabIds.match],
      ['splitAllocation', businessEventTypes.transferMoney, tabIds.match],
      ['matched', businessEventTypes.spendMoney, tabIds.allocate],
      ['matched', businessEventTypes.receiveMoney, tabIds.allocate],
      ['matched', businessEventTypes.generalJournal, tabIds.match],
      ['matched', businessEventTypes.transferMoney, tabIds.match],
      ['unmatched', businessEventTypes.spendMoney, tabIds.allocate],
      ['unmatched', businessEventTypes.receiveMoney, tabIds.allocate],
      ['unmatched', businessEventTypes.generalJournal, tabIds.allocate],
      ['unmatched', businessEventTypes.transferMoney, tabIds.allocate],
    ].forEach((args) => {
      const [type, sourceJournal, expected] = args;

      it(`should return ${expected} when sourceJournal is ${sourceJournal} and type is ${type}`, () => {
        const tabId = getOpenEntryDefaultTabId({ type, sourceJournal });

        expect(tabId).toEqual(expected);
      });
    });
  });

  describe('getCalculatedAllocatedBalances', () => {
    it('should reduce amount from unallocated when account is under withdrawal', () => {
      const expected = { bankBalance: 1000, myobBalance: 1100, unallocated: 400 };
      const state = {
        entries: [{ withdrawal: 100, deposit: undefined }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 500 },
      };
      const result = getCalculatedAllocatedBalances(state, 0);

      expect(result).toEqual(expected);
    });

    it('should add amount to unallocated when account is under deposit', () => {
      const expected = { bankBalance: 1000, myobBalance: 900, unallocated: 600 };
      const state = {
        entries: [{ withdrawal: undefined, deposit: 100 }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 500 },
      };
      const result = getCalculatedAllocatedBalances(state, 0);

      expect(result).toEqual(expected);
    });
  });

  describe('getCalculatedUnallocatedBalances', () => {
    it('should add amount to unallocated when amount is under withdrawal', () => {
      const expected = { bankBalance: 1000, myobBalance: 900, unallocated: 600 };
      const state = {
        entries: [{ withdrawal: 100, deposit: undefined }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 500 },
      };
      const result = getCalculatedUnallocatedBalances(state, 0);

      expect(result).toEqual(expected);
    });

    it('should reduce amount from unallocated when amount is under deposit', () => {
      const expected = { bankBalance: 1000, myobBalance: 1100, unallocated: 400 };
      const state = {
        entries: [{ withdrawal: undefined, deposit: 100 }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 500 },
      };
      const result = getCalculatedUnallocatedBalances(state, 0);

      expect(result).toEqual(expected);
    });
  });

  describe('getDisplayBalances', () => {
    [
      [
        'should return valid balances',
        { bankBalance: 1200, myobBalance: 200, unallocated: 1000 },
        { bankBalance: '$1,200.00', myobBalance: '$200.00', unallocated: '$1,000.00' },
      ],
      [
        'should return negative balances',
        { bankBalance: 1200, myobBalance: 2400, unallocated: -2200 },
        { bankBalance: '$1,200.00', myobBalance: '$2,400.00', unallocated: '-$2,200.00' },
      ],
      [
        'should return empty balances when all balance are undefined',
        { bankBalance: undefined, myobBalance: undefined, unallocated: undefined },
        { bankBalance: '$--', myobBalance: '$--', unallocated: '$--' },
      ],
      [
        'should return empty balances when bankBalance is undefined',
        { bankBalance: undefined, myobBalance: 1000, unallocated: 12.9 },
        { bankBalance: '$--', myobBalance: '$--', unallocated: '$--' },
      ],
      [
        'should return empty balances when myobBalance is undefined',
        { bankBalance: 1209.09, myobBalance: undefined, unallocated: 12.9 },
        { bankBalance: '$--', myobBalance: '$--', unallocated: '$--' },
      ],
      [
        'should return empty balances when unallocated is undefined',
        { bankBalance: 1209.09, myobBalance: 1000, unallocated: undefined },
        { bankBalance: '$--', myobBalance: '$--', unallocated: '$--' },
      ],
    ].forEach((args) => {
      const [name, balances, expected] = args;

      it(name, () => {
        const result = getDisplayBalances.resultFunc(balances);

        expect(result).toEqual(expected);
      });
    });
  });
});
