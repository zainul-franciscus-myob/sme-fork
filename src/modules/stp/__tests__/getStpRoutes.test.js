import RouteName from '../../../router/RouteName';
import getStpRoutes from '../getStpRoutes';

describe('getStpRoutes', () => {
  it('should not return ETP route attribute when reversal feature is on', () => {
    const routes = getStpRoutes({
      featureToggles: { isPayrollReversibleEnabled: true },
    });
    expect(
      routes.some(({ name }) => name === RouteName.STP_EMPLOYEE_ETP)
    ).toBeFalsy();
  });

  it('should return ETP route attribute when reversal feature is off', () => {
    const routes = getStpRoutes({
      featureToggles: { isPayrollReversibleEnabled: false },
    });
    expect(
      routes.some(({ name }) => name === RouteName.STP_EMPLOYEE_ETP)
    ).toBeTruthy();
  });
});
