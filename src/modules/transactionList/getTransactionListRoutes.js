import RouteName from '../../router/RouteName';
import TransactionListModule from './TransactionListModule';

const getTransactionListRoutes = ({
  integration,
  setRootView,
  popMessages,
  replaceURLParams,
  isToggleOn,
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
      }),
      documentTitle: 'Transactions',
    },
  ];

  return routes;
};

export default getTransactionListRoutes;
