import {
  LOAD_SALES_SETTINGS,
  SET_TAB,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../../SalesSettingsIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { mainTabIds } from '../tabItems';
import salesSettingsDetailReducer from '../salesSettingsDetailReducer';

describe('salesSettingsReducer', () => {
  const reducer = salesSettingsDetailReducer;

  describe('setInitialState', () => {
    const action = {
      intent: SET_INITIAL_STATE,
      context: {
        businessId: '🦖',
        region: '🦕',
        selectedTab: mainTabIds.templates,
      },
    };

    describe('puts context into state', () => {
      const actual = reducer({}, action);

      expect(actual).toEqual({
        businessId: '🦖',
        region: '🦕',
        selectedTab: mainTabIds.templates,
      });
    });

    describe(`use ${mainTabIds.layoutAndTheme} when unknown selectedTab`, () => {
      const modifiedAction = {
        ...action,
        context: {
          ...action.context,
          selectedTab: '🐛',
        },
      };

      const actual = reducer({}, modifiedAction);

      expect(actual.selectedTab).toEqual(mainTabIds.layoutAndTheme);
    });
  });

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
    it.each([
      ['salesSettings', 'layoutAndTheme'],
      ['salesSettings', 'payments'],
      ['emailSettings', 'emailDefaults'],
    ])('set tabData to %s when selectedTab is %s', (dataKey, tabId) => {
      const state = {
        selectedTab: tabId,
        tabData: {},
      };
      const action = {
        intent: LOAD_SALES_SETTINGS,
        [dataKey]: {
          some: 'settings',
        },
      };

      const actual = reducer(state, action);

      expect(actual).toEqual({
        [dataKey]: {
          some: 'settings',
        },
        selectedTab: tabId,
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
