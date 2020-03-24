import {
  getMenuLogoUrl,
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
    ].forEach(test => {
      it(`false when ${test.name}`, () => {
        const actual = getShouldDisplaySubscriptionNow(test.state);

        expect(actual).toEqual(false);
      });
    });
  });
});
