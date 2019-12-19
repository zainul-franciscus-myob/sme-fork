import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_MODAL,
  DELETE_ACCOUNT,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  LOAD_NEW_ACCOUNT_MODAL,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNT,
} from '../AccountIntents';
import createAccountModalResponse from './data/createAccountModalResponse';
import filteredAccountListResponse from './data/filterAccountListResponse';
import loadAccountDetail from './data/loadAccountDetail';
import loadNewAccountDetail from './data/loadNewAccountDetail';
import loadNewAccountModalResponse from './data/loadNewAccountModalResponse';
import success from './data/success.json';

const MemoryAccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(filteredAccountListResponse),
  [LOAD_NEW_ACCOUNT]: ({ onSuccess }) => onSuccess(loadNewAccountDetail),
  [LOAD_ACCOUNT_DETAIL]: ({ onSuccess }) => onSuccess(loadAccountDetail),
  [CREATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [DELETE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [UPDATE_ACCOUNT]: ({ onSuccess }) => onSuccess(success),
  [LOAD_NEW_ACCOUNT_MODAL]: ({ onSuccess }) => onSuccess(loadNewAccountModalResponse),
  [CREATE_ACCOUNT_MODAL]: ({ onSuccess }) => onSuccess(createAccountModalResponse),
};

export default MemoryAccountMapping;
