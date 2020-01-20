import {
  getBusinessUrls, getMenuLogoUrl, getReportsUrls, isLinkUserPage, noOpRouteNames,
} from '../NavigationSelectors';
import RouteName from '../../router/RouteName';

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

  describe('getBusinessUrls', () => {
    it(`build url when enabled features includes ${RouteName.PAYMENT_DETAIL}`, () => {
      const state = {
        routeParams: {
          businessId: '🍟',
        },
        serialNumber: '🍕',
        selfServicePortalUrl: 'https://🦘.com',
        enabledFeatures: [RouteName.PAYMENT_DETAIL],
      };

      const actual = getBusinessUrls(state);

      expect(actual[RouteName.PAYMENT_DETAIL]).toEqual('https://🦘.com/#/paymentProfile?businessId=🍟&serialNumber=🍕');
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
        };

        const actual = getReportsUrls(state);

        expect(actual[test.routeName]).toEqual(`https://🐸.com/#/🇦🇺/🍟/${test.suffix}`);
      });
    });
  });
});
