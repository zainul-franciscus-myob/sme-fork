import {
  DISCARD_TAB_DATA,
  LOAD_BUSINESS_SETTINGS,
  SET_TAB,
  UPDATE_FINANCIAL_YEAR_SETTINGS,
  UPDATE_LOCK_DATE_DETAIL,
} from '../../BusinessIntents';
import businessSettingsReducer from '../businessSettingsReducer';
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

      const actual = businessSettingsReducer(state, {
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

      const actual = businessSettingsReducer(state, {
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

      const actual = businessSettingsReducer(state, {
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

      const actual = businessSettingsReducer(state, {
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

      const actual = businessSettingsReducer(state, {
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

      const actual = businessSettingsReducer(state, {
        intent: LOAD_BUSINESS_SETTINGS,
        businessDetails: action.businessDetails,
      });

      expect(actual.isFinancialYearSectionReadOnly).toBeTruthy();
    });

    it('should have OpeningBalanceYear and OpeningBalanceMonth', () => {
      const state = {
        businessDetails: {
          openingBalanceDate: '',
        },
        tabData: {},
        selectedTab: 'businessDetails',
      };

      const action = {
        businessDetails: {
          openingBalanceDate: '2020-06-01T00:00:00',
        },
      };

      const actual = businessSettingsReducer(state, {
        intent: LOAD_BUSINESS_SETTINGS,
        businessDetails: action.businessDetails,
      });

      expect(actual.businessDetails.openingBalanceDate).toEqual(
        '2020-06-01T00:00:00'
      );
      expect(actual.businessDetails.openingBalanceYear).toEqual(2020);
      expect(actual.businessDetails.openingBalanceMonth).toEqual(6);
      expect(actual.tabData.openingBalanceDate).toEqual('2020-06-01T00:00:00');
      expect(actual.tabData.openingBalanceYear).toEqual(2020);
      expect(actual.tabData.openingBalanceMonth).toEqual(6);
    });

    it('should set lastMonthInNewFinancialYear with currently saved lastMonthInFinancialYear as default value', () => {
      const state = {
        businessDetails: {
          lastMonthInFinancialYear: '',
          lastMonthInNewFinancialYear: '',
        },
        selectedTab: 'businessDetails',
      };

      const action = {
        businessDetails: {
          lastMonthInFinancialYear: '11',
        },
      };

      const actual = businessSettingsReducer(state, {
        intent: LOAD_BUSINESS_SETTINGS,
        businessDetails: action.businessDetails,
      });

      expect(actual.businessDetails.lastMonthInNewFinancialYear).toEqual('11');
      expect(actual.tabData.lastMonthInNewFinancialYear).toEqual('11');
    });
  });

  describe('updateFinancialYearSettings', () => {
    it('should set openingBalanceYear to same as financialYear when openingBalanceMonth is on/before lastMonthInFinancialYear', () => {
      const state = {
        businessDetails: {
          financialYear: 2020,
          lastMonthInFinancialYear: 6,
        },
      };

      const actual = businessSettingsReducer(state, {
        intent: UPDATE_FINANCIAL_YEAR_SETTINGS,
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

      const actual = businessSettingsReducer(state, {
        intent: UPDATE_FINANCIAL_YEAR_SETTINGS,
        key: 'openingBalanceMonth',
        value: 10,
      });

      expect(actual.businessDetails.openingBalanceYear).toEqual(2019);
    });

    it('should set isFinancialYearSettingsChanged to true when any financial detail is changed', () => {
      const state = {
        businessDetails: {
          financialYear: 2020,
          lastMonthInFinancialYear: 6,
          openingBalanceMonth: 4,
        },
        isFinancialYearSettingsChanged: false,
      };

      const actual = businessSettingsReducer(state, {
        intent: UPDATE_FINANCIAL_YEAR_SETTINGS,
        key: 'lastMonthInFinancialYear',
        value: 10,
      });

      expect(actual.isFinancialYearSettingsChanged).toBeTruthy();
    });
  });

  describe('setTab', () => {
    it('sets gstsettings as tabData when switch to gstSettings', () => {
      const state = {
        gstSettings: {
          gstRegistered: 'No',
          accountingBasis: 'Cash',
        },
        selectedTab: 'businessDetails',
        pendingTab: 'gstSettings',
        tabData: { previous: 'tab' },
        isFinancialYearSettingsChanged: false,
        isPageEdited: true,
      };

      const action = {
        intent: SET_TAB,
        selectedTab: 'gstSettings',
      };

      const actual = businessSettingsReducer(state, action);

      expect(actual).toEqual({
        gstSettings: {
          gstRegistered: 'No',
          accountingBasis: 'Cash',
        },
        selectedTab: 'gstSettings',
        pendingTab: '',
        isPageEdited: false,
        isFinancialYearSettingsChanged: false,
        tabData: {
          gstRegistered: 'No',
          accountingBasis: 'Cash',
        },
      });
    });

    it('sets businessDetails as tabData when switch to businessDetails', () => {
      const state = {
        businessDetails: { clientCode: 'Test' },
        selectedTab: 'old',
        pendingTab: 'businessDetails',
        tabData: { previous: 'tab' },
        isPageEdited: true,
      };

      const action = {
        intent: SET_TAB,
        selectedTab: 'businessDetails',
      };

      const actual = businessSettingsReducer(state, action);

      expect(actual).toEqual({
        businessDetails: { clientCode: 'Test' },
        selectedTab: 'businessDetails',
        pendingTab: '',
        isPageEdited: false,
        isFinancialYearSettingsChanged: false,
        tabData: {
          clientCode: 'Test',
        },
      });
    });
  });

  describe('discardTabData', () => {
    it('sets tabData as gstSettings when discarding the unsaved data', () => {
      const state = {
        gstSettings: {
          gstRegistered: 'No',
          accountingBasis: 'Cash',
        },
        selectedTab: 'gstSettings',
        tabData: { previous: 'tab' },
      };

      const action = {
        intent: DISCARD_TAB_DATA,
      };

      const actual = businessSettingsReducer(state, action);

      expect(actual).toEqual({
        gstSettings: {
          previous: 'tab',
        },
        selectedTab: 'gstSettings',
        tabData: { previous: 'tab' },
      });
    });

    it('sets tabData as businessDetails when discarding the unsaved data', () => {
      const state = {
        businessDetails: { clientCode: 'Test' },
        selectedTab: 'businessDetails',
        tabData: { previous: 'tab' },
      };

      const action = {
        intent: DISCARD_TAB_DATA,
      };

      const actual = businessSettingsReducer(state, action);

      expect(actual).toEqual({
        businessDetails: { previous: 'tab' },
        selectedTab: 'businessDetails',
        tabData: { previous: 'tab' },
      });
    });
  });
});
