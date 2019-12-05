import BusinessDetailModule from './businessDetail/businessDetailModule';

const getBusinessRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'businessDetail',
      path: '/',
      module: new BusinessDetailModule({ setRootView, integration }),
      documentTitle: 'Business details',
    },
  ];

  return routes;
};

export default getBusinessRoutes;
