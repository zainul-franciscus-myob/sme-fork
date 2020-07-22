import {
  LOAD_BUSINESS_DETAIL,
  UPDATE_BUSINESS_DETAIL,
  UPDATE_LOCK_DATE_DETAIL,
} from '../../BusinessIntents';
import businessDetailsReducer from '../businessDetailReducer';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

describe('businessDetailReducer', () => {
  describe('updateLockDateDetail', () => {
    it('set lock date to today when enable lock without previous lock date', () => {
      const state = {
        businessDetails: {
          hasLockPeriod: false,
          lockDate: '',
        },
        isLockDateAutoPopulated: false,
      };

      const expected = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: formatIsoDate(new Date()),
        },
        isLockDateAutoPopulated: true,
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_LOCK_DATE_DETAIL,
        key: 'hasLockPeriod',
        value: true,
      });

      expect(actual).toEqual(expected);
    });

    it('use previous lock date when enable lock with previous lock date', () => {
      const state = {
        businessDetails: {
          hasLockPeriod: false,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: false,
      };

      const expected = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: false,
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_LOCK_DATE_DETAIL,
        key: 'hasLockPeriod',
        value: true,
      });

      expect(actual).toEqual(expected);
    });

    it('clear lock date when disable lock with auto populated lock date', () => {
      const state = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: true,
      };

      const expected = {
        businessDetails: {
          hasLockPeriod: false,
          lockDate: '',
        },
        isLockDateAutoPopulated: false,
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_LOCK_DATE_DETAIL,
        key: 'hasLockPeriod',
        value: false,
      });

      expect(actual).toEqual(expected);
    });

    it('keep lock date when disable lock without auto populated lock date', () => {
      const state = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: false,
      };

      const expected = {
        businessDetails: {
          hasLockPeriod: false,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: false,
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_LOCK_DATE_DETAIL,
        key: 'hasLockPeriod',
        value: false,
      });

      expect(actual).toEqual(expected);
    });

    it('set auto populated flag to false when user select lock date', () => {
      const state = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: '2019-11-11',
        },
        isLockDateAutoPopulated: true,
      };

      const expected = {
        businessDetails: {
          hasLockPeriod: true,
          lockDate: '2019-11-12',
        },
        isLockDateAutoPopulated: false,
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_LOCK_DATE_DETAIL,
        key: 'lockDate',
        value: '2019-11-12',
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('loadBusinessDetail', () => {
    it('should make all fields in FinancialYearSection readonly when current financial year is closed', () => {
      const state = {
        businessDetails: {
          isFinancialYearClosed: false,
        },
        isFinancialYearSectionReadOnly: false,
      };

      const action = {
        businessDetails: {
          isFinancialYearClosed: true,
        },
      };

      const actual = businessDetailsReducer(state, {
        intent: LOAD_BUSINESS_DETAIL,
        businessDetails: action.businessDetails,
      });

      expect(actual.isFinancialYearSectionReadOnly).toBeTruthy();
    });

    it('should have OpeningBalanceYear and OpeningBalanceMonth', () => {
      const state = {
        businessDetails: {
          openingBalanceDate: '',
        },
      };

      const action = {
        businessDetails: {
          openingBalanceDate: '2020-06-01T00:00:00',
        },
      };

      const expected = {
        businessDetails: {
          openingBalanceDate: '2020-06-01T00:00:00',
          openingBalanceYear: 2020,
          openingBalanceMonth: 6,
        },
      };

      const actual = businessDetailsReducer(state, {
        intent: LOAD_BUSINESS_DETAIL,
        businessDetails: action.businessDetails,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('updateBusinessDetail', () => {
    it('should set openingBalanceYear to same as financialYear when openingBalanceMonth is on/before lastMonthInFinancialYear', () => {
      const state = {
        businessDetails: {
          financialYear: 2020,
          lastMonthInFinancialYear: 6,
        },
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_BUSINESS_DETAIL,
        key: 'openingBalanceMonth',
        value: 6,
      });

      expect(actual.businessDetails.openingBalanceYear).toEqual(2020);
    });

    it('should set openingBalanceYear to financialYear - 1 when openingBalanceMonth is after lastMonthInFinancialYear', () => {
      const state = {
        businessDetails: {
          financialYear: 2020,
          lastMonthInFinancialYear: 6,
        },
      };

      const actual = businessDetailsReducer(state, {
        intent: UPDATE_BUSINESS_DETAIL,
        key: 'openingBalanceMonth',
        value: 10,
      });

      expect(actual.businessDetails.openingBalanceYear).toEqual(2019);
    });
  });
});
