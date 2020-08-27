import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_LINKED_ACCOUNTS,
  SAVE_LINKED_ACCOUNTS,
} from '../LinkedAccountsIntents';
import loadCreatedAccountResponse from './data/loadCreatedAccountResponse';
import loadLinkedAccountsResponse from './data/loadLinkedAccounts';
import successResponse from './data/success.json';

const MemoryLinkedAccountsMapping = {
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadCreatedAccountResponse),
  [LOAD_LINKED_ACCOUNTS]: ({ onSuccess }) =>
    onSuccess(loadLinkedAccountsResponse),
  [SAVE_LINKED_ACCOUNTS]: ({ onSuccess }) => onSuccess(successResponse),
};

export default MemoryLinkedAccountsMapping;
