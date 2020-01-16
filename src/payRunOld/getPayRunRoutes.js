import PayRunDetailModule from './payRunDetail/payRunDetailModule';
import PayRunModule from './payRunCreate/PayRunModule';
import PayrunListModule from './payRunList/PayRunListModule';
import RouteName from '../router/RouteName';

const getPayRunOldRoutes = ({
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
      module: new PayrunListModule({
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

export default getPayRunOldRoutes;
