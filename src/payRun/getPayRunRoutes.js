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
    },
    {
      name: 'payRunList',
      path: '/',
      module: new PayrunListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getPayRunRoutes;
