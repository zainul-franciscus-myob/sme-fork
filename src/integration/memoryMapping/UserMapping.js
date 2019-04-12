import { LOAD_USER_LIST, SORT_USER_LIST } from '../../user/UserIntents';
import loadUserListResponse from '../data/user/loadUserList';
import sortUserListResponse from '../data/user/sortUserList';

const loadUserList = ({ onSuccess }) => onSuccess(loadUserListResponse);
const sortUserList = ({ onSuccess }) => onSuccess(sortUserListResponse);

const UserMapping = {
  [LOAD_USER_LIST]: loadUserList,
  [SORT_USER_LIST]: sortUserList,
};

export default UserMapping;
