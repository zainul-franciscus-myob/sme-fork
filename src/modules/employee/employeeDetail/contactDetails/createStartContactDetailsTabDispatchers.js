import { UPDATE_CONTACT_DETAILS } from '../../EmployeeIntents';
import createEmployeeDetailDispatcher from '../createEmployeeDetailDispatcher';

const createStartContactDetailsTabDispatchers = (store) => ({
  ...createEmployeeDetailDispatcher(store),

  updateContactDetails: ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAILS;
    store.dispatch({ intent, key, value });
  },
});

export default createStartContactDetailsTabDispatchers;
