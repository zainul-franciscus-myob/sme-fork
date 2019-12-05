import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'salesSettingsDetail',
      path: '/',
      module: new SalesSettingsDetailModule({ setRootView, integration }),
      documentTitle: 'Invoice and quote settings',
    },
  ];

  return routes;
};

export default getSalesSettingsRoutes;
