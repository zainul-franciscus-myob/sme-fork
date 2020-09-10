import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getInvoicePaymentRoutes = () => [
  {
    name: RouteName.INVOICE_PAYMENT_DETAIL,
    path: '/:region/:businessId/invoicePayment/:invoicePaymentId',
    loadModule: () =>
      import('./invoicePaymentDetail/InvoicePaymentDetailModule'),
    documentTitle: 'Invoice payment',
  },
];

export default getInvoicePaymentRoutes;
