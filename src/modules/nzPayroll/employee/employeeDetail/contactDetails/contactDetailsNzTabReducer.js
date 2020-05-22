import { UPDATE_CONTACT_DETAIL } from '../EmployeeDetailIntents';

const updateContactDetails = (state, action) => ({
  ...state,

  userInterface: {
    ...state.userInterface,
    isPageEdited: true,
  },

  contactDetail: {
    ...state.contactDetail,
    [action.key]: action.value,
  },
});

export default {
  [UPDATE_CONTACT_DETAIL]: updateContactDetails,
};
