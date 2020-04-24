import InvoiceDetailModule from './invoiceDetail/InvoiceDetailModule';
import InvoiceListModule from './invoiceList/InvoiceListModule';
import RouteName from '../../router/RouteName';

const getInvoiceRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  replaceURLParams,
  reload,
  globalCallbacks,
  featureToggles,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.INVOICE_LIST,
      path: '/:region/:businessId/invoice/',
      allowedParams: ['dateFrom', 'dateTo', 'keywords', 'customerId', 'status', 'orderBy', 'sortOrder'],
      module: new InvoiceListModule(
        { integration, setRootView, popMessages },
      ),
      documentTitle: 'Invoices',
    },
    {
      name: RouteName.INVOICE_DETAIL,
      path: '/:region/:businessId/invoice/:invoiceId',
      allowedParams: ['layout', 'quoteId', 'duplicatedInvoiceId'],
      module: new InvoiceDetailModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        replaceURLParams,
        reload,
        globalCallbacks,
        featureToggles,
        navigateTo,
      }),
      documentTitle: 'Invoice',
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
