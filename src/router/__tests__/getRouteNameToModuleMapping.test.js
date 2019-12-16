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
        action: expect.any(Function),
        title: '🐧',
      },
      freddo: {
        module: routes[1].module,
        action: expect.any(Function),
        title: '🐸',
      },
    });
  });

  it('action calls the module\'s run with context', () => {
    const runs = [];

    const routes = [
      {
        name: 'pingu',
        documentTitle: '🐧',
        module: {
          run: context => runs.push(context),
        },
      },
    ];

    getRouteNameToModuleMapping(routes).pingu.action('🦒');

    expect(runs).toEqual(['🦒']);
  });
});
