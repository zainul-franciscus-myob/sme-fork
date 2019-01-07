import FeaturesModule from './FeaturesModule';

const getFeatureListRoutes = ({
  setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'featureList',
      path: '/',
      module: new FeaturesModule({ setRootView, popMessages }),
    },
  ];

  return routes;
};

export default getFeatureListRoutes;
