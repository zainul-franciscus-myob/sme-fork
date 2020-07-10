import { LOAD_EMPLOYEE_LIST } from '../../EmployeeNzIntents';
import employeeListNzIntegrator from '../employeeListNzIntegrator';

describe('employeeListNzIntegrator', () => {
  it('should load employee list', () => {
    const businessId = 1234;
    const state = { businessId };
    const store = { getState: () => state };
    const integration = { read: jest.fn() };
    const onSuccess = () => {};
    const onFailure = () => {};

    const integrator = employeeListNzIntegrator({ store, integration });
    integrator.loadEmployeeList({ onSuccess, onFailure });

    expect(integration.read).toHaveBeenCalledWith(
      expect.objectContaining({
        intent: LOAD_EMPLOYEE_LIST,
        urlParams: { businessId },
        onSuccess,
        onFailure,
      })
    );
  });
});
