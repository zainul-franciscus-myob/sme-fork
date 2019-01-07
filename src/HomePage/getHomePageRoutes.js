import HomePageModule from './HomePageModule';

const getHomePageRoutes = ({
  setRootView,
}) => {
  const routes = [
    {
      name: 'homePage',
      path: '/',
      module: new HomePageModule({ setRootView }),
    },
  ];

  return routes;
};

export default getHomePageRoutes;
