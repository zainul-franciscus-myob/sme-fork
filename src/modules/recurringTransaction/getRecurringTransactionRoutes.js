import RecurringBillModule from './recurringBill/RecurringBillModule';
import RecurringInvoiceModule from './recurringInvoice/RecurringInvoiceModule';
import RecurringSpendMoneyModule from './recurringSpendMoney/RecurringSpendMoneyModule';
import RecurringTransactionListModule from './recurringTransactionList/RecurringTransactionListModule';
import RouteName from '../../router/RouteName';

const documentTitle = 'Recurring transactions';

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
      name: RouteName.RECURRING_BILL,
      path:
        '/:region/:businessId/recurringTransaction/:recurringTransactionId/bill',
      allowedParams: ['layout'],
      module: new RecurringBillModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        replaceURLParams,
        navigateTo,
        featureToggles,
      }),
      documentTitle,
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
      documentTitle,
    },
    {
      name: RouteName.RECURRING_SPEND_MONEY,
      path:
        '/:region/:businessId/recurringTransaction/:recurringTransactionId/spendMoney',
      module: new RecurringSpendMoneyModule({
        integration,
        setRootView,
        pushMessage,
        replaceURLParams,
        navigateTo,
        featureToggles,
      }),
      documentTitle,
    },
  ];

  return routes;
};

export default getRecurringTransactionRoutes;
