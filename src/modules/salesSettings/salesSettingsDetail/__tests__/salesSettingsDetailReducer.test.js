import {
  LOAD_SALES_SETTINGS,
  SET_TAB,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../../SalesSettingsIntents';
import salesSettingsDetailReducer from '../salesSettingsDetailReducer';

describe('salesSettingsReducer', () => {
  const reducer = salesSettingsDetailReducer;

  describe('updateSalesSettingsItem', () => {
    it('updates sales settings for CashOnDelivery', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'CashOnDelivery',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'CashOnDelivery',
        numberOfDaysForBalanceDue: '0',
      });
    });

    it('updates sales settings for Prepaid', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'Prepaid',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'Prepaid',
        numberOfDaysForBalanceDue: '0',
      });
    });

    it('updates sales settings for OnADayOfTheMonth', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'OnADayOfTheMonth',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'OnADayOfTheMonth',
        numberOfDaysForBalanceDue: '31',
      });
    });

    it('updates sales settings for InAGivenNumberOfDays', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'InAGivenNumberOfDays',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'InAGivenNumberOfDays',
        numberOfDaysForBalanceDue: '30',
      });
    });

    it('updates sales settings for DayOfMonthAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'DayOfMonthAfterEOM',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'DayOfMonthAfterEOM',
        numberOfDaysForBalanceDue: '15',
      });
    });

    it('updates sales settings for NumberOfDaysAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: '',
          numberOfDaysForBalanceDue: '',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'paymentType',
        value: 'NumberOfDaysAfterEOM',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'NumberOfDaysAfterEOM',
        numberOfDaysForBalanceDue: '30',
      });
    });

    it('updates numberOfDaysForBalanceDue', () => {
      const state = {
        tabData: {
          paymentType: 'NumberOfDaysAfterEOM',
          numberOfDaysForBalanceDue: '30',
        },
      };
      const action = {
        intent: UPDATE_SALES_SETTINGS_ITEM,
        key: 'numberOfDaysForBalanceDue',
        value: '20',
      };

      const actual = reducer(state, action);

      expect(actual.tabData).toEqual({
        paymentType: 'NumberOfDaysAfterEOM',
        numberOfDaysForBalanceDue: '20',
      });
    });
  });

  describe('loadSalesSettings', () => {
    it('defaults tabData to salesSettings', () => {
      const state = {
        tabData: {},
      };
      const action = {
        intent: LOAD_SALES_SETTINGS,
        salesSettings: {
          some: 'settings',
        },
      };

      const actual = reducer(state, action);

      expect(actual).toEqual({
        salesSettings: {
          some: 'settings',
        },
        tabData: {
          some: 'settings',
        },
        templateSettings: {},
      });
    });
  });

  describe('setTab', () => {
    it('sets sales settings as tabData when switch to payments', () => {
      const state = {
        salesSettings: { sales: 'settings' },
        selectedTab: 'old',
        pendingTab: 'payments',
        tabData: { previous: 'tab' },
        isPageEdited: true,
      };
      const action = {
        intent: SET_TAB,
        selectedTab: 'payments',
      };

      const actual = reducer(state, action);

      expect(actual).toEqual({
        salesSettings: { sales: 'settings' },
        selectedTab: 'payments',
        pendingTab: '',
        isPageEdited: false,
        tabData: {
          sales: 'settings',
        },
      });
    });

    it('sets sales settings as tabData when switch to layoutAndTheme', () => {
      const state = {
        salesSettings: { sales: 'settings' },
        selectedTab: 'old',
        pendingTab: 'layoutAndTheme',
        tabData: { previous: 'tab' },
        isPageEdited: true,
      };
      const action = {
        intent: SET_TAB,
        selectedTab: 'layoutAndTheme',
      };

      const actual = reducer(state, action);

      expect(actual).toEqual({
        salesSettings: { sales: 'settings' },
        selectedTab: 'layoutAndTheme',
        pendingTab: '',
        isPageEdited: false,
        tabData: {
          sales: 'settings',
        },
      });
    });

    it('sets emails settings as tabData when switch to emailDefaults', () => {
      const state = {
        emailSettings: { email: 'settings' },
        selectedTab: 'old',
        pendingTab: 'emailDefaults',
        tabData: { previous: 'tab' },
        isPageEdited: true,
      };
      const action = {
        intent: SET_TAB,
        selectedTab: 'emailDefaults',
      };

      const actual = reducer(state, action);

      expect(actual).toEqual({
        emailSettings: { email: 'settings' },
        selectedTab: 'emailDefaults',
        pendingTab: '',
        isPageEdited: false,
        tabData: {
          email: 'settings',
        },
      });
    });
  });
});
