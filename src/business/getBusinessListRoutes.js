import BusinessListModule from './businessList/BusinessListModule';

const getBusinessListRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'businessList',
      path: '/',
      module: new BusinessListModule({ setRootView, integration }),
    },
  ];

  return routes;
};

export default getBusinessListRoutes;
