import RouteName from '../../router/RouteName';
import SuperFundModule from './SuperFundModule';

const getSuperFundRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.SUPER_FUND_DETAIL,
      path: '/:region/:businessId/superFund/:superFundId',
      module: new SuperFundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Superannuation fund',
    },
  ];

  return routes;
};

export default getSuperFundRoutes;
