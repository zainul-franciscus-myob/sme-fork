import {
  getMenuLogoUrl, isLinkUserPage, noOpRouteNames,
} from '../NavigationSelectors';

describe('NavigationSelectors', () => {
  describe('isLinkUserPage', () => {
    it('should return true if the current route is the link user page', () => {
      const currentRouteName = 'linkUser/linkUser';
      const actual = isLinkUserPage({ currentRouteName });
      expect(actual).toEqual(true);
    });

    it('should return false if the current route is the spend money detail page', () => {
      const currentRouteName = 'spendMoney/spendMoneyDetail';
      const actual = isLinkUserPage({ currentRouteName });
      expect(actual).toEqual(false);
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
});
