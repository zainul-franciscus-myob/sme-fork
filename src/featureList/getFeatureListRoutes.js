import FeaturesModule from './FeaturesModule';

const getFeatureListRoutes = ({
  setRootView,
}) => {
  const routes = [
    {
      name: 'featureList',
      path: '/',
      module: new FeaturesModule({ setRootView }),
    },
  ];

  return routes;
};

export default getFeatureListRoutes;
