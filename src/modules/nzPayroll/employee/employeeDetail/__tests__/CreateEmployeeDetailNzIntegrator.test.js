import { LOAD_EMPLOYEE_DETAIL } from '../../EmployeeNzIntents';
import createEmployeeDetailNzIntegrator from '../createEmployeeDetailNzIntegrator';

describe('createEmployeeDetailNzIntegrator', () => {
  describe('loadEmployeeDetails', () => {
    it('should call integrator read with LOAD_EMPLOYEE_DETAIL intent', () => {
      const businessId = 1234;
      const employeeId = 12;
      const state = {
        businessId,
        employeeId,
      };
      const store = { getState: () => state };
      const urlParams = { businessId, employeeId };
      const onSuccess = () => {};
      const onFailure = () => {};

      const integration = { read: jest.fn() };
      const employeeDetailNzIntegrator = createEmployeeDetailNzIntegrator(
        { store, integration },
      );

      employeeDetailNzIntegrator.loadEmployeeDetails(
        { onSuccess, onFailure },
      );

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_EMPLOYEE_DETAIL,
        urlParams,
        onSuccess,
        onFailure,
      }));
    });
  });
});
