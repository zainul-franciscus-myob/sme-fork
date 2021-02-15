import OnboardingModule from './OnboardingModule';
import RouteName from '../../router/RouteName';

const getOnboardingRoutes = ({ integration, navigateTo, featureToggles }) => [
  {
    name: RouteName.ONBOARDING,
    path: '/:region/:businessId/onboarding/',
    module: new OnboardingModule({
      integration,
      navigateTo,
      featureToggles,
    }),
    documentTitle: 'Onboarding',
  },
];

export default getOnboardingRoutes;
