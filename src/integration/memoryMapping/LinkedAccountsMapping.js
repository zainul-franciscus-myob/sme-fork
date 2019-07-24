import { LOAD_LINKED_ACCOUNTS, SAVE_LINKED_ACCOUNTS } from '../../linkedAccounts/LinkedAccountsIntents';
import loadLinkedAccountsResponse from '../data/linkedAccounts/loadLinkedAccounts';
import successResponse from '../data/success';

const loadLinkedAccounts = ({ onSuccess }) => onSuccess(loadLinkedAccountsResponse);
const saveLinkedAccounts = ({ onSuccess }) => onSuccess(successResponse);

const LinkedAccountsMapping = {
  [LOAD_LINKED_ACCOUNTS]: loadLinkedAccounts,
  [SAVE_LINKED_ACCOUNTS]: saveLinkedAccounts,
};

export default LinkedAccountsMapping;
