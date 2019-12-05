import PaySuperListModule from './paySuperList/PaySuperListModule';

const getPaySuperRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'PaySuperList',
      path: '/',
      module: new PaySuperListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getPaySuperRoutes;
