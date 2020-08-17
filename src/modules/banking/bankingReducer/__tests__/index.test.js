import { LOAD_JOB_AFTER_CREATE, SET_ENTRY_FOCUS } from '../../BankingIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import Periods from '../../../../components/PeriodPicker/Periods';
import TransactionTypes from '../../TransactionTypes';
import bankingReducer from '../index';
import getDateRangeByPeriodAndRegion from '../../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

jest.mock('../../../../components/PeriodPicker/getDateRangeByPeriodAndRegion');

getDateRangeByPeriodAndRegion.mockReturnValue({
  dateFrom: '2019-11-01',
  dateTo: '2019-11-30',
});

const { dateFrom, dateTo } = getDateRangeByPeriodAndRegion(
  'au',
  new Date(),
  Periods.thisMonth
);

describe('bankingReducer', () => {
  describe('setInitialState', () => {
    it.each([
      ['Linked', TransactionTypes.ALLOCATED],
      [TransactionTypes.ALLOCATED, TransactionTypes.ALLOCATED],
      ['Unlinked', TransactionTypes.UNALLOCATED],
      [TransactionTypes.UNALLOCATED, TransactionTypes.UNALLOCATED],
      [TransactionTypes.ALL, TransactionTypes.ALL],
      ['random-value', TransactionTypes.ALL],
    ])(
      'given %s it should set the transaction type to %s',
      (type, expectedTransactionType) => {
        const state = {
          filterOptions: {
            period: Periods.thisMonth,
          },
        };

        const action = {
          intent: SET_INITIAL_STATE,
          context: { transactionType: type },
        };

        const actual = bankingReducer(state, action);

        expect(actual.filterOptions.transactionType).toEqual(
          expectedTransactionType
        );
      }
    );

    it('should set dates if values given in context', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
          dateFrom: '2019-12-04T01:12:49+0000',
          dateTo: '2020-12-04T01:12:49+0000',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateFrom).toEqual('2019-12-04');
      expect(actual.filterOptions.dateTo).toEqual('2020-12-04');
      expect(actual.filterOptions.period).toEqual(Periods.custom);
    });

    it('should calculate dates based on default period if values not given in context', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateFrom).toEqual(dateFrom);
      expect(actual.filterOptions.dateTo).toEqual(dateTo);
    });

    it('should use dates from default period if given value is not an appropriate date format', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
          dateFrom: 'blah',
          dateTo: 'blah',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateFrom).toEqual(dateFrom);
      expect(actual.filterOptions.dateTo).toEqual(dateTo);
    });
  });

  describe('LOAD_JOB_AFTER_CREATE', () => {
    const lineJobOptions = [
      {
        id: '1',
        jobNumber: '100',
      },
      {
        id: '2',
        jobNumber: '200',
      },
    ];
    const state = {
      jobs: lineJobOptions,
      openEntry: {
        allocate: {
          id: '1',
          description: 'just a description',
          lines: [{ lineJobOptions }, { lineJobOptions }, { lineJobOptions }],
          newLine: { lineJobOptions },
        },
      },
    };

    const action = {
      intent: LOAD_JOB_AFTER_CREATE,
      id: '3',
      jobNumber: '300',
    };

    const actual = bankingReducer(state, action);

    it('adds newly created job into the front of jobOptions on each line', () => {
      expect(
        actual.openEntry.allocate.lines.map((line) => line.lineJobOptions[0])
      ).toEqual([
        { id: '3', jobNumber: '300' },
        { id: '3', jobNumber: '300' },
        { id: '3', jobNumber: '300' },
      ]);
    });

    it('adds newly created job into the front of jobOptions on new line', () => {
      expect(actual.openEntry.allocate.newLine.lineJobOptions[0]).toEqual({
        id: '3',
        jobNumber: '300',
      });
    });

    it('adds newly created job into jobs', () => {
      expect(actual.jobs[0]).toEqual({
        id: '3',
        jobNumber: '300',
      });
    });

    it('does not update other attributes in allocate', () => {
      expect(actual.openEntry.allocate.id).toBe('1');
      expect(actual.openEntry.allocate.description).toBe('just a description');
    });
  });

  describe('setEntryFocus', () => {
    const state = {
      focusIndex: -1,
      hoverIndex: -1,
    };

    it('should set the focusIndex', () => {
      const action = {
        intent: SET_ENTRY_FOCUS,
        index: 0,
        isFocused: true,
      };

      const actual = bankingReducer(state, action);

      expect(actual.focusIndex).toEqual(0);
    });

    it('should unset the focusIndex if focus is taken away', () => {
      const updatedState = {
        ...state,
        focusIndex: 2,
      };

      const action = {
        intent: SET_ENTRY_FOCUS,
        index: 2,
        isFocused: false,
      };

      const actual = bankingReducer(updatedState, action);

      expect(actual.focusIndex).toEqual(-1);
    });

    it('should ignore the action if the action is to remove the focusIndex for a different index', () => {
      const updatedState = {
        ...state,
        focusIndex: 2,
      };

      const action = {
        intent: SET_ENTRY_FOCUS,
        index: 3,
        isFocused: false,
      };

      const actual = bankingReducer(updatedState, action);

      expect(actual.focusIndex).toEqual(2);
    });
  });
});
