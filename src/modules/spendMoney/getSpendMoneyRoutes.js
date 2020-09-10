import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSpendMoneyRoutes = () => [
  {
    name: RouteName.SPEND_MONEY_DETAIL,
    path: '/:region/:businessId/spendMoney/:spendMoneyId',
    loadModule: () => import('./spendMoneyDetail/SpendMoneyDetailModule'),
    documentTitle: 'Spend money',
  },
];

export default getSpendMoneyRoutes;
