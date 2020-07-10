import { UPDATE_EMPLOYMENT_DETAIL } from '../EmployeeDetailIntents';

const employmentDetailsDispatcher = (store) => ({
  updateEmploymentDetails: ({ key, value }) => {
    const intent = UPDATE_EMPLOYMENT_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default employmentDetailsDispatcher;
