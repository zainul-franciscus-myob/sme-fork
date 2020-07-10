import {
  LOAD_NEW_ACCOUNT_MODAL,
  PAD_ACCOUNT_NUMBER,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_ACCOUNT_DETAILS,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_BANKING_DETAILS,
  UPDATE_DETAIL_ACCOUNT_TYPE,
} from '../AccountIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import accountTypeToCashFlowClassificationMapping from '../accountTypeToCashFlowClassificationMapping.json';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  accountClassifications: [],
  cashFlowClassifications: [],
  headerAccounts: [],
  taxCodes: [],
  isFlexAccount: true,
  detail: {
    id: '',
    accountClassification: '',
    accountType: '',
    parentAccountId: '',
    accountNumber: '',
    accountName: '',
    openingBalance: '0.00',
    taxCodeId: '',
    notes: '',
    cashFlowClassification: '',
    bankingDetails: {},
  },
  readonly: {
    accountNumberPrefix: '',
  },
  isOpen: false,
  isLoading: false,
  isSubmitting: false,
  alertMessage: '',
  isPageEdited: false,
  businessId: '',
  region: '',
  accountId: '',
});

const setInitialState = (state, action) => ({
  ...getDefaultState(),
  ...action.context,
  isOpen: true,
});

const resetState = () => getDefaultState();

const pageEdited = { isPageEdited: true };

const loadNewAccountModal = (state, action) => {
  const classification =
    action.accountClassifications.find(
      (accountClass) =>
        accountClass.value === action.account.accountClassification
    ) || {};

  return {
    ...state,

    detail: {
      ...state.detail,
      ...action.detail,
    },
    readonly: {
      ...state.readonly,
      accountNumberPrefix: classification.accountNumberPrefix || '',
    },
    accountClassifications: action.accountClassifications,
    cashFlowClassifications: action.cashFlowClassifications,
    headerAccounts: action.headerAccounts,
    taxCodes: action.taxCodes,
    isFlexAccount: action.isFlexAccount,
  };
};

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const updateAccountDetails = (state, action) => ({
  ...state,
  detail: {
    ...state.detail,
    [action.key]: action.value,
  },
  ...pageEdited,
});
const updateFlexAccountNumber = (state, action) => {
  const { value } = action;
  const maxLength = value.length <= 10;
  return maxLength ? updateAccountDetails(state, action) : state;
};

const updateNonFlexAccountNumber = (state, action) => {
  const { value } = action;
  const { accountNumberPrefix } = state.readonly;
  const startsWithPrefix = value.startsWith(accountNumberPrefix);
  const onlyNumeric = new RegExp('^[0-9]*$').test(
    value.substr(accountNumberPrefix.length)
  );
  const maxLength = value.length <= accountNumberPrefix.length + 4;
  return startsWithPrefix && onlyNumeric && maxLength
    ? updateAccountDetails(state, action)
    : state;
};
const updateAccountNumber = (state, action) => {
  const { isFlexAccount } = state;
  return isFlexAccount
    ? updateFlexAccountNumber(state, action)
    : updateNonFlexAccountNumber(state, action);
};

const padAccountNumber = (state, action) => {
  if (state.isFlexAccount) {
    return state;
  }
  const { accountNumberPrefix } = state.readonly;
  const autoCompletedNumber = action.value.padEnd(
    accountNumberPrefix.length + 4,
    '0'
  );
  return updateAccountDetails(state, { ...action, value: autoCompletedNumber });
};

const updateBankingDetails = (state, action) => ({
  ...state,
  detail: {
    ...state.detail,
    bankingDetails: {
      ...state.detail.bankingDetails,
      [action.key]: action.value,
    },
  },
  ...pageEdited,
});

const getNewParentAccountId = (state, accountClassification) => {
  const currentHeader = state.headerAccounts.find(
    ({ id }) => id === state.detail.parentAccountId
  ) || { accountClassification: '' };
  return currentHeader.accountClassification === accountClassification
    ? state.detail.parentAccountId
    : '';
};

const updateAccountNumberWithPrefix = (state, prefix) => {
  if (state.isFlexAccount) {
    return state.detail.accountNumber;
  }
  return prefix.concat(
    state.detail.accountNumber.substr(state.readonly.accountNumberPrefix.length)
  );
};

const updateAccountType = (state, action) => {
  // finds the account classification that contains the currently selected accountType
  const findAccountClassificationforType = (classifications, selectedType) =>
    classifications.find(
      (classification) =>
        classification.value === selectedType ||
        (classification.type &&
          classification.type.some((type) => type.value === selectedType))
    );

  const accountClassification = findAccountClassificationforType(
    state.accountClassifications,
    action.value
  );
  const prefix = accountClassification.accountNumberPrefix || '';
  return {
    ...state,
    detail: {
      ...state.detail,
      accountClassification: accountClassification.value,
      accountType: action.value,
      cashFlowClassification:
        accountTypeToCashFlowClassificationMapping[action.value] || '',
      accountNumber: updateAccountNumberWithPrefix(state, prefix),
      parentAccountId: getNewParentAccountId(
        state,
        accountClassification.value
      ),
    },
    readonly: {
      ...state.readonly,
      accountNumberPrefix: prefix,
    },
    ...pageEdited,
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_NEW_ACCOUNT_MODAL]: loadNewAccountModal,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_ACCOUNT_DETAILS]: updateAccountDetails,
  [UPDATE_ACCOUNT_NUMBER]: updateAccountNumber,
  [PAD_ACCOUNT_NUMBER]: padAccountNumber,
  [UPDATE_BANKING_DETAILS]: updateBankingDetails,
  [UPDATE_DETAIL_ACCOUNT_TYPE]: updateAccountType,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlertMessage,
  [SET_INITIAL_STATE]: setInitialState,
};

const accountModalReducer = createReducer(getDefaultState(), handlers);

export default accountModalReducer;
