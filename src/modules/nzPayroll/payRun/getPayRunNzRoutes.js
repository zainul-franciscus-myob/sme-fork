import PayRunModule from './payRunCreate/PayRunModule';
import RouteName from '../../../router/RouteName';

const getPayRunRoutes = ({
  integration,
  setRootView,
  pushMessage,
  isToggleOn,
  subscribeOrUpgrade,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.PAY_RUN_CREATE_NZ,
      path: '/nz/:businessId/payRun/new',
      defaultParams: { region: 'nz' },
      module: new PayRunModule({
        integration,
        setRootView,
        pushMessage,
        isToggleOn,
        subscribeOrUpgrade,
        navigateTo,
      }),
      documentTitle: 'Pay run',
    },
  ];

  return routes;
};

export default getPayRunRoutes;
