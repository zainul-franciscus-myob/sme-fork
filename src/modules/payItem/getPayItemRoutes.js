import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPayItemRoutes = () => [
  {
    name: RouteName.PAY_ITEM_LIST,
    path: '/:region/:businessId/payItem/',
    allowedParams: ['tab'],
    loadModule: () => import('./payItemList/PayItemListModule'),
    documentTitle: 'Pay items',
  },
  {
    name: RouteName.PAY_ITEM_SUPER,
    path: '/:region/:businessId/payItem/superannuation/:superPayItemId',
    loadModule: () => import('./superPayItem/SuperPayItemModule'),
    documentTitle: 'Superannuation pay item',
  },
  {
    name: RouteName.PAY_ITEM_DEDUCTION,
    path: '/:region/:businessId/payItem/deduction/:payItemId',
    loadModule: () =>
      import(
        './deductionPayItem/deductionPayItemsDetail/DeductionPayItemModule'
      ),
    documentTitle: 'Deduction pay item',
  },
  {
    name: RouteName.PAY_ITEM_EXPENSE,
    path: '/:region/:businessId/payItem/expense/:expensePayItemId',
    loadModule: () => import('./expensePayItem/ExpensePayItemModule'),
    documentTitle: 'Expense pay item',
  },
  {
    name: RouteName.PAY_ITEM_WAGE,
    path: '/:region/:businessId/payItem/wage/:payItemId',
    loadModule: () => import('./wagePayItem/WagePayItemModule'),
    documentTitle: 'Wage pay item',
  },
  {
    name: RouteName.PAY_ITEM_LEAVE,
    path: '/:region/:businessId/payItem/leave/:leavePayItemId',
    loadModule: () => import('./leavePayItem/LeavePayItemModule'),
    documentTitle: 'Leave pay item',
  },
];

export default getPayItemRoutes;
