import {
  CREATE_USER,
  DELETE_USER,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  LOAD_USER_LIST,
  SORT_USER_LIST,
  UPDATE_USER,
} from '../../user/UserIntents';
import loadEmptyAdvisorDetailResponse from '../data/user/loadAdvisorDetail';
import loadEmptyUserDetailResponse from '../data/user/loadUserDetail';
import loadUserListResponse from '../data/user/loadUserList';
import sortUserListResponse from '../data/user/sortUserList';
import success from '../data/success';
import userDetailResponse from '../data/user/userDetailEntry';

const loadUserList = ({ onSuccess }) => onSuccess(loadUserListResponse);
const sortUserList = ({ onSuccess }) => onSuccess(sortUserListResponse);
const loadEmptyUserDetail = ({ onSuccess }) => onSuccess(loadEmptyUserDetailResponse);
const loadEmptyAdvisorDetail = ({ onSuccess }) => onSuccess(loadEmptyAdvisorDetailResponse);
const createUser = ({ onSuccess }) => onSuccess(success);
const updateUser = ({ onSuccess }) => onSuccess(success);
const deleteUser = ({ onSuccess }) => onSuccess(success);
const loadUserDetail = ({ onSuccess }) => onSuccess(userDetailResponse);

const UserMapping = {
  [LOAD_USER_LIST]: loadUserList,
  [SORT_USER_LIST]: sortUserList,
  [LOAD_NEW_USER_DETAIL]: loadEmptyUserDetail,
  [LOAD_NEW_ADVISOR_DETAIL]: loadEmptyAdvisorDetail,
  [CREATE_USER]: createUser,
  [UPDATE_USER]: updateUser,
  [DELETE_USER]: deleteUser,
  [LOAD_USER_DETAIL]: loadUserDetail,
};

export default UserMapping;
