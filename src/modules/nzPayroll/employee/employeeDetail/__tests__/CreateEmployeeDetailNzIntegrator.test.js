import { LOAD_EMPLOYEE_DETAIL, UPDATE_EMPLOYEE } from '../../EmployeeNzIntents';
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
      const employeeDetailNzIntegrator = createEmployeeDetailNzIntegrator(
        { store, integration },
      );

      employeeDetailNzIntegrator.saveEmployeeDetails(
        { onSuccess, onFailure },
      );

      expect(integration.write).toHaveBeenCalledWith(expect.objectContaining({
        intent: UPDATE_EMPLOYEE,
        urlParams,
        content,
        onSuccess,
        onFailure,
      }));
    });
  });
});
