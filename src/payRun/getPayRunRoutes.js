import PayRunDetailModule from './payRunDetail/payRunDetailModule';
import PayRunModule from './payRunCreate/PayRunModule';
import PayrunListModule from './payRunList/PayRunListModule';
import RouteName from '../router/RouteName';

const getPayRunRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.PAY_RUN_CREATE,
      path: '/:region/:businessId/payRun/new',
      module: new PayRunModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay run',
    },
    {
      name: RouteName.PAY_RUN_LIST,
      path: '/:region/:businessId/payRun/',
      module: new PayrunListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay runs',
    },
    {
      name: RouteName.PAY_RUN_DETAIL,
      path: '/:region/:businessId/payRun/:payRunId',
      module: new PayRunDetailModule({
        integration, setRootView,
      }),
      documentTitle: 'Pay run',
    },
  ];

  return routes;
};

export default getPayRunRoutes;
