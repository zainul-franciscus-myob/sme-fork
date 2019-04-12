import { LOAD_USER_LIST, SORT_USER_LIST } from '../../user/UserIntents';

const UserMapping = {
  [LOAD_USER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/load_user_list`,
  },
  [SORT_USER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/user/sort_user_list`,
  },
};

export default UserMapping;
