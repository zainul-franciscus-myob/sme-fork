import InvoiceListModule from './invoiceList/InvoiceListModule';

const getInvoiceRoutes = ({ integration, setRootView }) => {
  const routes = [
    {
      name: 'invoiceList',
      path: '/',
      module: new InvoiceListModule(
        { integration, setRootView },
      ),
    },
  ];

  return routes;
};

export default getInvoiceRoutes;
