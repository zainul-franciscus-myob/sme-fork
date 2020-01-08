import buildPreviousRoute from '../buildPreviousRoute';

describe('buildPreviousRoute', () => {
  it('should handle no previous route', () => {
    const prevRoute = buildPreviousRoute({}, null);
    expect(prevRoute).toBeNull();
  });

  it('should build url correctly', () => {
    const routerPrevRoute = { name: 'route', params: {} };
    const buildUrlResult = '/route/part';
    const router = {
      buildUrl() { return buildUrlResult; },
    };
    const prevRoute = buildPreviousRoute(router, routerPrevRoute);
    expect(prevRoute).toEqual({
      ...routerPrevRoute,
      url: window.location.origin + buildUrlResult,
    });
  });
});
