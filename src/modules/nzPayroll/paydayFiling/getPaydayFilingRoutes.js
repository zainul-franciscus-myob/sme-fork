import RouteName from '../../../router/RouteName';

const getPaydayFilingRoutes = ({ featureToggles }) => {
  return featureToggles && featureToggles.isNzPaydayFilingEnabled
    ? [
        {
          name: RouteName.PAYDAY_FILING_ONBOARDING_NZ,
          path: '/:region/:businessId/paydayFiling/onboarding',
          defaultParams: { region: 'nz' },
          loadModule: () => import('./onboarding/OnboardingModule'),
          documentTitle: 'Connect to Payday filing',
        },
      ]
    : [];
};

export default getPaydayFilingRoutes;
