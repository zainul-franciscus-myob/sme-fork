import {
  getBusinessUrls,
  getMenuLogoUrl,
  getReportsUrls,
  getSalesUrls,
  getShouldDisplayChangePlan,
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
        route => route !== RouteName.BUSINESS_LIST && route !== RouteName.LINK_USER,
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

  describe('getBusinessUrls', () => {
    it(`build url when enabled features includes ${RouteName.PAYMENT_DETAIL}`, () => {
      const state = {
        routeParams: {
          businessId: '🍟',
        },
        serialNumber: '🍕',
        selfServicePortalUrl: 'https://🦘.com',
        enabledFeatures: [RouteName.PAYMENT_DETAIL],
        currentRouteName: 'payment/paymentDetail',
      };

      const actual = getBusinessUrls(state);

      expect(actual[RouteName.PAYMENT_DETAIL]).toEqual('https://🦘.com/#/paymentProfile?businessId=🍟&serialNumber=🍕');
    });
  });

  describe('getShouldDisplayChangePlan', () => {
    describe('when the user has a paid subscription', () => {
      it('displays the "Subscription details" option', () => {
        const state = { subscriptionType: 'paid' };
        expect(getShouldDisplayChangePlan(state)).toEqual(true);
      });
    });

    describe('when the user does not have a paid subscription', () => {
      it('does not display the "Subscription details" option', () => {
        const state = { subscriptionType: 'trial' };
        expect(getShouldDisplayChangePlan(state)).toEqual(false);
      });
    });
  });

  describe('getReportsUrl', () => {
    [
      {
        routeName: RouteName.REPORTS_PDF_STYLE_TEMPLATES,
        suffix: 'pdfStyleTemplates',
      },
      {
        routeName: RouteName.REPORTS_STANDARD,
        suffix: 'reports/standardReports',
      },
      {
        routeName: RouteName.REPORTS_FAVOURITE,
        suffix: 'reports/favouriteReports',
      },
      {
        routeName: RouteName.REPORTS_CUSTOM,
        suffix: 'reports/customReports',
      },
      {
        routeName: RouteName.REPORTS_EXCEPTION,
        suffix: 'reports/exceptionsReports',
      },
      {
        routeName: RouteName.REPORTS_PACK_BUILDER,
        suffix: 'reports/reportPackBuilder',
      },
    ].forEach((test) => {
      it(`build url when enabled features includes ${test.routeName}`, () => {
        const state = {
          routeParams: {
            businessId: '🍟',
            region: '🇦🇺',
          },
          myReportsUrl: 'https://🐸.com',
          enabledFeatures: [test.routeName],
          currentRouteName: 'reports/reportsPdf',
        };

        const actual = getReportsUrls(state);

        expect(actual[test.routeName]).toEqual(`https://🐸.com/#/🇦🇺/🍟/${test.suffix}`);
      });
    });
  });

  describe('shouldShowPaymentDetail', () => {
    const state = {
      routeParams: {
        businessId: '🍟',
        region: '🇦🇺',
      },
      enabledFeatures: [RouteName.PAYMENT_DETAIL],
      isTrial: false,
    };

    it('shows', () => {
      const actual = getShouldShowPaymentDetail(state);

      expect(actual).toEqual(true);
    });

    it('does not show when no url', () => {
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
    ].forEach(test => {
      it(`false when ${test.name}`, () => {
        const actual = getShouldDisplaySubscriptionNow(test.state);

        expect(actual).toEqual(false);
      });
    });
  });
});
