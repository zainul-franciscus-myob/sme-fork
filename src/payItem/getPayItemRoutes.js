import DeductionPayItemDetailModule from './deductionPayItem/deductionPayItemsDetail/DeductionPayItemModule';
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
    },
    {
      name: 'superPayItem',
      path: '/superannuation/:superPayItemId',
      module: new SuperPayItemModule({
        integration, setRootView, pushMessage,
      }),
    },
    {
      name: 'deductionPayItemDetail',
      path: '/deduction/:payItemId',
      module: new DeductionPayItemDetailModule({ integration, setRootView, pushMessage }),
    },
    {
      name: 'wagePayItem',
      path: '/wage/:payItemId',
      module: new WagePayItemModule({
        integration, setRootView, pushMessage,
      }),
    },
    {
      name: 'leavePayItem',
      path: '/leave/:leavePayItemId',
      module: new LeavePayItemModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getPayItemRoutes;
