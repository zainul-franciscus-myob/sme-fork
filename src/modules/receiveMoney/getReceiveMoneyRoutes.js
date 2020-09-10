import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getReceiveMoneyRoutes = () => [
  {
    name: RouteName.RECEIVE_MONEY_DETAIL,
    path: '/:region/:businessId/receiveMoney/:receiveMoneyId',
    allowedParams: ['duplicateReceiveMoneyId'],
    loadModule: () => import('./receiveMoneyDetail/ReceiveMoneyDetailModule'),
    documentTitle: 'Receive money',
  },
];

export default getReceiveMoneyRoutes;
