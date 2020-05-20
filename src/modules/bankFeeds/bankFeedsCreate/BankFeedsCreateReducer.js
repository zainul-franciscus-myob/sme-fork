import {
  LOAD_BANK_FEED_APPLICATION_DATA,
  SET_ACCOUNT_TYPE,
  SET_ALERT,
  SET_APPLICATION_PREFERENCE,
  SET_FINANCIAL_INSTITUTION, SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
  SET_NOTES_STATE,
  SUBMIT_BANK_FEED_APPLICATION,
  UPDATE_FORM,
} from './BankFeedsCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const initialFinancialInstitutionData = {
  accountName: '',
  accountNameRequired: false,
  accountNumber: '',
  accountNumberRequired: false,
  accountSuffix: '',
  accountSuffixRequired: false,
  accountType: 'Trading Account',
  accountTypeRequired: false,
  applicationPreference: '',
  branchName: '',
  branchNameRequired: false,
  bsb: '',
  bsbBank: '',
  bsbBankRequired: false,
  bsbBranch: '',
  bsbBranchRequired: false,
  bsbRequired: false,
  confirmedApplication: false,
  financialInstitution: null,
  hasOnlineApplication: false,
  hasPaperApplication: false,
  lastFourDigits: '',
  lastFourDigitsRequired: false,
  nameOnCard: '',
  nameOnCardRequired: false,
  notes: '',
};

const getDefaultState = () => ({
  ...initialFinancialInstitutionData,
  alert: '',
  businessId: '',
  financialInstitutions: {
    bankAccounts: [],
    creditCards: [],
  },
  isModalOpen: false,
  isSubmitting: false,
  loadingState: LoadingState.LOADING,
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

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setAccountTypeState = (state, { accountType }) => ({
  ...state,
  ...initialFinancialInstitutionData,
  accountType,
});

const setApplicationPreferenceState = (state, { applicationPreference }) => ({
  ...state,
  applicationPreference,
});

const getDefaultApplicationPreference = (financialInstitution) => {
  if (financialInstitution?.onlineApplicationSupported) return 'online';
  if (financialInstitution?.paperApplicationSupported) return 'form';
  return '';
};

const setFinancialInstitution = (state, { financialInstitution }) => ({
  ...state,
  accountNameRequired: !!financialInstitution?.accountNameRequired,
  accountNumberRequired: !!financialInstitution?.accountNumberRequired,
  accountSuffixRequired: !!financialInstitution?.accountSuffixRequired,
  accountTypeRequired: !!financialInstitution?.accountTypeRequired,
  branchNameRequired: !!financialInstitution?.branchNameRequired,
  bsbBankRequired: !!financialInstitution?.BSBBankRequired,
  bsbBranchRequired: !!financialInstitution?.BSBBranchRequired,
  bsbRequired: !!financialInstitution?.BSBRequired,
  nameOnCardRequired: !!financialInstitution?.nameOnCardRequired,
  lastFourDigitsRequired: !!financialInstitution?.lastFourDigitsRequired,
  notes: financialInstitution?.notes,
  hasOnlineApplication: !!financialInstitution?.onlineApplicationSupported,
  hasPaperApplication: !!financialInstitution?.paperApplicationSupported,
  applicationPreference: getDefaultApplicationPreference(financialInstitution),
  financialInstitution,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
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

const updateForm = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const handlers = {
  [LOAD_BANK_FEED_APPLICATION_DATA]: loadBankFeedApplicationData,
  [SUBMIT_BANK_FEED_APPLICATION]: submitBankFeedApplication,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_ACCOUNT_TYPE]: setAccountTypeState,
  [SET_APPLICATION_PREFERENCE]: setApplicationPreferenceState,
  [SET_FINANCIAL_INSTITUTION]: setFinancialInstitution,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setModalState,
  [SET_NOTES_STATE]: setNotesState,
  [UPDATE_FORM]: updateForm,
};

const BankFeedsCreateReducer = createReducer(getDefaultState(), handlers);

export default BankFeedsCreateReducer;
