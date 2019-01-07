import getRouteNameToModuleMapping from '../getRouteNameToModuleMapping';

describe('getRouteNameToModuleMapping', () => {
  class Module {}

  it('should convert a routes array into a mapping between a route name and a module / action', () => {
    const homeModule = new Module();
    const featuresModule = new Module();

    const routes = [
      {
        name: 'homePage',
        rootPath: '/home',
        subRoutes: [
          {
            name: 'home',
            path: '/',
            module: homeModule,
          },
          {
            name: 'features',
            path: '/features',
            module: featuresModule,
          },
        ],
      },
    ];

    const actual = getRouteNameToModuleMapping(routes);

    const expected = {
      homePage: {
        module: homeModule,
        action: expect.any(Function),
      },
      'homePage.features': {
        module: featuresModule,
        action: expect.any(Function),
      },
    };

    expect(actual).toEqual(expected);
  });
});
