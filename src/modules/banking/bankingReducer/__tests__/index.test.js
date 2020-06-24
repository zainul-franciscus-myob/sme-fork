import { LOAD_JOB_AFTER_CREATE } from '../../BankingIntents';
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

const { dateFrom, dateTo } = getDateRangeByPeriodAndRegion('au', new Date(), Periods.thisMonth);


describe('bankingReducer', () => {
  describe('setInitialState', () => {
    it('should default transaction type to unallocated', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: { transactionType: 'some-value' },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.transactionType).toEqual(TransactionTypes.UNALLOCATED);
    });

    it('should set transaction type to allocated given a value of Linked', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: { transactionType: 'Linked' },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.transactionType).toEqual(TransactionTypes.ALLOCATED);
    });

    it('should use custom period if transaction type in context is Linked', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: { transactionType: 'Linked' },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.period).toEqual(Periods.custom);
    });

    it('should use default period if transaction type in context is not Linked', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: { transactionType: 'All' },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.period).toEqual(Periods.thisMonth);
    });

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
      expect(actual.openEntry.allocate.lines.map(line => line.lineJobOptions[0])).toEqual([
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
});
