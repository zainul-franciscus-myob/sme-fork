import {
  LOAD_EMPLOYEE_LIST,
  SORT_AND_FILTER_EMPLOYEE_LIST,
} from '../EmployeeNzIntents';
import {
  getBusinessId,
  getFilterEmployeeListNextPageParams,
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

  sortAndFilterEmployeeList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_EMPLOYEE_LIST;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFilterEmployeeListNextPageParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default employeeListNzIntegrator;
