import { UPDATE_CONTACT_DETAIL } from '../EmployeeDetailIntents';

const contactDetailsTabDispatchers = (store) => ({
  updateContactDetails: ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default contactDetailsTabDispatchers;
