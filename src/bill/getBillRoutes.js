import BillListModule from './billList/BillListModule';
import BillModule from './BillModule';

const getBillRoutes = ({
  integration, setRootView, pushMessage, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'billList',
      path: '/',
      module: new BillListModule({
        integration, setRootView,
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
