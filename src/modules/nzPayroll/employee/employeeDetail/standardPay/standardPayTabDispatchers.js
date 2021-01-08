import { UPDATE_WAGE_DETAIL } from '../EmployeeDetailNzIntents';

const standardPayTabDispatchers = (store) => ({
  updateWageDetails: ({ key, value, shouldFormat = false }) => {
    const intent = UPDATE_WAGE_DETAIL;
    store.dispatch({ intent, key, value, shouldFormat });
  },
});

export default standardPayTabDispatchers;
