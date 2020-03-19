import RouteName from '../../../router/RouteName';
import getEmployeeRoutes from '../getEmployeeRoutes';

describe('getEmployeeRoutes', () => {
  afterEach(jest.clearAllMocks);

  const params = {
    globalCallbacks: {},
  };

  describe(RouteName.EMPLOYEE_LIST, () => {
    const name = RouteName.EMPLOYEE_LIST;
    const path = '/employee/';

    describe('when nz payroll feature toggle is off', () => {
      const featureToggles = { isNZPayrollEnabled: false };
      it(`should have path of /:region/:businessId${path}`, () => {
        const route = getEmployeeRoutes({ ...params, featureToggles })
          .find(config => config.name === name);

        expect(route)
          .toHaveProperty('path', `/:region/:businessId${path}`);
      });
    });

    describe('when nz payroll feature toggle is on', () => {
      const featureToggles = { isNZPayrollEnabled: true };

      it(`should have path of /au/:businessId${path}`, () => {
        const route = getEmployeeRoutes({ ...params, featureToggles })
          .find(config => config.name === name);

        expect(route)
          .toHaveProperty('path', `/au/:businessId${path}`);
      });
      it('should have a region of \'au\'', () => {
        const route = getEmployeeRoutes({ ...params, featureToggles })
          .find(config => config.name === name);

        expect(route)
          .toHaveProperty('defaultParams', { region: 'au' });
      });
    });
  });
});
