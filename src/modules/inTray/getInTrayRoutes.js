import InTrayModule from './inTrayList/InTrayModule';
import LearnInTrayModule from '../learning/inTrayLearn/LearnInTrayModule';
import RouteName from '../../router/RouteName';

const getInTrayRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  globalCallbacks,
}) => {
  const routes = [
    {
      name: RouteName.IN_TRAY,
      path: '/:region/:businessId/inTray/',
      module: new InTrayModule({
        integration,
        setRootView,
        popMessages,
        pushMessage,
        globalCallbacks,
      }),
      documentTitle: 'In Tray',
    },
    {
      name: RouteName.ONBOARDING_LEARN_IN_TRAY,
      path: '/:region/:businessId/inTray/learn',
      module: new LearnInTrayModule({ setRootView, globalCallbacks }),
      documentTitle: 'Learn the In Tray',
    },
  ];

  return routes;
};

export default getInTrayRoutes;
