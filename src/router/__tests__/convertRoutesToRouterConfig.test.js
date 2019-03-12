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
      {
        name: 'anotherPage',
        rootPath: '/anotherPage',
        subRoutes: [
          {
            name: 'features',
            path: '/features',
          },
        ],
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);
    const expected = [
      {
        name: 'homePage/home',
        path: '/home?parameter1',
      },
      {
        name: 'homePage/features',
        path: '/home/features?featureParam1&featureParam2',
      },
      {
        name: 'homePage/test',
        path: '/home/test',
      },
      {
        name: 'anotherPage/features',
        path: '/anotherPage/features',
      },
    ];

    expect(actual).toEqual(expected);
  });
});
