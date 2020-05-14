import { LOAD_SPLIT_ALLOCATION } from '../../BankingIntents';
import { calculateLineAmount } from '../splitAllocationHandlers';
import bankingReducer from '../index';

describe('splitAllocationHandlers', () => {
  describe('LOAD_SPLIT_ALLOCATION', () => {
    const response = {
      accountId: '3',
      contactId: '8389',
      date: '2020-05-05T00:00:00',
      description: 'DEBIT CARD - DISRUPTION',
      id: '220495',
      isReportable: false,
      isSpendMoney: true,
      contacts: [],
      lines: [],
    };

    const state = {
      entries: [
        {
          withdrawal: 311.85,
        },
      ],
      openEntry: {
        attachments: [],
      },
      contacts: [],
    };

    it('replaces contacts', () => {
      const action = {
        intent: LOAD_SPLIT_ALLOCATION,
        index: 0,
        allocate: {
          ...response,
          contacts: [{
            id: '🦖',
          }],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.contacts).toEqual([{
        id: '🦖',
      }]);
    });
  });

  describe('calculateLineAmount', () => {
    const state = {
      openEntry: {
        allocate: {
          totalAmount: 100.01,
          lines: [
            { amount: '50.01', amountPercent: '50' },
            { amount: '10.00', amountPercent: '10' },
          ],
        },
      },
    };

    [
      [
        '10.00',
        'line amount is edited',
        state,
        state.openEntry.allocate.lines[0],
        '10',
        false,
      ],
      [
        '-10.00',
        'line amount is changed to negative',
        state,
        state.openEntry.allocate.lines[0],
        '-10',
        false,
      ],
      [
        '50.00',
        'line amount updated to remainder amount',
        state,
        state.openEntry.allocate.lines[1],
        '50',
        false,
      ],
      [
        '40.00',
        'line is added to have remainder amount',
        state,
        { amountPercent: '40' },
        '40',
        true,
      ],
    ].forEach(([expected, description, ...args]) => {
      it(`should return ${expected} when ${description}`, () => {
        const isAllocated = calculateLineAmount(...args);

        expect(isAllocated).toEqual(expected);
      });
    });
  });
});
