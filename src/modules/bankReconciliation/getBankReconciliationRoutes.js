import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBankReconciliationRoutes = () => [
  {
    name: RouteName.BANK_RECONCILIATION,
    path: '/:region/:businessId/bankReconciliation/',
    loadModule: () => import('./BankReconciliationModule'),
    documentTitle: 'Bank reconciliation',
  },
];

export default getBankReconciliationRoutes;
