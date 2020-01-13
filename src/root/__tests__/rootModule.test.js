import RootModule from '../rootModule';

describe('rootModule', () => {
  it('can be instantiated', () => {
    const integration = jest.fn();
    const router = jest.fn();
    const root = new RootModule({ integration, router });

    expect(root).toBeDefined();
  });

  describe('when run()', () => {
    const stubFunctionsOn = (...objs) => objs.forEach(
      obj => Object.keys(obj)
        .filter(key => typeof obj[key] === 'function')
      // eslint-disable-next-line no-param-reassign
        .forEach((key) => { obj[key] = jest.fn(); }),
    );

    const createAndRunModule = (...runArgs) => {
      const root = new RootModule({ integration: jest.fn(), router: jest.fn() });
      stubFunctionsOn(root.settingsService, root.nav, root.dispatcher, root.drawer);
      root.run(...runArgs);
      return root;
    };

    describe('runs drawer module', () => {
    // Drawer must run either way since it makes decisions about when to show and hide. When the
    // business id is null, that implies we're changing businesses.
      it('when business id is null', () => {
        const root = createAndRunModule({ routeParams: { businessId: null } }, jest.fn());
        expect(root.drawer.run).toBeCalledTimes(1);
      });
      it('when business id is set', () => {
        const root = createAndRunModule({ routeParams: { businessId: 'id' } }, jest.fn());
        expect(root.drawer.run).toBeCalledTimes(1);
      });
    });
  });
});
