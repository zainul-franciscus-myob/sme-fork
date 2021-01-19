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
import loadEmptyAdvisorDetailResponse from './data/loadAdvisorDetail';
import loadEmptyUserDetailResponse from './data/loadUserDetail';
import loadUserListResponse from './data/loadUserList';
import success from './data/success.json';
import userDetailResponse from './data/userDetailEntry';

const loadUserList = ({ onSuccess }) => onSuccess(loadUserListResponse);
const loadEmptyUserDetail = ({ onSuccess }) =>
  onSuccess(loadEmptyUserDetailResponse);
const loadEmptyAdvisorDetail = ({ onSuccess }) =>
  onSuccess(loadEmptyAdvisorDetailResponse);
const createUser = ({ onSuccess }) => onSuccess(success);
const updateUser = ({ onSuccess }) => onSuccess(success);
const deleteUser = ({ onSuccess }) => onSuccess(success);
const loadUserDetail = ({ onSuccess }) => onSuccess(userDetailResponse);
const cancelInvitation = ({ onSuccess }) => onSuccess(success);
const resendInvitation = ({ onSuccess }) => onSuccess(success);
const removeAccess = ({ onSuccess }) => onSuccess(success);
const removePracticeAccess = ({ onSuccess }) => onSuccess(success);

const MemoryUserMapping = {
  [LOAD_USER_LIST]: loadUserList,
  [LOAD_NEW_USER_DETAIL]: loadEmptyUserDetail,
  [LOAD_NEW_ADVISOR_DETAIL]: loadEmptyAdvisorDetail,
  [CREATE_USER]: createUser,
  [UPDATE_USER]: updateUser,
  [DELETE_USER]: deleteUser,
  [LOAD_USER_DETAIL]: loadUserDetail,
  [REMOVE_USER_ACCESS]: removeAccess,
  [REMOVE_PRACTICE_ACCESS]: removePracticeAccess,
  [CANCEL_INVITATION]: cancelInvitation,
  [RESEND_INVITATION]: resendInvitation,
};

export default MemoryUserMapping;
