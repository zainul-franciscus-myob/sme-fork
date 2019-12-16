import RouteName from '../router/RouteName';

const buildReportsUrl = (baseUrl, routeParams, feature) => {
  const { region, businessId } = routeParams;

  if (feature.routeName === RouteName.REPORTS_PDF_STYLE_TEMPLATES) {
    return `${baseUrl}/#/${region}/${businessId}/pdfStyleTemplates`;
  }

  const reportType = feature.params.type;
  return `${baseUrl}/#/${region}/${businessId}/reports/${reportType}`;
};

export default buildReportsUrl;
