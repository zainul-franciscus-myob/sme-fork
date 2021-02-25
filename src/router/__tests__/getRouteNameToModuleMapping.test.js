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
        isMaximisedModule: true,
      },
      {
        name: 'freddo',
        documentTitle: '🐸',
        loadModule: () =>
          Promise.resolve({
            run: () => '🐸',
          }),
      },
    ];

    const actual = getRouteNameToModuleMapping(routes);

    expect(actual).toEqual({
      pingu: {
        module: routes[0].module,
        title: '🐧',
        isMaximisedModule: true,
      },
      freddo: {
        loadModule: routes[1].loadModule,
        title: '🐸',
        isMaximisedModule: false,
      },
    });
  });
});
