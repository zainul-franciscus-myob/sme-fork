import BankReconciliationModule from './BankReconciliationModule';
import RouteName from '../../router/RouteName';

const getBankReconciliationRoutes = ({ setRootView, integration }) => {
  const routes = [
    {
      name: RouteName.BANK_RECONCILIATION,
      path: '/:region/:businessId/bankReconciliation/',
      module: new BankReconciliationModule({ setRootView, integration }),
      documentTitle: 'Bank reconciliation',
    },
  ];

  return routes;
};

export default getBankReconciliationRoutes;
