import {
  LOAD_BANK_FEED_APPLICATION_DATA,
  RESET_ACCOUNT_INFORMATION_STATE,
  SET_ACCOUNT_NAME_REQUIRED,
  SET_ACCOUNT_NUMBER_REQUIRED,
  SET_ACCOUNT_SUFFIX_REQUIRED,
  SET_ACCOUNT_TYPE_REQUIRED,
  SET_ALERT,
  SET_APPLICATION_PREFERENCE,
  SET_BRANCH_NAME_REQUIRED,
  SET_BSB_BANK_REQUIRED,
  SET_BSB_BRANCH_REQUIRED,
  SET_BSB_REQUIRED,
  SET_IS_SUBMITTING, SET_LAST_FOUR_DIGITS_REQUIRED,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
  SET_NAME_ON_CARD_REQUIRED,
  SET_NOTES_STATE,
  SET_ONLINE_APPLICATION_SUPPORTED_STATE,
  SET_PAPER_APPLICATION_SUPPORTED_STATE,
  SUBMIT_BANK_FEED_APPLICATION,
  UPDATE_FORM,
} from './BankFeedsCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  accountName: '',
  accountNameRequired: false,
  accountNumber: '',
  accountNumberRequired: false,
  accountSuffix: '',
  accountSuffixRequired: false,
  accountType: 'Trading Account',
  accountTypeRequired: false,
  alert: '',
  applicationPreference: '',
  branchName: '',
  branchNameRequired: false,
  bsb: '',
  bsbBank: '',
  bsbBankRequired: false,
  bsbBranch: '',
  bsbBranchRequired: false,
  bsbRequired: false,
  businessId: '',
  confirmedApplication: false,
  financialInstitution: '',
  financialInstitutions: {
    bankAccounts: [],
    creditCards: [],
  },
  hasOnlineApplication: false,
  hasPaperApplication: false,
  isModalOpen: false,
  isSubmitting: false,
  lastFourDigits: '',
  lastFourDigitsRequired: false,
  loadingState: LoadingState.LOADING,
  nameOnCard: '',
  nameOnCardRequired: false,
  notes: '',
  region: '',
  serialNumber: '',
  cdfGuid: '',
});

const loadBankFeedApplicationData = (state, financialInstitutions) => ({
  ...state,
  financialInstitutions: {
    bankAccounts: financialInstitutions.bankAccounts,
    creditCards: financialInstitutions.creditCards,
  },
});

const submitBankFeedApplication = (state, { financialInstitutions }) => ({
  ...state,
  financialInstitutions,
});

const resetAccountInformationState = (state) => ({
  ...state,
  accountNameRequired: false,
  accountNumberRequired: false,
  accountSuffixRequired: false,
  accountTypeRequired: false,
  applicationPreference: '',
  branchNameRequired: false,
  bsbBankRequired: false,
  bsbBranchRequired: false,
  bsbRequired: false,
  hasOnlineApplication: false,
  hasPaperApplication: false,
  lastFourDigitsRequired: false,
  nameOnCardRequired: false,
  notes: '',
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setAccountNameRequiredState = (state, { accountNameRequired }) => ({
  ...state,
  accountNameRequired,
});

const setAccountNumberRequiredState = (state, { accountNumberRequired }) => ({
  ...state,
  accountNumberRequired,
});

const setAccountSuffixRequiredState = (state, { accountSuffixRequired }) => ({
  ...state,
  accountSuffixRequired,
});

const setAccountTypeRequiredState = (state, { accountTypeRequired }) => ({
  ...state,
  accountTypeRequired,
});

const setApplicationPreferenceState = (state, { applicationPreference }) => ({
  ...state,
  applicationPreference,
});

const setBranchNameRequiredState = (state, { branchNameRequired }) => ({
  ...state,
  branchNameRequired,
});

const setBsbBankRequiredState = (state, { bsbBankRequired }) => ({
  ...state,
  bsbBankRequired,
});

const setBsbBranchRequiredState = (state, { bsbBranchRequired }) => ({
  ...state,
  bsbBranchRequired,
});

const setBsbRequiredState = (state, { bsbRequired }) => ({
  ...state,
  bsbRequired,
});

const setNameOnCardRequiredState = (state, { nameOnCardRequired }) => ({
  ...state,
  nameOnCardRequired,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setLastFourDigitsRequiredState = (state, { lastFourDigitsRequired }) => ({
  ...state,
  lastFourDigitsRequired,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setModalState = (state) => ({
  ...state,
  isModalOpen: !state.isModalOpen,
});

const setNotesState = (state, { notes }) => ({
  ...state,
  notes,
});

const setOnlineApplicationSupportedState = (state, { param }) => ({
  ...state,
  hasOnlineApplication: param,
});

const setPaperApplicationSupportedState = (state, { param }) => ({
  ...state,
  hasPaperApplication: param,
});

const updateForm = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const handlers = {
  [LOAD_BANK_FEED_APPLICATION_DATA]: loadBankFeedApplicationData,
  [SUBMIT_BANK_FEED_APPLICATION]: submitBankFeedApplication,
  [RESET_ACCOUNT_INFORMATION_STATE]: resetAccountInformationState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_ACCOUNT_NAME_REQUIRED]: setAccountNameRequiredState,
  [SET_ACCOUNT_NUMBER_REQUIRED]: setAccountNumberRequiredState,
  [SET_ACCOUNT_SUFFIX_REQUIRED]: setAccountSuffixRequiredState,
  [SET_ACCOUNT_TYPE_REQUIRED]: setAccountTypeRequiredState,
  [SET_APPLICATION_PREFERENCE]: setApplicationPreferenceState,
  [SET_BRANCH_NAME_REQUIRED]: setBranchNameRequiredState,
  [SET_BSB_BANK_REQUIRED]: setBsbBankRequiredState,
  [SET_BSB_BRANCH_REQUIRED]: setBsbBranchRequiredState,
  [SET_BSB_REQUIRED]: setBsbRequiredState,
  [SET_LAST_FOUR_DIGITS_REQUIRED]: setLastFourDigitsRequiredState,
  [SET_NAME_ON_CARD_REQUIRED]: setNameOnCardRequiredState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setModalState,
  [SET_ONLINE_APPLICATION_SUPPORTED_STATE]: setOnlineApplicationSupportedState,
  [SET_NOTES_STATE]: setNotesState,
  [SET_PAPER_APPLICATION_SUPPORTED_STATE]: setPaperApplicationSupportedState,
  [UPDATE_FORM]: updateForm,

};

const BankFeedsCreateReducer = createReducer(getDefaultState(), handlers);

export default BankFeedsCreateReducer;
