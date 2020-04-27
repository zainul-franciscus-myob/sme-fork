import { UPDATE_CONTACT_DETAIL } from '../../EmployeeNzIntents';

const createContactDetailsTabDispatchers = store => ({
  updateContactDetails: ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default createContactDetailsTabDispatchers;
