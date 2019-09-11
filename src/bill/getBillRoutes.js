import BillListModule from './billList/BillListModule';
import BillModule from './billDetail/BillModule';

const getBillRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'billList',
      path: '/',
      module: new BillListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'billDetail',
      path: '/:billId',
      module: new BillModule({
        integration, setRootView, pushMessage, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getBillRoutes;
