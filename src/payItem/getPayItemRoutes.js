import DeductionPayItemDetailModule from './deductionPayItem/deductionPayItemsDetail/DeductionPayItemModule';
import ExpensePayItemModule from './expensePayItem/ExpensePayItemModule';
import LeavePayItemModule from './leavePayItem/LeavePayItemModule';
import PayItemListModule from './payItemList/PayItemListModule';
import SuperPayItemModule from './superPayItem/SuperPayItemModule';
import WagePayItemModule from './wagePayItem/WagePayItemModule';

const getPayItemRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'payItemList',
      path: '/',
      allowedParams: ['tab'],
      module: new PayItemListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay items',
    },
    {
      name: 'superPayItem',
      path: '/superannuation/:superPayItemId',
      module: new SuperPayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Superannuation pay item',
    },
    {
      name: 'deductionPayItemDetail',
      path: '/deduction/:payItemId',
      module: new DeductionPayItemDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Deduction pay item',
    },
    {
      name: 'expensePayItem',
      path: '/expense/:expensePayItemId',
      module: new ExpensePayItemModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Expense pay item',
    },
    {
      name: 'wagePayItem',
      path: '/wage/:payItemId',
      module: new WagePayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Wage pay item',
    },
    {
      name: 'leavePayItem',
      path: '/leave/:leavePayItemId',
      module: new LeavePayItemModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Leave pay item',
    },
  ];

  return routes;
};

export default getPayItemRoutes;
