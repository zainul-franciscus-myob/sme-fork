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
      module: new InvoiceModule({
        integration, setRootView, pushMessage, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
