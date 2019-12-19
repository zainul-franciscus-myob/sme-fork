import {
  CREATE_USER,
  DELETE_USER,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  LOAD_USER_LIST,
  SORT_USER_LIST,
  UPDATE_USER,
} from '../UserIntents';
import loadEmptyAdvisorDetailResponse from './data/loadAdvisorDetail';
import loadEmptyUserDetailResponse from './data/loadUserDetail';
import loadUserListResponse from './data/loadUserList';
import sortUserListResponse from './data/sortUserList';
import success from './data/success.json';
import userDetailResponse from './data/userDetailEntry';

const loadUserList = ({ onSuccess }) => onSuccess(loadUserListResponse);
const sortUserList = ({ onSuccess }) => onSuccess(sortUserListResponse);
const loadEmptyUserDetail = ({ onSuccess }) => onSuccess(loadEmptyUserDetailResponse);
const loadEmptyAdvisorDetail = ({ onSuccess }) => onSuccess(loadEmptyAdvisorDetailResponse);
const createUser = ({ onSuccess }) => onSuccess(success);
const updateUser = ({ onSuccess }) => onSuccess(success);
const deleteUser = ({ onSuccess }) => onSuccess(success);
const loadUserDetail = ({ onSuccess }) => onSuccess(userDetailResponse);

const MemoryUserMapping = {
  [LOAD_USER_LIST]: loadUserList,
  [SORT_USER_LIST]: sortUserList,
  [LOAD_NEW_USER_DETAIL]: loadEmptyUserDetail,
  [LOAD_NEW_ADVISOR_DETAIL]: loadEmptyAdvisorDetail,
  [CREATE_USER]: createUser,
  [UPDATE_USER]: updateUser,
  [DELETE_USER]: deleteUser,
  [LOAD_USER_DETAIL]: loadUserDetail,
};

export default MemoryUserMapping;
