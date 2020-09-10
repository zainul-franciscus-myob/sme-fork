import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getIncomeAllocationRoutes = () => [
  {
    name: RouteName.INCOME_ALLOCATION,
    path: '/:region/:businessId/incomeAllocation/',
    loadModule: () => import('./IncomeAllocationModule'),
    documentTitle: 'Income allocation',
  },
];

export default getIncomeAllocationRoutes;
