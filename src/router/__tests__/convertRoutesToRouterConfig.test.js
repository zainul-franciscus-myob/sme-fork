import convertRoutesToRouterConfig from '../convertRoutesToRouterConfig';

describe('convertRoutesToRouterConfig', () => {
  it('maps routes to router config', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo',
        otherStuff: '',
      },
      {
        name: '🐧',
        path: '/pingu',
        otherStuff: '',
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    expect(actual).toEqual([
      {
        name: '🐸',
        path: '/freddo?appcue',
      },
      {
        name: '🐧',
        path: '/pingu?appcue',
      },
    ]);
  });

  it('includes multiple allowed params in path', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo',
        allowedParams: ['🐄'],
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    expect(actual[0].path).toEqual('/freddo?🐄&appcue');
  });

  it('includes multiple allowed params in path', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo',
        allowedParams: ['🐄', '🐑'],
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    expect(actual[0].path).toEqual('/freddo?🐄&🐑&appcue');
  });

  it('removes trailing slash from path', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo/',
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    expect(actual[0].path).toEqual('/freddo?appcue');
  });

  it('allows the passing of defaultParameters', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo',
        defaultParams: { region: '🌏' },
      },
    ];
    const actual = convertRoutesToRouterConfig(routes);

    expect(actual[0].defaultParams).toEqual({ region: '🌏' });
  });
});
