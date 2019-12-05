import { SET_INITIAL_STATE } from '../../../SystemIntents';
import TransactionTypes from '../../TransactionTypes';
import bankingReducer from '../index';

describe('bankingReducer', () => {
  describe('setInitialState', () => {
    it('should default transaction type to unallocated', () => {
      const state = {
        filterOptions: {},
        appliedFilterOptions: {},
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
        filterOptions: {},
        appliedFilterOptions: {},
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: { transactionType: 'Linked' },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.transactionType).toEqual(TransactionTypes.ALLOCATED);
      expect(actual.appliedFilterOptions.transactionType).toEqual(TransactionTypes.ALLOCATED);
    });

    it('should not set the dates if the transaction type is All', () => {
      const state = {
        filterOptions: {
          dateTo: 'some-date',
        },
        appliedFilterOptions: {
          dateTo: 'some-date',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'All',
          dateTo: '2019-12-04T01:12:49+0000',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateTo).toEqual('some-date');
      expect(actual.appliedFilterOptions.dateTo).toEqual('some-date');
    });

    it('should use dateFrom from state if value not given', () => {
      const state = {
        filterOptions: {
          dateFrom: 'some-date',
        },
        appliedFilterOptions: {
          dateFrom: 'some-date',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'All',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateFrom).toEqual('some-date');
      expect(actual.appliedFilterOptions.dateFrom).toEqual('some-date');
    });

    it('should set dateFrom if given a value', () => {
      const state = {
        filterOptions: {},
        appliedFilterOptions: {},
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
          dateFrom: '2019-12-04T01:12:49+0000',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateFrom).toEqual('2019-12-04');
      expect(actual.appliedFilterOptions.dateFrom).toEqual('2019-12-04');
    });

    it('should use dateTo from state if value not given', () => {
      const state = {
        filterOptions: {
          dateTo: 'some-date',
        },
        appliedFilterOptions: {
          dateTo: 'some-date',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'All',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateTo).toEqual('some-date');
      expect(actual.appliedFilterOptions.dateTo).toEqual('some-date');
    });

    it('should set dateTo if given a value', () => {
      const state = {
        filterOptions: {},
        appliedFilterOptions: {},
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
          dateTo: '2019-12-04T01:12:49+0000',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateTo).toEqual('2019-12-04');
      expect(actual.appliedFilterOptions.dateTo).toEqual('2019-12-04');
    });

    it('should use date from state if given value is not an appropriate date format', () => {
      const state = {
        filterOptions: {
          dateTo: 'some-date',
        },
        appliedFilterOptions: {
          dateTo: 'some-date',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          transactionType: 'Linked',
          dateTo: 'blah',
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual.filterOptions.dateTo).toEqual('some-date');
      expect(actual.appliedFilterOptions.dateTo).toEqual('some-date');
    });
  });
});
