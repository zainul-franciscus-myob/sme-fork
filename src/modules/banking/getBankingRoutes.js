import BankingLearnModule from '../learning/bankingLearn/bankingLearnModule';
import RouteName from '../../router/RouteName';

/** @type {import("../module-types").RouteConfig} */
const getBankingRoutes = (container) => [
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
    /** TODO: Convert this into a dynamic import once the cross module import errors relating
     * to it are resolved. */
    module: new BankingLearnModule(container),
    documentTitle: 'Learn banking',
  },
];

export default getBankingRoutes;
