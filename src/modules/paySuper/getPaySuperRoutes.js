import PaySuperCreateModule from './paySuperCreate/PaySuperCreateModule';
import PaySuperListModule from './paySuperList/PaySuperListModule';
import PaySuperReadModule from './paySuperRead/PaySuperReadModule';
import RouteName from '../../router/RouteName';

const getPaySuperRoutes = ({
  integration, setRootView, popMessages, pushMessage, featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.PAY_SUPER_LIST,
      path: '/:region/:businessId/paySuper/',
      module: new PaySuperListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Pay super',
    },
    {
      name: RouteName.PAY_SUPER_CREATE,
      path: '/:region/:businessId/paySuper/new',
      module: new PaySuperCreateModule({
        setRootView, integration, pushMessage, featureToggles,
      }),
      documentTitle: 'Pay super',
    },
    {
      name: RouteName.PAY_SUPER_READ,
      path: '/:region/:businessId/paySuper/:businessEventId',
      module: new PaySuperReadModule({
        integration, setRootView, pushMessage, featureToggles,
      }),
    },
  ];
  return routes;
};

export default getPaySuperRoutes;
