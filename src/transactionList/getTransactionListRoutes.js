import TransactionListModule from './TransactionListModule';

const getTransactionListRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'transactionList',
      path: '/',
      module: new TransactionListModule({ integration, setRootView, popMessages }),
    },
  ];

  return routes;
};

export default getTransactionListRoutes;
