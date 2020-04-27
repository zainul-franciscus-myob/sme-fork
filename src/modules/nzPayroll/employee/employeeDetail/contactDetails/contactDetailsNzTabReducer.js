import { UPDATE_CONTACT_DETAIL } from '../../EmployeeNzIntents';

const updateContactDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  contactDetail: {
    ...state.contactDetail,
    [action.key]: action.value,
  },
});

export default {
  [UPDATE_CONTACT_DETAIL]: updateContactDetails,
};
