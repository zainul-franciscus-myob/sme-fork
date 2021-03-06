import RouteName from '../../router/RouteName';
import TransactionListModule from './TransactionListModule';

const getTransactionListRoutes = ({
  integration,
  setRootView,
  popMessages,
  replaceURLParams,
  isToggleOn,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.TRANSACTION_LIST,
      path: '/:region/:businessId/transactionList/',
      allowedParams: ['sourceJournal'],
      module: new TransactionListModule({
        integration,
        setRootView,
        popMessages,
        replaceURLParams,
        isToggleOn,
        navigateTo,
      }),
      documentTitle: 'Transactions',
    },
    {
      name: RouteName.GENERAL_JOURNAL_LIST,
      path: '/:region/:businessId/generalJournalList/',
      allowedParams: ['sourceJournal'],
      module: new TransactionListModule({
        integration,
        setRootView,
        popMessages,
        replaceURLParams,
        isToggleOn,
        navigateTo,
      }),
      documentTitle: 'Transactions',
    },
  ];

  return routes;
};

export default getTransactionListRoutes;
