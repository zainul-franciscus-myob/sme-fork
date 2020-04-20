import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from '../NavigationIntents';
import NavigationModule from '../NavigationModule';
import RouteName from '../../router/RouteName';

describe('Navigation Module', () => {
  const baseData = {
    routeParams: {
      businessId: '🍟',
      region: '🇦🇺',
    },
  };

  const integrationIntents = [];
  const navigationModule = new NavigationModule({
    constructPath: (routeName, { region, businessId }) => `${region}/${businessId}/${routeName}`,
    integration: {
      read: ({ intent, onSuccess }) => {
        integrationIntents.push(intent);
        onSuccess({
          region: '🇦🇺',
        });
      },
    },
    replaceURLParamsAndReload: () => {},
    config: {
      MY_REPORTS_URL: 'my-reports.url',
      SELF_SERVICE_PORTAL_URL: 'self-service-portal.url',
    },
    setNavigationView: () => {},
  });

  describe('run', () => {
    describe('when the business ID has not changed', () => {
      beforeEach(() => {
        navigationModule.store.dispatch({
          intent: SET_ROUTE_INFO,
          routeParams: {
            businessId: 'a',
          },
        });
      });
      it('does not reload the business info', () => {
        const data = {
          routeParams: {
            businessId: 'a',
          },
          currentRouteName: 'someUrl',
        };
        navigationModule.run(data);
        expect(integrationIntents).toEqual([]);
      });
    });

    describe('when the business ID has changed', () => {
      beforeEach(() => {
        navigationModule.store.dispatch({
          intent: SET_ROUTE_INFO,
          routeParams: {
            businessId: 'a',
          },
        });
      });

      it('reloads the business info', () => {
        const data = {
          routeParams: {
            businessId: 'b',
          },
          currentRouteName: 'someUrl',
        };
        navigationModule.run(data);
        expect(integrationIntents).toEqual([LOAD_NAVIGATION_CONFIG]);
      });
    });

    describe('building and setting routing info', () => {
      it('delegates to the router to construct most routes', () => {
        navigationModule.run(baseData);
        const state = navigationModule.store.getState();
        expect(state.urls.invoiceList)
          .toEqual('/#🇦🇺/🍟/invoice/invoiceList');
      });

      const reportsRoutes = [
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
      ];

      reportsRoutes.forEach((test) => {
        it(`uses the report URL base to build a URL for ${test.routeName}`, () => {
          navigationModule.run(baseData);

          const state = navigationModule.store.getState();

          expect(state.urls[test.routeName])
            .toEqual(`my-reports.url/#/🇦🇺/🍟/${test.suffix}`);
        });
      });

      it('builds a URL for paymentDetail', () => {
        navigationModule.run(baseData);

        const state = navigationModule.store.getState();

        expect(state.urls[RouteName.PAYMENT_DETAIL])
          .toEqual('self-service-portal.url/#/paymentProfile?businessId=🍟');
      });
    });
  });
});
