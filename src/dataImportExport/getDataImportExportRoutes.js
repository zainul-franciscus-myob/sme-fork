import DataImportExportModule from './DataImportExportModule';

const getDataImportExportRoutes = ({
  integration, setRootView, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'dataImportExport',
      path: '/',
      allowedParams: ['importType', 'exportType'],
      module: new DataImportExportModule({
        integration, setRootView, replaceURLParams,
      }),
      documentTitle: 'Import/export data',
    },
  ];

  return routes;
};

export default getDataImportExportRoutes;
