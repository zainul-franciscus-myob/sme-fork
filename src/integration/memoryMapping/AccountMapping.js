import {
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  SORT_AND_FILTER_ACCOUNT_LIST, UPDATE_ACCOUNT,
} from '../../account/AccountIntents';
import filteredAccountListResponse from '../data/account/filterAccountListResponse';
import loadAccountDetail from '../data/account/loadAccountDetail';
import loadNewAccountDetail from '../data/account/loadNewAccountDetail';
import success from '../data/success';

const AccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(filteredAccountListResponse),
  [LOAD_NEW_ACCOUNT]: ({ onSuccess }) => onSuccess(loadNewAccountDetail),
  [LOAD_ACCOUNT_DETAIL]: ({ onSuccess }) => onSuccess(loadAccountDetail),
  [CREATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [DELETE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [UPDATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
};

export default AccountMapping;
