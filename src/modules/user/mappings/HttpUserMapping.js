import {
  CANCEL_INVITATION,
  CREATE_USER,
  DELETE_USER,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  LOAD_USER_LIST,
  REMOVE_PRACTICE_ACCESS,
  REMOVE_USER_ACCESS,
  RESEND_INVITATION,
  UPDATE_USER,
} from '../UserIntents';

const HttpUserMapping = {
  [LOAD_USER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/load_user_list`,
  },
  [LOAD_NEW_USER_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/load_new_user`,
  },
  [LOAD_NEW_ADVISOR_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/load_new_advisor`,
  },
  [CREATE_USER]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/user/create_user`,
  },
  [UPDATE_USER]: {
    method: 'PUT',
    getPath: ({ businessId, userId }) =>
      `/${businessId}/user/update_user/${userId}`,
  },
  [DELETE_USER]: {
    method: 'DELETE',
    getPath: ({ businessId, userId }) =>
      `/${businessId}/user/delete_user/${userId}`,
  },
  [LOAD_USER_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, userId }) =>
      `/${businessId}/user/load_user/${userId}`,
  },
  [REMOVE_PRACTICE_ACCESS]: {
    method: 'DELETE',
    getPath: ({ businessId, practiceId }) =>
      `/${businessId}/user/remove_practice/${practiceId}`,
  },
  [REMOVE_USER_ACCESS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/user/remove_access`,
  },
  [CANCEL_INVITATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invitation/cancel`,
  },
  [RESEND_INVITATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invitation/resend`,
  },
};

export default HttpUserMapping;
