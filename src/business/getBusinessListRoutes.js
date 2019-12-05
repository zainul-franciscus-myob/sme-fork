import BusinessListModule from './businessList/BusinessListModule';

const getBusinessListRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'businessList',
      path: '/',
      module: new BusinessListModule({ setRootView, integration }),
      documentTitle: 'My businesses',
    },
  ];

  return routes;
};

export default getBusinessListRoutes;
