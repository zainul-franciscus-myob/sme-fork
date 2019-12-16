import PrepareBasOrIasModule from './PrepareBasOrIasModule';
import RouteName from '../router/RouteName';

const getPrepareBasOrIasRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.PREPARE_BAS_OR_IAS,
      path: '/:region/:businessId/prepareBasOrIas/',
      module: new PrepareBasOrIasModule({
        integration, setRootView,
      }),
      documentTitle: 'Prepare BAS or IAS',
    },
  ];

  return routes;
};

export default getPrepareBasOrIasRoutes;
