import RecurringTransactionListModule from './recurringTransactionList/RecurringTransactionListModule';
import RouteName from '../../router/RouteName';

const getRecurringTransactionRoutes = ({
  integration,
  setRootView,
  popMessages,
}) => {
  const routes = [
    {
      name: RouteName.RECURRING_TRANSACTION_LIST,
      path: '/:region/:businessId/recurringTransaction/',
      module: new RecurringTransactionListModule({
        integration,
        setRootView,
        popMessages,
      }),
      documentTitle: 'Recurring Transactions',
    },
  ];

  return routes;
};

export default getRecurringTransactionRoutes;
