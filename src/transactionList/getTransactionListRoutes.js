import TransactionListModule from './TransactionListModule';

export const TRANSACTION_LIST_ROUTE = 'transactionList';

const getTransactionListRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: TRANSACTION_LIST_ROUTE,
      path: '/',
      allowedParams: ['sourceJournal'],
      module: new TransactionListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Transactions',
    },
  ];

  return routes;
};

export default getTransactionListRoutes;
