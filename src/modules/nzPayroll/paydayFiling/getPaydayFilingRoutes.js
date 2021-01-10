import RouteName from '../../../router/RouteName';

const getPaydayFilingRoutes = ({ featureToggles }) => {
  return featureToggles && featureToggles.isNzPaydayFilingEnabled
    ? [
        {
          name: RouteName.PAYDAY_FILING_ONBOARDING_NZ,
          path: '/nz/:businessId/paydayFiling/onboarding',
          allowedParams: ['authorisation'],
          defaultParams: { region: 'nz' },
          loadModule: () => import('./onboarding/OnboardingModule'),
          documentTitle: 'Connect to Payday filing',
        },
        {
          name: RouteName.PAYDAY_FILING_NZ,
          path: '/:region/:businessId/paydayFiling',
          allowedParams: ['authorisation'],
          defaultParams: { region: 'nz' },
          loadModule: () => import('./paydayFiling/PaydayFilingModule'),
          documentTitle: 'Payday filing',
        },
      ]
    : [];
};

export default getPaydayFilingRoutes;
