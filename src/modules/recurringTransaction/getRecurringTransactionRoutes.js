import RecurringTransactionListModule from './recurringTransactionList/RecurringTransactionListModule';
import RouteName from '../../router/RouteName';

const getRecurringTransactionRoutes = ({
  integration,
  setRootView,
  featureToggles,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.RECURRING_TRANSACTION_LIST,
      path: '/:region/:businessId/recurringTransaction/',
      module: new RecurringTransactionListModule({
        integration,
        setRootView,
        featureToggles,
        isToggleOn,
      }),
      documentTitle: 'Recurring Transactions',
    },
  ];

  return routes;
};

export default getRecurringTransactionRoutes;
