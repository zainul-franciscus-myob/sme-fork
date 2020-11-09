import {
  getMenuLogoUrl,
  getSalesUrls,
  getShouldDisplayAccountingMenu,
  getShouldDisplayPayrollMenu,
  getShouldDisplayPayrollNzMenu,
  getShouldDisplaySubscriptionNow,
  getShouldShowPaymentDetail,
  getShowUrls,
  noOpRouteNames,
} from '../NavigationSelectors';
import RouteName from '../../router/RouteName';

describe('NavigationSelectors', () => {
  describe('getShowUrls', () => {
    it('should return false if the current route is the link user page', () => {
      const state = {
        currentRouteName: RouteName.LINK_USER,
      };
      const actual = getShowUrls(state);
      expect(actual).toEqual(false);
    });

    it('should return false if the current route is the business list page', () => {
      const state = {
        currentRouteName: RouteName.BUSINESS_LIST,
      };
      const actual = getShowUrls(state);
      expect(actual).toEqual(false);
    });

    it('should return true if the current route is any other page', () => {
      const routes = Object.values(RouteName).filter(
        (route) =>
          route !== RouteName.BUSINESS_LIST && route !== RouteName.LINK_USER
      );
      routes.forEach((route) => {
        const state = {
          currentRouteName: route,
        };

        const actual = getShowUrls(state);
        expect(actual).toEqual(true);
      });
    });
  });

  describe('getEnabledUrls', () => {
    it('should not build enabled urls if urls are empty', () => {
      const state = {
        routeParams: {
          businessId: '',
          region: '',
        },
        enabledFeatures: ['reportsSomething'],
        currentRouteName: noOpRouteNames[0],
      };

      const actual = getSalesUrls(state);

      Object.keys(actual).forEach((key) => {
        expect(actual[key]).toEqual(undefined);
      });
    });

    it('should not return recurring transaction sales list url if feature toggle is off', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: false,
        enabledFeatures: ['recurringTransactionSalesList'],
        urls: { recurringTransactionSalesList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getSalesUrls(state);
      expect(actual.recurringTransactionSalesList).toBeUndefined();
    });

    it('should return recurring transaction sales list url if feature toggle is on and feature is returned as enabled from bff', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: true,
        enabledFeatures: ['recurringTransactionSalesList'],
        urls: { recurringTransactionSalesList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getSalesUrls(state);
      expect(actual.recurringTransactionSalesList).toBeDefined();
    });
  });

  describe('getMenuLogoUrl', () => {
    it('should return current url if current route name is no op', () => {
      const state = {
        currentRouteName: noOpRouteNames[0],
        routeParams: {
          businessId: 'businessId',
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(currentUrl);
    });

    it('should return dashboardUrl if current route name is operational', () => {
      const businessId = 'businessId';
      const currentRouteName = 'bills';
      const state = {
        currentRouteName,
        routeParams: {
          businessId,
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(`#/au/${businessId}/dashboard`);
    });
  });

  describe('shouldShowPaymentDetail', () => {
    const state = {
      routeParams: {
        businessId: '🍟',
        region: '🇦🇺',
      },
      urls: {
        [RouteName.PAYMENT_DETAIL]: 'payment-detail-url',
      },
      enabledFeatures: [RouteName.PAYMENT_DETAIL],
      isTrial: false,
    };

    it('shows by default', () => {
      const actual = getShouldShowPaymentDetail(state);

      expect(actual).toEqual(true);
    });

    it('does not show when it is not enabled', () => {
      const modifiedState = {
        ...state,
        enabledFeatures: [],
      };

      const actual = getShouldShowPaymentDetail(modifiedState);

      expect(actual).toEqual(false);
    });

    it('does not show when is trial', () => {
      const modifiedState = {
        ...state,
        isTrial: true,
      };

      const actual = getShouldShowPaymentDetail(modifiedState);

      expect(actual).toEqual(false);
    });
  });

  describe('shouldDisplaySubscriptionNow', () => {
    const state = {
      routeParams: {
        businessId: '🍟',
      },
      trialEndDate: '2020-02-02',
    };

    it('true when is a trial business', () => {
      const actual = getShouldDisplaySubscriptionNow(state);

      expect(actual).toEqual(true);
    });

    [
      {
        name: 'no businessId',
        state: {
          ...state,
          routeParams: {
            businessId: undefined,
          },
        },
      },
      {
        name: 'no trial end date',
        state: {
          ...state,
          trialEndDate: undefined,
        },
      },
    ].forEach((test) => {
      it(`false when ${test.name}`, () => {
        const actual = getShouldDisplaySubscriptionNow(test.state);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('getShouldDisplayPayrollNzMenu', () => {
    const state = {
      routeParams: {
        region: 'nz',
      },
      enabledFeatures: ['employeeListNz'],
      urls: { employeeListNz: 'employee' },
    };

    it('true when region is nz', () => {
      const actual = getShouldDisplayPayrollNzMenu(state);
      expect(actual).toEqual(true);
    });

    it('false when region is not nz', () => {
      const updatedState = {
        ...state,
        routeParams: { region: '🇦🇺' },
      };
      const actual = getShouldDisplayPayrollNzMenu(updatedState);
      expect(actual).toEqual(false);
    });
  });

  describe('getShouldDisplayAccountingMenu', () => {
    const state = {
      routeParams: {
        region: 'au',
      },
      enabledFeatures: ['generalJournalCreate'],
      urls: {
        generalJournalCreate: 'general-journal-create',
      },
      isLoading: false,
    };

    it('true when region is au', () => {
      const actual = getShouldDisplayAccountingMenu(state);
      expect(actual).toEqual(true);
    });

    it('false when region is not au', () => {
      const updatedState = {
        ...state,
        routeParams: { region: 'nz' },
      };
      const actual = getShouldDisplayAccountingMenu(updatedState);
      expect(actual).toEqual(false);
    });
  });

  describe('getShouldDisplayPayrollMenu', () => {
    const state = {
      routeParams: {
        region: 'au',
      },
      enabledFeatures: ['employeeList'],
      urls: { employeeList: 'employee' },
    };

    it('true when region is au', () => {
      const actual = getShouldDisplayPayrollMenu(state);
      expect(actual).toEqual(true);
    });

    it('false when region is not au', () => {
      const updatedState = {
        ...state,
        routeParams: { region: '' },
      };

      const actual = getShouldDisplayPayrollMenu(updatedState);
      expect(actual).toEqual(false);
    });
  });
});
