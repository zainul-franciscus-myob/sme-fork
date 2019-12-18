import {
  UPDATE_CONTACT_DETAILS,
} from '../../EmployeeIntents';

const updateContactDetails = (state, action) => ({
  ...state,
  contactDetail: {
    ...state.contactDetail,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

export default {
  [UPDATE_CONTACT_DETAILS]: updateContactDetails,
};
