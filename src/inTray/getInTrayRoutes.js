import InTrayModule from './inTrayList/InTrayModule';
import RouteName from '../router/RouteName';

const getInTrayRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: RouteName.IN_TRAY,
      path: '/:region/:businessId/inTray/',
      module: new InTrayModule({ integration, setRootView, popMessages }),
      documentTitle: 'In Tray',
    },
  ];

  return routes;
};

export default getInTrayRoutes;
