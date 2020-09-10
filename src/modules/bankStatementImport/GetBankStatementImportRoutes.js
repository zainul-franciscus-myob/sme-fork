import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBankStatementImportRoutes = () => [
  {
    name: RouteName.BANK_STATEMENT_IMPORT_LIST,
    path: '/:region/:businessId/bankStatementImport/',
    loadModule: () =>
      import('./bankStatementImportList/BankStatementImportListModule'),
    documentTitle: 'Bank statement import',
  },
];

export default getBankStatementImportRoutes;
