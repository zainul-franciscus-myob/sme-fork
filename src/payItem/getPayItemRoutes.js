import DeductionPayItemDetailModule from './deductionPayItem/deductionPayItemsDetail/DeductionPayItemModule';
import ExpensePayItemModule from './expensePayItem/ExpensePayItemModule';
import LeavePayItemModule from './leavePayItem/LeavePayItemModule';
import PayItemListModule from './payItemList/PayItemListModule';
import RouteName from '../router/RouteName';
import SuperPayItemModule from './superPayItem/SuperPayItemModule';
import WagePayItemModule from './wagePayItem/WagePayItemModule';

const getPayItemRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.PAY_ITEM_LIST,
      path: '/:region/:businessId/payItem/',
      allowedParams: ['tab'],
      module: new PayItemListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay items',
    },
    {
      name: RouteName.PAY_ITEM_SUPER,
      path: '/:region/:businessId/payItem/superannuation/:superPayItemId',
      module: new SuperPayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Superannuation pay item',
    },
    {
      name: RouteName.PAY_ITEM_DEDUCTION,
      path: '/:region/:businessId/payItem/deduction/:payItemId',
      module: new DeductionPayItemDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Deduction pay item',
    },
    {
      name: RouteName.PAY_ITEM_EXPENSE,
      path: '/:region/:businessId/payItem/expense/:expensePayItemId',
      module: new ExpensePayItemModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Expense pay item',
    },
    {
      name: RouteName.PAY_ITEM_WAGE,
      path: '/:region/:businessId/payItem/wage/:payItemId',
      module: new WagePayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Wage pay item',
    },
    {
      name: RouteName.PAY_ITEM_LEAVE,
      path: '/:region/:businessId/payItem/leave/:leavePayItemId',
      module: new LeavePayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Leave pay item',
    },
  ];

  return routes;
};

export default getPayItemRoutes;
