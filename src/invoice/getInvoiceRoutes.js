import InvoiceDetailModule from './invoiceDetail/InvoiceDetailModule';
import InvoiceListModule from './invoiceList/InvoiceListModule';

const getInvoiceRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, reload,
}) => {
  const routes = [
    {
      name: 'invoiceList',
      path: '/',
      module: new InvoiceListModule(
        { integration, setRootView, popMessages },
      ),
    },
    {
      name: 'invoiceDetail',
      path: '/:invoiceId',
      allowedParams: ['layout', 'quoteId', 'openSendEmail', 'duplicatedInvoiceId'],
      module: new InvoiceDetailModule({
        integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
      }),
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
