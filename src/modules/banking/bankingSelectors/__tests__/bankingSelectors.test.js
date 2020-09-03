import { businessEventTypes } from '../../../../common/types/BusinessEventTypeMap';
import {
  getDisplayBalances,
  getIsAllocated,
  getIsOpenTransactionWithdrawal,
  getOpenEntryDefaultTabId,
  getShowCreateBankingRuleButton,
} from '../index';
import { tabIds } from '../../tabItems';

describe('bankingSelector', () => {
  describe('getIsAllocated', () => {
    [
      ['singleAllocation', true],
      ['splitAllocation', true],
      ['transfer', true],
      ['matched', false],
      ['unmatched', false],
    ].forEach((args) => {
      const [type, expected] = args;

      it(`should return ${expected} when type is ${type}`, () => {
        const isAllocated = getIsAllocated({
          type,
          journals: [{ journalId: '123' }],
        });

        expect(isAllocated).toEqual(expected);
      });
    });
  });

  describe('getBankTransactionLineDefaultTabId', () => {
    [
      [
        'singleAllocation',
        [{ sourceJournal: businessEventTypes.spendMoney }],
        tabIds.allocate,
      ],
      [
        'splitAllocation',
        [{ sourceJournal: businessEventTypes.spendMoney }],
        tabIds.allocate,
      ],
      ['matched', [], tabIds.match],
      ['unmatched', [], tabIds.allocate],
      ['splitMatched', [], tabIds.match],
      ['paymentRuleMatched', [], tabIds.match],
    ].forEach((args) => {
      const [type, journals, expected] = args;

      it(`should return ${expected} when sourceJournal is ${journals[0]?.sourceJournal} and type is ${type}`, () => {
        const tabId = getOpenEntryDefaultTabId({ type, journals });

        expect(tabId).toEqual(expected);
      });
    });
  });

  describe('getDisplayBalances', () => {
    [
      [
        'should return valid balances',
        { bankBalance: 1200, myobBalance: 200, unallocated: 1000 },
        {
          bankBalance: '$1,200.00',
          myobBalance: '$200.00',
          unallocated: '$1,000.00',
        },
      ],
      [
        'should return negative balances',
        { bankBalance: 1200, myobBalance: 2400, unallocated: -2200 },
        {
          bankBalance: '$1,200.00',
          myobBalance: '$2,400.00',
          unallocated: '-$2,200.00',
        },
      ],
      [
        'should return empty balances when all balance are undefined',
        {
          bankBalance: undefined,
          myobBalance: undefined,
          unallocated: undefined,
        },
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
        const result = getDisplayBalances.resultFunc(balances, 0);

        expect(result.bankBalance).toEqual(expected.bankBalance);
        expect(result.myobBalance).toEqual(expected.myobBalance);
        expect(result.unallocated).toEqual(expected.unallocated);
      });
    });

    [
      [
        'should return balance date',
        '01/01/2019',
        'Closing account balance as at 01/01/2019',
      ],
      [
        'should return unavailable balance message',
        '',
        "Your bank hasn't provided the account's balance, so we can't show these amounts.",
      ],
    ].forEach((args) => {
      const [name, bankBalanceDate, expectedBalanceTooltip] = args;

      const balances = {
        bankBalance: 1200,
        myobBalance: 200,
        unallocated: 1000,
        bankBalanceDate,
      };

      it(name, () => {
        const result = getDisplayBalances.resultFunc(balances);

        expect(result.balanceTooltip).toEqual(expectedBalanceTooltip);
      });
    });
  });

  describe('getShowCreateBankingRuleButton', () => {
    it.each([
      ['allocate', true],
      ['match', true],
      ['transfer', false],
    ])(
      'should decide whether to show create banking rule button',
      (tabId, expected) => {
        const state = {
          openEntry: {
            activeTabId: tabId,
          },
        };

        const actual = getShowCreateBankingRuleButton(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getIsOpenTransactionWithdrawal', () => {
    it('false when deposit', () => {
      const state = {
        entries: [
          {},
          {
            withdrawal: undefined,
            deposit: 100,
          },
        ],
        openPosition: 1,
      };

      const actual = getIsOpenTransactionWithdrawal(state);

      expect(actual).toEqual(false);
    });

    it('true when withdrawal', () => {
      const state = {
        entries: [
          {},
          {
            withdrawal: 100,
            deposit: undefined,
          },
        ],
        openPosition: 1,
      };

      const actual = getIsOpenTransactionWithdrawal(state);

      expect(actual).toEqual(true);
    });
  });
});
