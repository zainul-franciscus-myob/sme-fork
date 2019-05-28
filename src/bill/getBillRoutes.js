import BillModule from './BillModule';

const getBillRoutes = ({
  integration, setRootView, pushMessage, replaceURLParams,
}) => {
  const routes = [
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
