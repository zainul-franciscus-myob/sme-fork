import LinkUserModule from './LinkUserModule';

const getLinkUserRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'linkUser',
      path: '/',
      allowedParams: ['redirectURL'],
      module: new LinkUserModule({ setRootView, integration }),
    },
  ];

  return routes;
};

export default getLinkUserRoutes;
