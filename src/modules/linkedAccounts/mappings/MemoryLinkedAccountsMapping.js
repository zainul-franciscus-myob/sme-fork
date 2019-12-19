import { LOAD_LINKED_ACCOUNTS, SAVE_LINKED_ACCOUNTS } from '../LinkedAccountsIntents';
import loadLinkedAccountsResponse from './data/loadLinkedAccounts';
import successResponse from './data/success.json';

const loadLinkedAccounts = ({ onSuccess }) => onSuccess(loadLinkedAccountsResponse);
const saveLinkedAccounts = ({ onSuccess }) => onSuccess(successResponse);

const MemoryLinkedAccountsMapping = {
  [LOAD_LINKED_ACCOUNTS]: loadLinkedAccounts,
  [SAVE_LINKED_ACCOUNTS]: saveLinkedAccounts,
};

export default MemoryLinkedAccountsMapping;
