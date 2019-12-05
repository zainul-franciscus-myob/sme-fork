import BankReconciliationModule from './BankReconciliationModule';

const getBankReconciliationRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'bankReconciliation',
      path: '/',
      module: new BankReconciliationModule({ setRootView, integration }),
      documentTitle: 'Bank reconciliation',
    },
  ];

  return routes;
};

export default getBankReconciliationRoutes;
