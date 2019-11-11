import { SET_SORT_ORDER, UPDATE_FILTER_OPTIONS } from '../PayRunListIntents';
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
});
