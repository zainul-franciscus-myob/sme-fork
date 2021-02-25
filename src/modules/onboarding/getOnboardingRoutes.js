import OnboardingModule from './OnboardingModule';
import RouteName from '../../router/RouteName';

const getOnboardingRoutes = ({
  integration,
  navigateTo,
  featureToggles,
  setRootView,
  globalCallbacks,
  loadGlobalBusinessDetails,
}) => [
  {
    name: RouteName.ONBOARDING,
    path: '/:region/:businessId/onboarding/',
    module: new OnboardingModule({
      integration,
      navigateTo,
      featureToggles,
      setRootView,
      globalCallbacks,
      loadGlobalBusinessDetails,
    }),
    documentTitle: 'Onboarding',
    isMaximisedModule: true,
  },
];

export default getOnboardingRoutes;
