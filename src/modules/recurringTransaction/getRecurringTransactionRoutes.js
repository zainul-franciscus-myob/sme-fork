import RecurringTransactionListModule from './recurringTransactionList/RecurringTransactionListModule';
import RouteName from '../../router/RouteName';

const getRecurringTransactionRoutes = ({
  integration,
  setRootView,
  replaceURLParams,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.RECURRING_TRANSACTION_LIST,
      path: '/:region/:businessId/recurringTransaction/',
      allowedParams: ['type'],
      module: new RecurringTransactionListModule({
        integration,
        setRootView,
        replaceURLParams,
        featureToggles,
      }),
      documentTitle: 'Recurring Transactions',
    },
  ];

  return routes;
};

export default getRecurringTransactionRoutes;
