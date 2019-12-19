import {
  CREATE_USER, DELETE_USER,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL, LOAD_USER_DETAIL,
  LOAD_USER_LIST,
  SORT_USER_LIST,
  UPDATE_USER,
} from '../UserIntents';

const HttpUserMapping = {
  [LOAD_USER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/load_user_list`,
  },
  [SORT_USER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/sort_user_list`,
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
    getPath: ({ businessId, userId }) => `/${businessId}/user/update_user/${userId}`,
  },
  [DELETE_USER]: {
    method: 'DELETE',
    getPath: ({ businessId, userId }) => `/${businessId}/user/delete_user/${userId}`,
  },
  [LOAD_USER_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, userId }) => `/${businessId}/user/load_user/${userId}`,
  },
};

export default HttpUserMapping;
