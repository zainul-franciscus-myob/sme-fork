import RouteName from '../../../router/RouteName';

const getPaydayFilingRoutes = () => {
  return [
    {
      name: RouteName.PAYDAY_FILING_ONBOARDING,
      path: '/nz/:businessId/paydayFiling/onboarding',
      allowedParams: ['authorisation'],
      defaultParams: { region: 'nz' },
      loadModule: () => import('./onboarding/OnboardingModule'),
      documentTitle: 'Connect to Payday filing',
    },
    {
      name: RouteName.PAYDAY_FILING,
      path: '/nz/:businessId/paydayFiling',
      allowedParams: ['authorisation'],
      defaultParams: { region: 'nz' },
      loadModule: () => import('./paydayFiling/PaydayFilingModule'),
      documentTitle: 'Payday filing',
    },
  ];
};

export default getPaydayFilingRoutes;
