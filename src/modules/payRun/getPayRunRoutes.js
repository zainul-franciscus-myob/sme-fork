import PayRunDetailModule from './payRunDetail/payRunDetailModule';
import PayRunListModule from './payRunList/PayRunListModule';
import PayRunModule from './payRunCreate/PayRunModule';
import RouteName from '../../router/RouteName';

const getPayRunRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  replaceURLParams,
  subscribeOrUpgrade,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.PAY_RUN_CREATE,
      path: '/au/:businessId/payRun/new',
      defaultParams: { region: 'au' },
      module: new PayRunModule({
        integration,
        setRootView,
        pushMessage,
        subscribeOrUpgrade,
        featureToggles,
      }),
      documentTitle: 'Pay run',
    },
    {
      name: RouteName.PAY_RUN_LIST,
      path: '/au/:businessId/payRun/',
      defaultParams: { region: 'au' },
      module: new PayRunListModule({
        integration,
        setRootView,
        popMessages,
        replaceURLParams,
      }),
      documentTitle: 'Pay runs',
    },
    {
      name: RouteName.PAY_RUN_DETAIL,
      path: '/au/:businessId/payRun/:payRunId',
      defaultParams: { region: 'au' },
      module: new PayRunDetailModule({
        integration,
        setRootView,
        featureToggles,
      }),
      documentTitle: 'Pay run',
    },
  ];

  return routes;
};

export default getPayRunRoutes;
