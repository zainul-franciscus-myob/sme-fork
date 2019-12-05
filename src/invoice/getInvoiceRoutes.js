import InvoiceDetailModule from './invoiceDetail/InvoiceDetailModule';
import InvoiceListModule from './invoiceList/InvoiceListModule';

export const INVOICE_LIST_ROUTE = 'invoiceList';

const getInvoiceRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, reload,
}) => {
  const routes = [
    {
      name: INVOICE_LIST_ROUTE,
      path: '/',
      module: new InvoiceListModule(
        { integration, setRootView, popMessages },
      ),
      documentTitle: 'Invoices',
    },
    {
      name: 'invoiceDetail',
      path: '/:invoiceId',
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
