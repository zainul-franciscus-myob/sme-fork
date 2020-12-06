import RecurringInvoiceModule from './recurringInvoice/RecurringInvoiceModule';
import RecurringTransactionListModule from './recurringTransactionList/RecurringTransactionListModule';
import RouteName from '../../router/RouteName';

const getRecurringTransactionRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  replaceURLParams,
  navigateTo,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.RECURRING_TRANSACTION_LIST,
      path: '/:region/:businessId/recurringTransaction',
      allowedParams: ['type'],
      module: new RecurringTransactionListModule({
        integration,
        setRootView,
        popMessages,
        navigateTo,
        replaceURLParams,
        featureToggles,
      }),
      documentTitle: 'Recurring transactions',
    },
    {
      name: RouteName.RECURRING_INVOICE,
      path:
        '/:region/:businessId/recurringTransaction/:recurringTransactionId/invoice',
      allowedParams: ['layout'],
      module: new RecurringInvoiceModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        replaceURLParams,
        navigateTo,
        featureToggles,
      }),
      documentTitle: 'Recurring transaction',
    },
  ];

  return routes;
};

export default getRecurringTransactionRoutes;
