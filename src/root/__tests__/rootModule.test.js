import RootModule from '../rootModule';

describe('rootModule', () => {
  it('can be instantiated', () => {
    const integration = jest.fn();
    const router = jest.fn();
    const root = new RootModule();
    root.init({ integration, router });

    expect(root).toBeDefined();
  });

  describe('when run()', () => {
    const stubFunctionsOn = (...args) => args.forEach(
      obj => Object.keys(obj)
        .filter(key => typeof obj[key] === 'function')
      // eslint-disable-next-line no-param-reassign
        .forEach((key) => { obj[key] = jest.fn(); }),
    );

    const createAndRunModule = async (routeProps, module, context, lastBusinessId) => {
      const root = new RootModule();
      root.init({
        integration: jest.fn(),
        router: jest.fn(),
        startLeanEngage: jest.fn(),
      });
      stubFunctionsOn(
        root.settingsService,
        root.nav,
        root.dispatcher,
        root.drawer,
        root.integrator,
        root.featureToggles,
      );
      root.last_business_id = lastBusinessId;
      await root.run(routeProps, module, context);
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

    describe('loadSharedInfo', () => {
      it('does not load shared info when business id is not set', async () => {
        const root = await createAndRunModule(buildRouteProps(), buildModule(), context);
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(0);
      });

      it('does not load shared info when business id is the same', async () => {
        const root = await createAndRunModule(buildRouteProps('id'), buildModule(), context, 'id');
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(0);
      });

      it('loads shared info when a different business id is set', async () => {
        const root = await createAndRunModule(buildRouteProps('id'), buildModule(), context);
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(1);
      });
    });

    describe('runLeanEngage', () => {
      it('does not run lean engage when business id is not set', async () => {
        const root = await createAndRunModule(buildRouteProps(), buildModule(), context);
        expect(root.startLeanEngage).toBeCalledTimes(0);
      });

      it('runs lean engage when business id is the same', async () => {
        const root = await createAndRunModule(buildRouteProps('id'), buildModule(), context, 'id');
        expect(root.startLeanEngage).toBeCalledTimes(1);
      });

      it('runs lean engage when a different business id is set', async () => {
        const root = await createAndRunModule(buildRouteProps('id'), buildModule(), context);

        root.integrator.loadSharedInfo.mock.calls[0][0].onSuccess();

        expect(root.startLeanEngage).toBeCalledTimes(1);
      });
    });
  });
});
