import PayRunListModule from './PayRunListModule';

const getPayRunListRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'payRunList',
      path: '/',
      module: new PayRunListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getPayRunListRoutes;
