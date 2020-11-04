import { LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';
import {
  getBusinessId,
  getLoadEmployeeListNextPageParams,
} from './EmployeeListNzSelector';

const employeeListNzIntegrator = ({ store, integration }) => ({
  loadEmployeeList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYEE_LIST;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    const params = {
      offset: 0,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
      params,
    });
  },

  loadEmployeeListNextPage: ({ onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYEE_LIST;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    const params = getLoadEmployeeListNextPageParams(store.getState());

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
      params,
    });
  },
});

export default employeeListNzIntegrator;
