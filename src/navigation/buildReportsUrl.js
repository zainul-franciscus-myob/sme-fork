const buildReportsUrl = (baseUrl, routeParams, feature) => {
  const { region, businessId } = routeParams;

  if (feature.routeName === 'reportsPdfStyleTemplates') {
    return `${baseUrl}/#/${region}/${businessId}/pdfStyleTemplates`;
  }

  const reportType = feature.params.type;
  return `${baseUrl}/#/${region}/${businessId}/reports/${reportType}`;
};

export default buildReportsUrl;
