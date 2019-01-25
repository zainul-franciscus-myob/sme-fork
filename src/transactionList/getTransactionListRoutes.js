import TransactionListModule from './TransactionListModule';

const getTransactionListRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'transactionList',
      path: '/',
      allowedParams: ['sourceJournal'],
      module: new TransactionListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getTransactionListRoutes;
