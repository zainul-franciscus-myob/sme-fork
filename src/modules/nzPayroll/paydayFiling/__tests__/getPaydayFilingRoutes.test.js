import RouteName from '../../../../router/RouteName';
import getPaydayFilingRoutes from '../getPaydayFilingRoutes';

describe('getPaydayFilingRoutes', () => {
  it('should return payday filing route when payday filing is enabled', () => {
    const routes = getPaydayFilingRoutes({
      featureToggles: { isNzPaydayFilingEnabled: true },
    });
    expect(
      routes.some(({ name }) => name === RouteName.PAYDAY_FILING_ONBOARDING_NZ)
    ).toBeTruthy();
  });

  it('should not return payday filing route when payday filing is disabled', () => {
    const routes = getPaydayFilingRoutes({
      featureToggles: { isNzPaydayFilingEnabled: false },
    });
    expect(
      routes.some(({ name }) => name === RouteName.PAYDAY_FILING_ONBOARDING_NZ)
    ).toBeFalsy();
  });
});
