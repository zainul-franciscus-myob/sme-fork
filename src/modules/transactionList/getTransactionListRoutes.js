import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTransactionListRoutes = () => [
  {
    name: RouteName.TRANSACTION_LIST,
    path: '/:region/:businessId/transactionList/',
    allowedParams: ['sourceJournal'],
    loadModule: () => import('./TransactionListModule'),
    documentTitle: 'Transactions',
  },
  {
    name: RouteName.GENERAL_JOURNAL_LIST,
    path: '/:region/:businessId/generalJournalList/',
    allowedParams: ['sourceJournal'],
    loadModule: () => import('./TransactionListModule'),
    documentTitle: 'Transactions',
  },
];

export default getTransactionListRoutes;
