import {
  LOAD_ACCOUNT_LIST,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../../account/AccountListIntents';
import filteredAccountListResponse from '../data/account/filterAccountListResponse';
import loadAccountListResponse from '../data/account/loadAccountListResponse';

const AccountMapping = {
  [LOAD_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(loadAccountListResponse),
  [SORT_AND_FILTER_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(filteredAccountListResponse),
};

export default AccountMapping;
