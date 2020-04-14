import { LOAD_EMPLOYEE_LIST } from '../../EmployeeNzIntents';
import createEmployeeListNzIntegrator from '../createEmployeeListNzIntegrator';

describe('createEmployeeListNzIntegrator', () => {
  it('should load employee list', () => {
    const businessId = 1234;
    const state = { businessId };
    const store = { getState: () => state };
    const integration = { read: jest.fn() };
    const onSuccess = () => {};
    const onFailure = () => {};

    const employeeListNzIntegrator = createEmployeeListNzIntegrator({ store, integration });
    employeeListNzIntegrator.loadEmployeeList({ onSuccess, onFailure });

    expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
      intent: LOAD_EMPLOYEE_LIST,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    }));
  });
});
