import RouteName from '../../router/RouteName';

/** @type {import("../module-types").RouteConfig} */
const getBankingRoutes = () => [
  {
    name: RouteName.BANKING_TRANSACTION_LIST,
    path: '/:region/:businessId/banking/',
    allowedParams: [
      'transactionType',
      'dateFrom',
      'dateTo',
      'bankAccount',
      'keywords',
    ],
    loadModule: () => import('./BankingModule'),
    documentTitle: 'Bank feed transactions',
  },
  {
    name: RouteName.ONBOARDING_LEARN_BANKING,
    path: '/:region/:businessId/banking/learn',
    loadModule: () => import('./bankingLearn/bankingLearnModule'),
    documentTitle: 'Learn banking',
  },
];

export default getBankingRoutes;
