import RouteName from '../../router/RouteName';
import SmartMeLearnModule from './smartMeLearn/SmartMeLearnModule';

const getSmartMeSettingsRoutes = ({
  setRootView,
  globalCallbacks,
  navigateTo,
}) => [
  {
    name: RouteName.ONBOARDING_LEARN_SMARTME,
    path: '/:region/:businessId/smartme/learn',
    module: new SmartMeLearnModule({
      setRootView,
      globalCallbacks,
      navigateTo,
    }),
    documentTitle: 'SmartMe',
  },
];

export default getSmartMeSettingsRoutes;
