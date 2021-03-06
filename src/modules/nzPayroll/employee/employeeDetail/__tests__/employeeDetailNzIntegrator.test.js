import { LOAD_EMPLOYEE_DETAIL, UPDATE_EMPLOYEE } from '../../EmployeeNzIntents';
import employeeDetailNzIntegrator from '../employeeDetailNzIntegrator';

describe('employeeDetailNzIntegrator', () => {
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
      const integrator = employeeDetailNzIntegrator({ store, integration });

      integrator.loadEmployeeDetails({ onSuccess, onFailure });

      expect(integration.read).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: LOAD_EMPLOYEE_DETAIL,
          urlParams,
          onSuccess,
          onFailure,
        })
      );
    });
  });

  describe('createOrSaveEmployeeDetails', () => {
    it('should call integrator read with SAVE_EMPLOYEE_DETAIL intent', () => {
      const businessId = 1234;
      const employeeId = 12;
      const personalDetail = {};
      const payrollDetails = {};

      const state = {
        businessId,
        employeeId,
        personalDetail,
        payrollDetails,
      };

      const store = { getState: () => state };
      const urlParams = { businessId, employeeId };
      const onSuccess = () => {};
      const onFailure = () => {};
      const content = { personalDetail, payrollDetails };

      const integration = { write: jest.fn(), read: jest.fn() };
      const integrator = employeeDetailNzIntegrator({ store, integration });

      integrator.createOrSaveEmployeeDetails({ onSuccess, onFailure });

      expect(integration.write).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: UPDATE_EMPLOYEE,
          urlParams,
          content,
          onSuccess,
          onFailure,
        })
      );
    });
  });
});
