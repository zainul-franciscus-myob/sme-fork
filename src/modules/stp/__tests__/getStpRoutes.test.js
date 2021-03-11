import RouteName from '../../../router/RouteName';
import getStpRoutes from '../getStpRoutes';

describe('getStpRoutes', () => {
  it('should not return ETP route attribute', () => {
    const routes = getStpRoutes({});
    expect(
      routes.some(({ name }) => name === RouteName.STP_EMPLOYEE_ETP)
    ).toBeFalsy();
  });
});
