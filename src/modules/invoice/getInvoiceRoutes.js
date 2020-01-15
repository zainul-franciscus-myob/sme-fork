import InvoiceDetailModule from './invoiceDetail/InvoiceDetailModule';
import InvoiceListModule from './invoiceList/InvoiceListModule';
import RouteName from '../../router/RouteName';

const getInvoiceRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, reload,
}) => {
  const routes = [
    {
      name: RouteName.INVOICE_LIST,
      path: '/:region/:businessId/invoice/',
      module: new InvoiceListModule(
        { integration, setRootView, popMessages },
      ),
      documentTitle: 'Invoices',
    },
    {
      name: RouteName.INVOICE_DETAIL,
      path: '/:region/:businessId/invoice/:invoiceId',
      allowedParams: ['layout', 'quoteId', 'openSendEmail', 'duplicatedInvoiceId'],
      module: new InvoiceDetailModule({
        integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
      }),
      documentTitle: 'Invoice',
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
