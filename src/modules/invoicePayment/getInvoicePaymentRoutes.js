import InvoicePaymentDetailModule from './invoicePaymentDetail/InvoicePaymentDetailModule';
import RouteName from '../../router/RouteName';

const getInvoicePaymentRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.INVOICE_PAYMENT_DETAIL,
      path: '/:region/:businessId/invoicePayment/:invoicePaymentId',
      module: new InvoicePaymentDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Invoice payment',
    },
  ];

  return routes;
};

export default getInvoicePaymentRoutes;
