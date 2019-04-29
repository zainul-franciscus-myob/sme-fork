import { createSelector } from 'reselect';

import { LOAD_NEW_ADVISOR_DETAIL, LOAD_NEW_USER_DETAIL, LOAD_USER_DETAIL } from '../UserIntents';

const NEW_USER_PATH_COMPONENT = 'new';
const NEW_ADVISOR_PATH_COMPONENT = 'new-advisor';

export const getModalType = state => state.modalType;
export const isPageEdited = state => state.isPageEdited;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getIsSubmitting = state => state.isSubmitting;
export const getUser = state => state.user;
export const getUserId = state => state.userId;
export const getIsAdvisor = state => state.user.isAdvisor;

export const getIsCreating = state => [
  NEW_USER_PATH_COMPONENT,
  NEW_ADVISOR_PATH_COMPONENT,
].includes(getUserId(state));

export const getLoadUserIntent = state => (
  {
    [NEW_USER_PATH_COMPONENT]: LOAD_NEW_USER_DETAIL,
    [NEW_ADVISOR_PATH_COMPONENT]: LOAD_NEW_ADVISOR_DETAIL,
  }[getUserId(state)] || LOAD_USER_DETAIL
);

export const getPageHead = (state) => {
  const userType = getIsAdvisor(state) ? 'advisor' : 'user';
  const prefix = getIsCreating(state) ? 'Invite' : 'Edit';
  return `${prefix} ${userType}`;
};

export const getUserForCreate = (state) => {
  const { roles, ...userWithoutRoles } = state.user;
  return {
    ...userWithoutRoles,
    roleIds: state.user.roles
      .filter(role => role.selected)
      .map(role => Number(role.id)),
  };
};

export const getUserDetails = createSelector(
  getUser,
  getIsCreating,
  (user, isCreating) => ({
    ...user,
    isCreating,
  }),
);
