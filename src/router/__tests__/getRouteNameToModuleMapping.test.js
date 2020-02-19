import getRouteNameToModuleMapping from '../getRouteNameToModuleMapping';

describe('getRouteNameToModuleMapping', () => {
  it('map routes to object with routeName as key', () => {
    const routes = [
      {
        name: 'pingu',
        documentTitle: '🐧',
        module: {
          run: () => '🐧',
        },
      },
      {
        name: 'freddo',
        documentTitle: '🐸',
        module: {
          run: () => '🐸',
        },
      },
    ];

    const actual = getRouteNameToModuleMapping(routes);

    expect(actual).toEqual({
      pingu: {
        module: routes[0].module,
        title: '🐧',
      },
      freddo: {
        module: routes[1].module,
        title: '🐸',
      },
    });
  });
});
