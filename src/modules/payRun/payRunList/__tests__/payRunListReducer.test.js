import { addYears } from 'date-fns';

import { RESET_STATE } from '../../../../SystemIntents';
import { SET_SORT_ORDER, UPDATE_FILTER_OPTIONS } from '../PayRunListIntents';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';
import payRunListReducer from '../payRunListReducer';

describe('payRunListReducer', () => {
  describe('filterOptions', () => {
    it('can update state with DateFrom strings', () => {
      const state = {
        filterOptions: {
          dateFrom: '2019-01-05',
        },
      };

      const action = {
        intent: UPDATE_FILTER_OPTIONS,
        filterName: 'dateFrom',
        value: '2019-01-10',
      };

      const expected = {
        filterOptions: {
          dateFrom: '2019-01-10',
        },
      };

      const actual = payRunListReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('sortOrder', () => {
    it('can update the sort order', () => {
      const state = {
        sortOrder: 'asc',
      };
      const action = {
        intent: SET_SORT_ORDER,
        sortOrder: 'desc',
      };
      const expected = {
        sortOrder: 'desc',
      };

      const actual = payRunListReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('defaultfilterOptions', () => {
    it('is date range of 1 years prior to today', () => {
      const action = {
        intent: RESET_STATE,
      };
      const today = new Date();
      const expected = {
        dateFrom: formatIsoDate(addYears(today, -1)),
        dateTo: formatIsoDate(today),
      };
      const actual = payRunListReducer({}, action).filterOptions;
      expect(actual).toEqual(expected);
    });
  });
});
