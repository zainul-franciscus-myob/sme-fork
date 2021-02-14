import OnboardingModule from './OnboardingModule';
import RouteName from '../../router/RouteName';

const getOnboardingRoutes = ({ integration, navigateTo }) => [
  {
    name: RouteName.ONBOARDING,
    path: '/:region/:businessId/onboarding/',
    module: new OnboardingModule({
      integration,
      navigateTo,
    }),
    documentTitle: 'Onboarding',
  },
];

export default getOnboardingRoutes;
