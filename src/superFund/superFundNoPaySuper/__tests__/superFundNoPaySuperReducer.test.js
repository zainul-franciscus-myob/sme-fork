import {
  UPDATE_SUPER_FUND_DETAIL,
} from '../../SuperFundIntents';
import reducer from '../superFundNoPaySuperReducer';

describe('superFundNoPaySuperReducer', () => {
  describe('updateSuperFundDetail', () => {
    it('updates fields', () => {
      const state = {
        superFund: {
          bankNumber: '123',
        },
        isPageEdited: false,
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'bankNumber',
        value: '456',
      };
      const expected = {
        superFund: {
          bankNumber: '456',
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('updates phoneNumber when allowed characters typed', () => {
      const state = {
        superFund: {
          phoneNumber: '123',
        },
        isPageEdited: false,
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'phoneNumber',
        value: '123 ',
      };
      const expected = {
        superFund: {
          phoneNumber: '123 ',
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('does not update phoneNumber when special chars typed', () => {
      const state = {
        superFund: {
          phoneNumber: '123',
        },
        isPageEdited: false,
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'phoneNumber',
        value: '123$',
      };
      const expected = {
        superFund: {
          phoneNumber: '123',
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
