import {
  LOAD_ABN_DETAIL,
  SELECT_APRA_FUND,
  SET_ACCESS_TOKEN,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
} from '../../SuperFundIntents';
import superFundWithPaySuperReducer from '../superFundWithPaySuperReducer';

describe('superFundReducer', () => {
  const reducer = superFundWithPaySuperReducer;

  describe('updateSuperFund', () => {
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

    it('should update fundType to default when isPaySuperFund is changed to false', () => {
      const state = {
        superFund: {
          fundType: 'SelfManagedSuperFund',
          isPaySuperFund: true,
        },
        isPageEdited: false,
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'isPaySuperFund',
        value: false,
      };
      const expected = {
        superFund: {
          fundType: 'APRASuperFund',
          isPaySuperFund: false,
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should not update fundType to default when isPaySuperFund is changed to true', () => {
      const state = {
        superFund: {
          fundType: 'SelfManagedSuperFund',
          isPaySuperFund: false,
        },
        isPageEdited: false,
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'isPaySuperFund',
        value: true,
      };
      const expected = {
        superFund: {
          fundType: 'SelfManagedSuperFund',
          isPaySuperFund: true,
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateSelfManagedFundAbn', () => {
    it('updates abn field', () => {
      const state = {
        superFund: {
          superProductAbn: '123',
        },
        isPageEdited: false,
        isAbnDirty: false,
      };
      const action = {
        intent: UPDATE_SELF_MANAGED_FUND_ABN,
        key: 'superProductAbn',
        value: '456',
      };
      const expected = {
        superFund: {
          superProductAbn: '456',
        },
        isPageEdited: true,
        isAbnDirty: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('sets access token', () => {
      const state = {

      };
      const action = {
        intent: SET_ACCESS_TOKEN,
        accessToken: 'foobarbaz',
      };
      const expected = {
        accessToken: 'foobarbaz',
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAPRAFund', () => {
    it('updates fund details', () => {
      const state = {
        superFund: {
          name: '0',
          superProductAbn: '1',
          superFundIdentifier: '2',
          superProductId: '3',
          superProductName: '4',
        },
        isPageEdited: false,
      };
      const action = {
        intent: SELECT_APRA_FUND,
        superProduct: {
          name: '44',
          usi: '33',
          abn: '11',
          scfi: '22',
        },
      };
      const expected = {
        superFund: {
          name: '44',
          superProductAbn: '11',
          superFundIdentifier: '22',
          superProductId: '33',
          superProductName: '44',
        },
        isPageEdited: true,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('loadAbnDetail', () => {
    it('load abn detail', () => {
      const state = {
        superFund: {
          name: 'old',
          superProductName: 'old',
        },
        isAbnDirty: true,
      };
      const action = {
        intent: LOAD_ABN_DETAIL,
        name: 'new',
      };
      const expected = {
        superFund: {
          name: 'new',
          superProductName: 'new',
        },
        isAbnDirty: false,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
