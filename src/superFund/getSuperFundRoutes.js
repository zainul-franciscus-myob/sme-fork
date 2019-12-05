import SuperFundModule from './SuperFundModule';

const getSuperFundRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'superFundDetail',
      path: '/:superFundId',
      module: new SuperFundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Superannuation fund',
    },
  ];

  return routes;
};

export default getSuperFundRoutes;
