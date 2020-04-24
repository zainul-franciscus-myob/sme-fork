import isCurrentRoute from '../isCurrentRoute';

describe('isCurrentRoute', () => {
  it('reloads same path', () => {
    const prevPath = '/#/region/businessId/quote';
    const newPath = '/#/region/businessId/quote';

    const actual = isCurrentRoute(prevPath, newPath);

    expect(actual).toEqual(true);
  });

  it('redirects to same path with different query', () => {
    const prevPath = '/#/region/businessId/quote?dateFrom=2010-10-10';
    const newPath = '/#/region/businessId/quote?dateFrom=2011-11-11';

    const actual = isCurrentRoute(prevPath, newPath);

    expect(actual).toEqual(false);
  });

  it('redirects to different path', () => {
    const prevPath = '/#/region/businessId/quote';
    const newPath = '/#/region/businessId/bill';

    const actual = isCurrentRoute(prevPath, newPath);

    expect(actual).toEqual(false);
  });

  it('redirects to parent path', () => {
    const prevPath = '/#/region/businessId/quote/1';
    const newPath = '/#/region/businessId/quote';

    const actual = isCurrentRoute(prevPath, newPath);

    expect(actual).toEqual(false);
  });

  it('redirects to child path', () => {
    const prevPath = '/#/region/businessId/quote';
    const newPath = '/#/region/businessId/quote/1';

    const actual = isCurrentRoute(prevPath, newPath);

    expect(actual).toEqual(false);
  });
});
