import InvoiceListModule from './invoiceList/InvoiceListModule';
import InvoiceModule from './invoiceDetail/InvoiceModule';

const getInvoiceRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
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
      allowedParams: ['quoteId', 'openSendEmail'],
      module: new InvoiceModule({
        integration, setRootView, pushMessage, popMessages, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
