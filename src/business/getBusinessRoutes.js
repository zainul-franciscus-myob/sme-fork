import BusinessModule from './BusinessModule';

const getBusinessListRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'businessList',
      path: '/',
      module: new BusinessModule({ setRootView, integration }),
    },
  ];

  return routes;
};

export default getBusinessListRoutes;
