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

  describe('saveEmployeeDetails', () => {
    it('should call integrator read with UPDATE_EMPLOYEE intent', () => {
      const businessId = 1234;
      const employeeId = 12;
      const contactDetail = {};
      const payrollDetails = {};

      const state = {
        businessId,
        employeeId,
        contactDetail,
        payrollDetails,
      };

      const store = { getState: () => state };
      const urlParams = { businessId, employeeId };
      const onSuccess = () => {};
      const onFailure = () => {};
      const content = { contactDetail, payrollDetails };

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
