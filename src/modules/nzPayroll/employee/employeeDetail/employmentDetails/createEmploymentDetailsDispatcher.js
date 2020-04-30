import { UPDATE_EMPLOYMENT_DETAIL } from './employementDetailsIntents';

const createEmploymentDetailsDispatchers = store => ({
  updateEmploymentDetails: ({ key, value }) => {
    const intent = UPDATE_EMPLOYMENT_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default createEmploymentDetailsDispatchers;
