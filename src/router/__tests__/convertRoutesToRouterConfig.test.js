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
            allowedParams: ['parameter1'],
          },
          {
            name: 'features',
            path: '/features',
            module,
            allowedParams: ['featureParam1', 'featureParam2'],
          },
          {
            name: 'test',
            path: '/test',
            module,
          },
        ],
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    const expected = [
      {
        name: 'homePage',
        path: '/home?parameter1',
        children: [
          {
            name: 'features',
            path: '/features?featureParam1&featureParam2',
          },
          {
            name: 'test',
            path: '/test',
          },
        ],
      },
    ];

    expect(actual).toEqual(expected);
  });
});
