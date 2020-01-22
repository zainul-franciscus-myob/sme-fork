import BankStatementImportListModule from './bankStatementImportList/BankStatementImportListModule';
import RouteName from '../../router/RouteName';

const getBankStatementImportRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.BANK_STATEMENT_IMPORT_LIST,
      path: '/:region/:businessId/bankStatementImport/',
      module: new BankStatementImportListModule({
        integration, setRootView,
      }),
      documentTitle: 'Bank statement import',
    },
  ];

  return routes;
};

export default getBankStatementImportRoutes;
