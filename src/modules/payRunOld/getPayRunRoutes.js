import PayRunDetailModule from './payRunDetail/payRunDetailModule';
import PayRunListModule from './payRunList/PayRunListModule';
import PayRunModule from './payRunCreate/PayRunModule';
import RouteName from '../../router/RouteName';

const getPayRunRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.PAY_RUN_OLD_CREATE,
      path: '/:region/:businessId/payRunOld/new',
      module: new PayRunModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay run',
    },
    {
      name: RouteName.PAY_RUN_OLD_LIST,
      path: '/:region/:businessId/payRunOld/',
      module: new PayRunListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay runs',
    },
    {
      name: RouteName.PAY_RUN_OLD_DETAIL,
      path: '/:region/:businessId/payRunOld/:payRunId',
      module: new PayRunDetailModule({
        integration, setRootView,
      }),
      documentTitle: 'Pay run',
    },
  ];

  return routes;
};

export default getPayRunRoutes;
