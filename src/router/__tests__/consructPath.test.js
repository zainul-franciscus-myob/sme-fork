import Router from '../Router';

describe('Router.constructPath', () => {
  const defaultRoute = Object.freeze({
    name: 'tests/default',
    path: '/default',
    module: { run() {} },
    documentTitle: 'Testing router.constructPath()',
  });

  const route = Object.freeze({
    name: 'tests/construct-path',
    path: '/:region/:businessId/testing?param',
    module: { run() {} },
    documentTitle: 'Testing router.constructPath()',
  });

  const createRouter = (region, businessId) => {
    const router = new Router({ defaultRoute: defaultRoute.name });
    router.start({
      rootModule: { run() {} },
      afterAll() {},
      beforeAll() {},
      container: {},
      routes: [defaultRoute, route],
    });
    router.router.setState({
      name: defaultRoute.name,
      path: defaultRoute.path,
      params: { region, businessId },
    });
    return router;
  };

  it('automatically supplies region from existing state', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name);
    expect(path).toContain('/custom-region/');
  });

  it('overwrites region when provided', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name, { region: 'my-new-region' });
    expect(path).toContain('/my-new-region/');
  });

  it('automatically supplies business ID from existing state', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name);
    expect(path).toContain('/custom-business-id/');
  });

  it('overwrites business ID when provided', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name, {
      region: 'my-new-business-id',
    });
    expect(path).toContain('/my-new-business-id/');
  });

  it('omits known query params when not provided', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name);
    expect(path).not.toContain('?');
  });

  it('set known query params when provided', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name, {
      param: 'my-custom-param',
    });
    expect(path).toContain('?param=my-custom-param');
  });

  it('ignores unknown query params when provided', () => {
    const router = createRouter('custom-region', 'custom-business-id');
    const path = router.constructPath(route.name, {
      'unknown-query-param': "shouldn't show",
    });
    expect(path).not.toContain('unknown-query-param');
    expect(path).not.toContain("shouldn't show");
  });
});
