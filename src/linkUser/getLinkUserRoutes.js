import LinkUserModule from './LinkUserModule';
import RouteName from '../router/RouteName';

const getLinkUserRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: RouteName.LINK_USER,
      path: '/:region/:businessId/linkUser/',
      allowedParams: ['redirectURL'],
      module: new LinkUserModule({ setRootView, integration }),
      documentTitle: 'Link user',
    },
  ];

  return routes;
};

export default getLinkUserRoutes;
