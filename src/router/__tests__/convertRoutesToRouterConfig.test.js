import convertRoutesToRouterConfig from '../convertRoutesToRouterConfig';

describe('convertRoutesToRouterConfig', () => {
  class Module {}

  it('should convert a routes array into a router config', () => {
    const module = new Module();

    const routes = [
      {
        name: 'homePage',
        rootPath: '/home',
        subRoutes: [
          {
            name: 'home',
            path: '/',
            module,
          },
          {
            name: 'features',
            path: '/features',
            module,
          },
        ],
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    const expected = [
      {
        name: 'homePage',
        path: '/home',
        children: [
          {
            name: 'features',
            path: '/features',
          },
        ],
      },
    ];

    expect(actual).toEqual(expected);
  });
});
