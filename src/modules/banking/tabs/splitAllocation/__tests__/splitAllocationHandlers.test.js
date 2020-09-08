import Decimal from 'decimal.js';

import {
  CALCULATE_SPLIT_ALLOCATION_TAX,
  LOAD_SPLIT_ALLOCATION,
  POPULATE_REMAINING_AMOUNT,
} from '../../../BankingIntents';
import { calculateLineAmount } from '../splitAllocationHandlers';
import bankingReducer from '../../../reducers/index';

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
      lines: [{ jobId: '1' }, { jobId: '2' }, { jobId: '3' }],
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
      jobs: [
        { id: '1', isActive: false },
        { id: '2', isActive: false },
        { id: '3', isActive: true },
        { id: '4', isActive: true },
      ],
    };

    it('replaces contacts', () => {
      const action = {
        intent: LOAD_SPLIT_ALLOCATION,
        index: 0,
        allocate: {
          ...response,
          contacts: [
            {
              id: '🦖',
            },
          ],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.contacts).toEqual([
        {
          id: '🦖',
        },
      ]);
    });

    describe('lineJobOptions', () => {
      const action = {
        intent: LOAD_SPLIT_ALLOCATION,
        index: 0,
        allocate: {
          ...response,
        },
      };

      const actual = bankingReducer(state, action);

      it('updates lines with lineJobOptions', () => {
        const lineOneExpectedOptions = state.jobs.filter(
          (job) => job.id !== '2'
        );
        const lineTwoExpectedOptions = state.jobs.filter(
          (job) => job.id !== '1'
        );
        const lineThreeExpectedOptions = state.jobs.filter(
          (job) => job.id !== '1' && job.id !== '2'
        );

        expect(actual.openEntry.allocate.lines[0].lineJobOptions).toEqual(
          lineOneExpectedOptions
        );
        expect(actual.openEntry.allocate.lines[1].lineJobOptions).toEqual(
          lineTwoExpectedOptions
        );
        expect(actual.openEntry.allocate.lines[2].lineJobOptions).toEqual(
          lineThreeExpectedOptions
        );
      });

      it('shows active selected jobs against new line', () => {
        const expectedJobOptions = state.jobs.filter((job) => job.isActive);

        expect(actual.openEntry.allocate.newLine.lineJobOptions).toEqual(
          expectedJobOptions
        );
      });
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

  describe('CALCULATE_SPLIT_ALLOCATION_TAX', () => {
    it('merges tax amount into lines, respectively', () => {
      const state = {
        openEntry: {
          allocate: {
            lines: [
              {
                amount: 100,
                taxCodeId: '1',
              },
              {
                amount: 200,
                taxCodeId: '2',
              },
            ],
          },
        },
      };

      const action = {
        intent: CALCULATE_SPLIT_ALLOCATION_TAX,
        taxCalculations: {
          lines: [
            {
              taxAmount: new Decimal('10.00'),
            },
            {
              taxAmount: new Decimal('20.00'),
            },
          ],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.openEntry.allocate.lines).toEqual([
        {
          amount: 100,
          taxCodeId: '1',
          taxAmount: '10',
        },
        {
          amount: 200,
          taxCodeId: '2',
          taxAmount: '20',
        },
      ]);
    });
  });

  describe('populateRemainingAmount', () => {
    it('should calculate the remaining total unallocated value for a new line', () => {
      const state = {
        openEntry: {
          allocate: {
            totalAmount: 500,
            lines: [],
            newLine: {},
          },
        },
      };

      const action = {
        intent: POPULATE_REMAINING_AMOUNT,
        index: 0,
      };

      const actual = bankingReducer(state, action);

      const expectedLines = [
        {
          amount: 500,
          amountPercent: '100.00',
        },
      ];

      expect(actual.openEntry.allocate.lines).toEqual(expectedLines);
    });

    it('should calculate the remaining unallocated value for an existing line', () => {
      const state = {
        openEntry: {
          allocate: {
            totalAmount: 750,
            lines: [
              { amount: 250, amountPercent: '33.33' },
              { amount: 250, amountPercent: '33.33' },
            ],
            newLine: {},
          },
        },
      };

      const action = {
        intent: POPULATE_REMAINING_AMOUNT,
        index: 0,
      };

      const actual = bankingReducer(state, action);

      const expectedLines = [
        {
          amount: 500,
          amountPercent: '66.67',
        },
        {
          amount: 250,
          amountPercent: '33.33',
        },
      ];

      expect(actual.openEntry.allocate.lines).toEqual(expectedLines);
    });

    it('should calculate the negative remaining unallocated value', () => {
      const state = {
        openEntry: {
          allocate: {
            totalAmount: 500,
            lines: [{ amount: 750, amountPercent: '150.00' }],
            newLine: {},
          },
        },
      };

      const action = {
        intent: POPULATE_REMAINING_AMOUNT,
        index: 1,
      };

      const actual = bankingReducer(state, action);

      const expectedLines = [
        {
          amount: 750,
          amountPercent: '150.00',
        },
        {
          amount: -250,
          amountPercent: '-50.00',
        },
      ];

      expect(actual.openEntry.allocate.lines).toEqual(expectedLines);
    });
  });
});
