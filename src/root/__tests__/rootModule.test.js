import RootModule from '../rootModule';

describe('rootModule', () => {
  it('can be instantiated', () => {
    const integration = jest.fn();
    const router = jest.fn();
    const root = new RootModule({ integration, router });

    expect(root).toBeDefined();
  });

  describe('when run()', () => {
    const stubFunctionsOn = (...args) => args.forEach(
      obj => Object.keys(obj)
        .filter(key => typeof obj[key] === 'function')
      // eslint-disable-next-line no-param-reassign
        .forEach((key) => { obj[key] = jest.fn(); }),
    );

    const createAndRunModule = async (...runArgs) => {
      const root = new RootModule({
        integration: jest.fn(),
        router: jest.fn(),
      });
      stubFunctionsOn(
        root.settingsService,
        root.nav,
        root.dispatcher,
        root.drawer,
        root.integrator,
      );
      await root.run(...runArgs);
      return root;
    };

    const buildRouteProps = businessId => ({ routeParams: { businessId }, currentRouteName: 'some/route' });
    const buildModule = () => ({ resetState: jest.fn(), run: jest.fn() });
    const context = {};


    describe('runs drawer module', () => {
    // Drawer must run either way since it makes decisions about when to show and hide. When the
    // business id is null, that implies we're changing businesses.
      it('when business id is null', async () => {
        const root = await createAndRunModule(buildRouteProps(), buildModule(), context);
        expect(root.drawer.run).toBeCalledTimes(1);
      });

      it('when business id is set', async () => {
        const root = await createAndRunModule(buildRouteProps('id'), buildModule(), context);
        expect(root.drawer.run).toBeCalledTimes(1);
      });
    });

    describe('runs feature module', () => {
      it('reset state', async () => {
        const module = buildModule();
        await createAndRunModule(buildRouteProps(), module, context);
        expect(module.resetState).toBeCalledTimes(1);
      });

      it('run feature module', async () => {
        const module = buildModule();
        await createAndRunModule(buildRouteProps(), module, context);
        expect(module.run).toBeCalledTimes(1);
      });
    });
  });
});
