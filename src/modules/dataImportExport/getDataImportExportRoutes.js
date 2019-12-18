import DataImportExportModule from './DataImportExportModule';
import RouteName from '../../router/RouteName';

const getDataImportExportRoutes = ({
  integration, setRootView, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.DATA_IMPORT_EXPORT,
      path: '/:region/:businessId/dataImportExport/',
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
