import { UPDATE_ARE_ALL_EMPLOYEES_SELECTED, UPDATE_IS_EMPLOYEE_SELECTED } from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createEmployeePayListDispatcher = store => ({
  ...createPayRunDispatchers(store),

  updateIsEmployeeSelected: (id) => {
    const intent = UPDATE_IS_EMPLOYEE_SELECTED;
    store.dispatch({ intent, id });
  },

  updateAreAllEmployeesSelected: ({ value }) => {
    const intent = UPDATE_ARE_ALL_EMPLOYEES_SELECTED;
    store.dispatch({ intent, value });
  },
});

export default createEmployeePayListDispatcher;
