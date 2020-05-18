import { LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';
import { getBusinessId } from './EmployeeListNzSelector';

const employeeListNzIntegrator = ({ store, integration }) => ({

  loadEmployeeList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYEE_LIST;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default employeeListNzIntegrator;
