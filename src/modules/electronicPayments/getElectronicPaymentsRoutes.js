import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getElectronicPaymentsRoutes = () => [
  {
    name: RouteName.ELECTRONIC_PAYMENTS_CREATE,
    path: '/:region/:businessId/electronicPayments/',
    allowedParams: ['paymentType'],
    loadModule: () =>
      import('./electronicPaymentsCreate/ElectronicPaymentsCreateModule'),
    documentTitle: 'Bank file payment',
  },
  {
    name: RouteName.ELECTRONIC_PAYMENTS_READ,
    path: '/:region/:businessId/electronicPayments/:electronicPaymentId',
    loadModule: () =>
      import('./electronicPaymentsRead/ElectronicPaymentsReadModule'),
    documentTitle: 'Bank file payment',
  },
];

export default getElectronicPaymentsRoutes;
