import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getDataImportExportRoutes = () => [
  {
    name: RouteName.DATA_IMPORT_EXPORT,
    path: '/:region/:businessId/dataImportExport/',
    allowedParams: ['importType', 'exportType'],
    loadModule: () => import('./DataImportExportModule'),
    documentTitle: 'Import/export data',
  },
];

export default getDataImportExportRoutes;
