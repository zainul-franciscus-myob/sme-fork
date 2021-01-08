import { UPDATE_PERSONAL_DETAIL } from '../EmployeeDetailNzIntents';

const updatePersonalDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  personalDetail: {
    ...state.personalDetail,
    [action.key]: action.value,
  },
});

export default {
  [UPDATE_PERSONAL_DETAIL]: updatePersonalDetails,
};
