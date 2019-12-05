import PayRunDetailModule from './payRunDetail/payRunDetailModule';
import PayRunModule from './payRunCreate/PayRunModule';
import PayrunListModule from './payRunList/PayRunListModule';

const getPayRunRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'payRunCreate',
      path: '/new',
      module: new PayRunModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay run',
    },
    {
      name: 'payRunList',
      path: '/',
      module: new PayrunListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay runs',
    },
    {
      name: 'payRunDetail',
      path: '/:payRunId',
      module: new PayRunDetailModule({
        integration, setRootView,
      }),
      documentTitle: 'Pay run',
    },
  ];

  return routes;
};

export default getPayRunRoutes;
