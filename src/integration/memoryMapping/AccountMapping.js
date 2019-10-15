import {
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../../account/AccountListIntents';
import filteredAccountListResponse from '../data/account/filterAccountListResponse';

const AccountMapping = {
  [SORT_AND_FILTER_ACCOUNT_LIST]: ({ onSuccess }) => onSuccess(filteredAccountListResponse),
};

export default AccountMapping;
