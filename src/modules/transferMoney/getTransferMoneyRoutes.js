import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTransferMoneyRoutes = () => [
  {
    name: RouteName.TRANSFER_MONEY_DETAIL,
    path: '/:region/:businessId/transferMoney/:transferMoneyId',
    loadModule: () => import('./transferMoneyDetail/TransferMoneyDetailModule'),
    documentTitle: 'Transfer money',
  },
];

export default getTransferMoneyRoutes;
