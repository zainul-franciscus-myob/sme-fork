import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_MODAL,
  DELETE_ACCOUNT,
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_DETAIL,
  LOAD_ACCOUNT_LIST,
  LOAD_NEW_ACCOUNT,
  LOAD_NEW_ACCOUNT_MODAL,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNTS,
} from '../AccountIntents';
import bulkUpdateSuccess from './data/bulkUpdateSuccess';
import createAccountModalResponse from './data/createAccountModalResponse';
import filteredAccountListResponse from './data/filterAccountListResponse';
import loadAccountDetail from './data/loadAccountDetail';
import loadAccountListResponse from './data/loadAccountListResponse';
import loadNewAccountDetail from './data/loadNewAccountDetail';
import loadNewAccountModalResponse from './data/loadNewAccountModalResponse';
import success from './data/success.json';

const MemoryAccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: ({ onSuccess }) =>
    onSuccess(filteredAccountListResponse),
  [LOAD_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(loadAccountListResponse),
  [LOAD_NEW_ACCOUNT]: ({ onSuccess }) => onSuccess(loadNewAccountDetail),
  [LOAD_ACCOUNT_DETAIL]: ({ onSuccess }) => onSuccess(loadAccountDetail),
  [CREATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [DELETE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [UPDATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [LOAD_NEW_ACCOUNT_MODAL]: ({ onSuccess }) =>
    onSuccess(loadNewAccountModalResponse),
  [CREATE_ACCOUNT_MODAL]: ({ onSuccess }) =>
    onSuccess(createAccountModalResponse),
  [DELETE_ACCOUNTS]: ({ onSuccess }) => onSuccess(),
  [UPDATE_ACCOUNTS]: ({ onSuccess }) => onSuccess(bulkUpdateSuccess),
};

export default MemoryAccountMapping;
