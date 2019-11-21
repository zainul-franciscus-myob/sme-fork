import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from '../NavigationIntents';
import NavigationModule from '../NavigationModule';

describe('Navigation Module', () => {
  const integrationIntents = [];
  const navigationModule = new NavigationModule({
    constructPath: () => '',
    integration: {
      read: ({ intent }) => integrationIntents.push(intent),
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
  });
});
