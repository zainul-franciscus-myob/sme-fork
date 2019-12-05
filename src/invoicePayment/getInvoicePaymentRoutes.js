import InvoicePaymentDetailModule from './invoicePaymentDetail/InvoicePaymentDetailModule';

const getInvoicePaymentRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'invoicePaymentDetail',
      path: '/:invoicePaymentId',
      module: new InvoicePaymentDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Invoice payment',
    },
  ];

  return routes;
};

export default getInvoicePaymentRoutes;
