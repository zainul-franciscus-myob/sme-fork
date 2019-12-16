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
        path: '/freddo',
      },
      {
        name: '🐧',
        path: '/pingu',
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

    expect(actual[0].path).toEqual('/freddo?🐄');
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

    expect(actual[0].path).toEqual('/freddo?🐄&🐑');
  });

  it('removes trailing slash from path', () => {
    const routes = [
      {
        name: '🐸',
        path: '/freddo/',
      },
    ];

    const actual = convertRoutesToRouterConfig(routes);

    expect(actual[0].path).toEqual('/freddo');
  });
});
