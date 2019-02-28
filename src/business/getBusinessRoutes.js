import BusinessDetailModule from './businessDetail/businessDetailModule';
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
    {
      name: 'businessDetail',
      path: '/:businessId',
      module: new BusinessDetailModule({ setRootView, integration }),
    },
  ];

  return routes;
};

export default getBusinessListRoutes;
