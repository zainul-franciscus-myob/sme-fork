import RouteName from '../router/RouteName';
import TransactionListModule from './TransactionListModule';

const getTransactionListRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.TRANSACTION_LIST,
      path: '/:region/:businessId/transactionList/',
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
