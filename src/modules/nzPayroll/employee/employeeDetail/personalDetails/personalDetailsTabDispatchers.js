import { UPDATE_PERSONAL_DETAIL } from '../EmployeeDetailNzIntents';

const personalDetailsTabDispatchers = (store) => ({
  updatepersonalDetails: ({ key, value }) => {
    const intent = UPDATE_PERSONAL_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default personalDetailsTabDispatchers;
