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
      documentTitle: 'Link user',
    },
  ];

  return routes;
};

export default getLinkUserRoutes;
