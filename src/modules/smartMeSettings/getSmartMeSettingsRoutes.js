import RouteName from '../../router/RouteName';
import SmartMeLearnModule from './smartMeLearn/SmartMeLearnModule';

const getSmartMeSettingsRoutes = ({ setRootView, globalCallbacks }) => [
  {
    name: RouteName.ONBOARDING_LEARN_SMARTME,
    path: '/:region/:businessId/smartme/learn',
    module: new SmartMeLearnModule({ setRootView, globalCallbacks }),
    documentTitle: 'SmartMe',
  },
];

export default getSmartMeSettingsRoutes;
