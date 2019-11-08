import {
  CLOSE_MODAL,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  OPEN_MODAL,
  PAD_ACCOUNT_NUMBER,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_ACCOUNT_CATEGORY,
  UPDATE_ACCOUNT_DETAILS,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_BANKING_DETAILS,
  UPDATE_DETAIL_ACCOUNT_TYPE,
  UPDATE_HEADER_ACCOUNT_TYPE,
} from '../AccountIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import accountClassificationToAccountTypeMapping from './accountClassificationToAccountTypeMapping.json';
import accountTypeToCashFlowClassificationMapping from './accountTypeToCashFlowClassificationMapping.json';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  accountClassifications: [],
  cashFlowClassifications: [],
  headerAccounts: [],
  taxCodes: [],
  isFlexAccount: true,
  isHeader: false,
  detail: {
    id: '',
    isHeader: false,
    accountClassification: '',
    accountType: '',
    parentAccountId: '',
    accountNumber: '',
    accountName: '',
    openingBalance: '0.00',
    taxCodeId: '',
    notes: '',
    cashFlowClassification: '',
    isActive: true,
    bankingDetails: {},
  },
  header: {
    id: '',
    isHeader: true,
    accountClassification: '',
    cashFlowClassification: '',
    accountType: '',
    parentAccountId: '',
    accountNumber: '',
    accountName: '',
    notes: '',
    isSubtotalReportable: false,
  },
  readonly: {
    accountNumberPrefix: '',
    linkedAccount: '',
    currentBalance: '',
  },
  isLoading: false,
  isSubmitting: false,
  modalType: '',
  alertMessage: '',
  isPageEdited: false,
  businessId: '',
  region: '',
  accountId: '',
});

const resetState = () => getDefaultState();
const pageEdited = { isPageEdited: true };
const getAccountKey = state => (state.isHeader ? 'header' : 'detail');

const loadAccountDetail = (state, action) => {
  const { isHeader } = action;
  const detail = !isHeader && action.account;
  const header = isHeader && action.account;

  const classification = action.accountClassifications.find(
    accountClass => accountClass.value === action.account.accountClassification,
  ) || {};

  return {
    ...state,

    detail: {
      ...state.detail,
      ...detail,
    },
    header: {
      ...state.header,
      ...header,
    },
    readonly: {
      ...state.readonly,
      ...action.readonly,
      accountNumberPrefix: classification.accountNumberPrefix || '',
    },
    accountClassifications: action.accountClassifications,
    cashFlowClassifications: action.cashFlowClassifications,
    headerAccounts: action.headerAccounts,
    taxCodes: action.taxCodes,
    isFlexAccount: action.isFlexAccount,
    isHeader: action.isHeader,
  };
};

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const updateAccountDetails = (state, action) => {
  const key = getAccountKey(state);
  return {
    ...state,
    [key]: {
      ...state[key],
      [action.key]: action.value,
    },
    ...pageEdited,
  };
};
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
    value.substr(accountNumberPrefix.length),
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
    '0',
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
  const key = getAccountKey(state);
  const currentHeader = state.headerAccounts.find(
    ({ id }) => id === state[key].parentAccountId,
  ) || { accountClassification: '' };
  return currentHeader.accountClassification === accountClassification
    ? state[key].parentAccountId
    : '';
};

const updateAccountNumberWithPrefix = (state, prefix) => {
  const key = getAccountKey(state);
  if (state.isFlexAccount) {
    return state[key].accountNumber;
  }
  return prefix.concat(
    state[key].accountNumber.substr(state.readonly.accountNumberPrefix.length),
  );
};

const updateHeaderAccountType = (state, action) => {
  const classification = state.accountClassifications.find(({ value }) => action.value === value)
    || {};
  const prefix = classification.accountNumberPrefix || '';

  return {
    ...state,
    header: {
      ...state.header,
      accountClassification: action.value,
      accountType: accountClassificationToAccountTypeMapping[action.value],
      accountNumber: updateAccountNumberWithPrefix(state, prefix),
      parentAccountId: getNewParentAccountId(state, action.value),
    },
    readonly: {
      ...state.readonly,
      accountNumberPrefix: prefix,
    },
    ...pageEdited,
  };
};

const updateDetailAccountType = (state, action) => {
  // finds the account classification that contains the currently selected accountType
  const findAccountClassificationforType = (classifications, selectedType) => classifications.find(
    classification => classification.value === selectedType
        || (classification.type
          && classification.type.some(type => type.value === selectedType)),
  );

  const accountClassification = findAccountClassificationforType(
    state.accountClassifications,
    action.value,
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
      parentAccountId: getNewParentAccountId(state, accountClassification.value),
    },
    readonly: {
      ...state.readonly,
      accountNumberPrefix: prefix,
    },
    ...pageEdited,
  };
};

const mergeHeaderIntoDetail = (state) => {
  const { isSubtotalReportable, isHeader, ...commonValues } = state.header;
  return {
    ...state,
    detail: {
      ...state.detail,
      ...commonValues,
    },
  };
};
const mergeDetailIntoHeader = (state) => {
  const {
    accountType,
    isHeader,
    openingBalance,
    taxCodeId,
    classification: showCashFlow,
    isInactive,
    bankDetails,
    ...commonValues
  } = state.detail;
  return {
    ...state,
    header: {
      ...state.header,
      accountType:
        accountClassificationToAccountTypeMapping[
          commonValues.accountClassification
        ],
      ...commonValues,
    },
  };
};

const updateAccountCategory = (state, action) => {
  const newState = {
    ...state,
    isHeader: action.value,
    ...pageEdited,
  };
  return action.value
    ? mergeDetailIntoHeader(newState)
    : mergeHeaderIntoDetail(newState);
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_NEW_ACCOUNT]: loadAccountDetail,
  [LOAD_ACCOUNT_DETAIL]: loadAccountDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_ACCOUNT_DETAILS]: updateAccountDetails,
  [UPDATE_ACCOUNT_NUMBER]: updateAccountNumber,
  [PAD_ACCOUNT_NUMBER]: padAccountNumber,
  [UPDATE_ACCOUNT_CATEGORY]: updateAccountCategory,
  [UPDATE_BANKING_DETAILS]: updateBankingDetails,
  [UPDATE_HEADER_ACCOUNT_TYPE]: updateHeaderAccountType,
  [UPDATE_DETAIL_ACCOUNT_TYPE]: updateDetailAccountType,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_INITIAL_STATE]: setInitialState,
};

const accountDetailReducer = createReducer(getDefaultState(), handlers);

export default accountDetailReducer;
