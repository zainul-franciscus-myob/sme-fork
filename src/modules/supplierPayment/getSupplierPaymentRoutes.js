import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSupplierPaymentRoutes = () => [
  {
    name: RouteName.SUPPLIER_PAYMENT_DETAIL,
    path: '/:region/:businessId/supplierPayment/:supplierPaymentId',
    loadModule: () =>
      import('./supplierPaymentDetail/SupplierPaymentDetailModule'),
    documentTitle: 'Payment to supplier',
  },
];

export default getSupplierPaymentRoutes;
