import buildReportsUrl from '../buildReportsUrl';

describe('buildReportsUrl', () => {
  it.each([
    'reportsStandard',
    'reportsFavourite',
    'reportsCustom',
    'reportsException',
    'reportsPackBuilder',
  ])('should build the Reports Url with "reports" as the base route', (routeName) => {
    const baseUrl = 'baseReportsUrl';
    const routeParams = {
      region: 'au',
      businessId: '123',
    };
    const feature = {
      routeName,
      params: {
        type: 'someReportType',
      },
    };

    const actual = buildReportsUrl(baseUrl, routeParams, feature);
    const expected = 'baseReportsUrl/#/au/123/reports/someReportType';

    expect(actual).toEqual(expected);
  });

  it('should build the Reports Url without "reports" in the base route', () => {
    const baseUrl = 'baseReportsUrl';
    const routeParams = {
      region: 'au',
      businessId: '123',
    };

    const feature = {
      routeName: 'reportsPdfStyleTemplates',
    };


    const actual = buildReportsUrl(baseUrl, routeParams, feature);
    const expected = 'baseReportsUrl/#/au/123/pdfStyleTemplates';

    expect(actual).toEqual(expected);
  });
});
