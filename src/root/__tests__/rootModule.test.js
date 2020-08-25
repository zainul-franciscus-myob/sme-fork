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
    const stubFunctionsOn = (...args) =>
      args.forEach((obj) =>
        Object.keys(obj)
          .filter((key) => typeof obj[key] === 'function')
          .forEach((key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = jest.fn();
          })
      );

    const createModule = (lastBusinessId) => {
      const root = new RootModule();
      root.init({
        integration: jest.fn(),
        router: {
          navigateTo: jest.fn(),
        },
        startLeanEngage: jest.fn(),
        sendTelemetryEvent: jest.fn(),
      });
      stubFunctionsOn(
        root.settingsService,
        root.businessDetailsService,
        root.nav,
        root.dispatcher,
        root.drawer,
        root.integrator
      );
      root.last_business_id = lastBusinessId;
      return root;
    };

    const createAndRunModule = async (
      routeProps,
      module,
      context,
      lastBusinessId
    ) => {
      const root = createModule(lastBusinessId);
      await root.run(routeProps, module, context);
      return root;
    };

    const buildRouteProps = (businessId) => ({
      routeParams: { businessId },
      currentRouteName: 'some/route',
    });
    const buildModule = () => ({ resetState: jest.fn(), run: jest.fn() });
    const context = { businessId: '🌶', region: 'au' };

    it('does not redirect to error on success', async () => {
      const root = await createAndRunModule(
        buildRouteProps('id'),
        buildModule(),
        context
      );

      expect(root.navigateTo).not.toHaveBeenCalledWith(
        expect.stringContaining('/error')
      );
    });

    describe('subscription', () => {
      it('navigates to error on failure', async () => {
        const root = createModule();
        root.integrator.loadSubscription = jest.fn().mockRejectedValue();

        await root.run(buildRouteProps('id'), buildModule(), context);

        expect(root.navigateTo).toHaveBeenCalledWith(
          expect.stringContaining('/error')
        );
      });
    });

    describe('settings', () => {
      it('navigates to error on failure', async () => {
        const root = createModule();
        root.settingsService.load = jest.fn().mockRejectedValue();

        await root.run(buildRouteProps('id'), buildModule(), context);

        expect(root.navigateTo).toHaveBeenCalledWith(
          expect.stringContaining('/error')
        );
      });
    });

    describe('tasks', () => {
      it('navigates to error on failure', async () => {
        const root = createModule();
        root.settingsService.load = jest.fn().mockRejectedValue();

        await root.run(buildRouteProps('id'), buildModule(), context);

        expect(root.navigateTo).toHaveBeenCalledWith(
          expect.stringContaining('/error')
        );
      });
    });

    describe('business details', () => {
      it('navigates to error on failure', async () => {
        const root = createModule();
        root.businessDetailsService.load = jest.fn().mockRejectedValue();

        await root.run(buildRouteProps('id'), buildModule(), context);

        expect(root.navigateTo).toHaveBeenCalledWith(
          expect.stringContaining('/error')
        );
      });
    });

    describe('runs drawer module', () => {
      // Drawer must run either way since it makes decisions about when to show and hide. When the
      // business id is null, that implies we're changing businesses.
      it('when business id is null', async () => {
        const root = await createAndRunModule(
          buildRouteProps(),
          buildModule(),
          context
        );
        expect(root.drawer.run).toBeCalledTimes(1);
      });

      it('when business id is set', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context
        );
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
        const root = await createAndRunModule(
          buildRouteProps(),
          buildModule(),
          context
        );
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(0);
      });

      it('does not load shared info when business id is the same', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context,
          'id'
        );
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(0);
      });

      it('loads shared info when a different business id is set', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context
        );
        expect(root.integrator.loadSharedInfo).toBeCalledTimes(1);
      });

      it('navigates to error on failure', async () => {
        const root = createModule();
        root.integrator.loadSharedInfo = jest.fn().mockRejectedValue();

        await root.run(buildRouteProps('id'), buildModule(), context);

        expect(root.navigateTo).toHaveBeenCalledWith(
          expect.stringContaining('/error')
        );
      });
    });

    describe('runLeanEngage', () => {
      it('does not run lean engage when business id is not set', async () => {
        const root = await createAndRunModule(
          buildRouteProps(),
          buildModule(),
          context
        );
        expect(root.startLeanEngage).toBeCalledTimes(0);
      });

      it('runs lean engage when business id is the same', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context,
          'id'
        );
        expect(root.startLeanEngage).toBeCalledTimes(1);
      });

      it('runs lean engage when a different business id is set', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context
        );

        expect(root.startLeanEngage).toBeCalledTimes(1);
      });
    });

    describe('runTelemetry', () => {
      it('when business id is null', async () => {
        const root = await createAndRunModule(
          buildRouteProps(),
          buildModule(),
          context
        );
        expect(root.sendTelemetryEvent).toBeCalledTimes(1);
      });

      it('when business id is set and is the same as last business id', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context,
          'id'
        );
        expect(root.sendTelemetryEvent).toBeCalledTimes(1);
      });

      it('when business id is set and is different from last business id', async () => {
        const root = await createAndRunModule(
          buildRouteProps('id'),
          buildModule(),
          context
        );

        expect(root.sendTelemetryEvent).toBeCalledTimes(1);
      });
    });
  });
});
