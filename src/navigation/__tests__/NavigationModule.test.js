import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from '../NavigationIntents';
import ModuleAction from '../../common/types/ModuleAction';
import NavigationModule from '../NavigationModule';
import RouteName from '../../router/RouteName';
import TestStore from '../../store/TestStore';
import navReducer from '../navReducer';

describe('Navigation Module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseData = {
    routeParams: {
      businessId: '🍟',
      region: '🇦🇺',
    },
  };
  const action = { [ModuleAction.LOAD_BUSINESS]: true };

  const integrationIntents = [];
  const navigationModule = new NavigationModule({
    constructPath: (
      routeName,
      { region = undefined, businessId = undefined } = {}
    ) =>
      `${region ?? baseData.routeParams.region}/${
        businessId ?? baseData.routeParams.businessId
      }/${routeName}`,
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
      MYOB_URL: 'myob.url',
    },
    isToggleOn: () => true,
    recordPageVisit: jest.fn(),
    trackUserEvent: jest.fn(),
    navigateTo: jest.fn(),
    toggleHelp: jest.fn(),
    toggleTasks: jest.fn(),
  });

  const store = new TestStore(navReducer);
  navigationModule.store = store;

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
        navigationModule.run({ routeProps: data });
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
        navigationModule.run({ routeProps: data, action });
        expect(integrationIntents).toEqual([LOAD_NAVIGATION_CONFIG]);
      });
    });

    describe('building and setting routing info', () => {
      it('delegates to the router to construct most routes', () => {
        navigationModule.run({ routeProps: baseData, action });
        const state = navigationModule.store.getState();
        expect(state.urls.invoiceList).toEqual('/#🇦🇺/🍟/invoice/invoiceList');
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
          navigationModule.run({ routeProps: baseData });

          const state = navigationModule.store.getState();

          expect(state.urls[test.routeName]).toEqual(
            `my-reports.url/#/🇦🇺/🍟/${test.suffix}`
          );
        });
      });

      it('builds a URL for paymentDetail', () => {
        navigationModule.run({ routeProps: baseData });

        const state = navigationModule.store.getState();

        expect(state.urls[RouteName.PAYMENT_DETAIL]).toEqual(
          'self-service-portal.url/#/billingAndPayments?businessId=🍟'
        );
      });

      it('builds a URL for productManagementDetail', () => {
        navigationModule.run({ routeProps: baseData });

        const state = navigationModule.store.getState();

        expect(state.urls[RouteName.PRODUCT_MANAGEMENT_DETAIL]).toEqual(
          'myob.url/manage-my-product?businessId=🍟'
        );
      });
    });

    describe('when user clicks on Create new business', () => {
      it('sends telemetry info with expected payload', () => {
        const data = {
          routeParams: {
            businessId: 'businessId',
          },
          currentRouteName: 'someUrl',
        };
        navigationModule.run({ routeProps: data });
        navigationModule.createBusiness();

        expect(navigationModule.recordPageVisit).toHaveBeenCalledTimes(1);
        expect(navigationModule.recordPageVisit).toBeCalledWith(
          expect.objectContaining({
            currentRouteName: 'createNewBusiness',
            telemetryData: {
              businessId: 'businessId',
            },
          })
        );
      });
    });

    describe('when user clicks on manage my product', () => {
      const data = {
        routeParams: {
          businessId: 'businessId',
        },
        currentRouteName: 'someUrl',
      };

      it('sends user event telemetry info with expected payload', () => {
        navigationModule.store.setState({
          ...navigationModule.store.getState(),
          userEmail: 'abc',
        });
        navigationModule.run({ routeProps: data });
        navigationModule.manageMyProduct();

        expect(navigationModule.trackUserEvent).toHaveBeenCalledTimes(1);
        expect(navigationModule.trackUserEvent).toBeCalledWith(
          expect.objectContaining({
            eventName: 'manageMyProduct',
            eventProperties: {
              businessId: 'businessId',
              userEmail: 'abc',
              timestamp: expect.any(Number),
            },
          })
        );
      });

      it('opens manage my product page in new tab', () => {
        navigationModule.run({ routeProps: data });
        navigationModule.manageMyProduct();

        expect(navigationModule.navigateTo).toHaveBeenCalledTimes(1);
        expect(navigationModule.navigateTo).toBeCalledWith(
          'myob.url/manage-my-product?businessId=businessId',
          true
        );
      });
    });
  });
});
