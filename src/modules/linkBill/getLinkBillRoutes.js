import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getLinkBillRoutes = () => [
  {
    name: RouteName.LINK_BILL,
    path: '/:region/:businessId/linkBill/:documentId',
    loadModule: () => import('./LinkBillModule'),
    documentTitle: 'Link to existing bill',
  },
];

export default getLinkBillRoutes;
