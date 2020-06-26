import {
  LOAD_BANK_FEED_APPLICATION_DATA,
  SET_ACCOUNT_TYPE,
  SET_ALERT,
  SET_APPLICATION_ID,
  SET_APPLICATION_PREFERENCE,
  SET_COPY_ALERT_STATE,
  SET_COPY_ALERT_TEXT,
  SET_DISPLAY_CONNECT_FORM_STATE,
  SET_FINANCIAL_INSTITUTION,
  SET_FORM_ALERT_STATE,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
  SET_NOTES_STATE,
  SET_REFERENCE_NUMBER_STATE,
  SUBMIT_BANK_FEED_APPLICATION,
  UPDATE_FORM,
} from './BankFeedsApplyIntents';
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
  links: '',
};

const getDefaultState = () => ({
  ...initialFinancialInstitutionData,
  alert: '',
  applicationId: '',
  businessId: '',
  bankFeedLoadEmail: 'bankfeedloads@myob.com',
  copyAlertState: false,
  copyAlertText: '',
  financialInstitutions: {
    bankAccounts: [],
    creditCards: [],
  },
  formAlertState: false,
  isModalOpen: false,
  isSubmitting: false,
  loadingState: LoadingState.LOADING,
  referenceNumber: '',
  region: '',
  serialNumber: '',
  shouldDisplayConnectForm: false,
  userEmail: '',
});

const loadBankFeedApplicationData = (state, financialInstitutions) => ({
  ...state,
  financialInstitutions: {
    bankAccounts: financialInstitutions.bankAccounts,
    creditCards: financialInstitutions.creditCards,
  },
});

const resetState = () => getDefaultState();

const setAccountTypeState = (state, { accountType }) => ({
  ...state,
  ...initialFinancialInstitutionData,
  accountType,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setApplicationIdState = (state, { applicationId }) => ({
  ...state,
  applicationId,
});

const setApplicationPreferenceState = (state, { applicationPreference }) => ({
  ...state,
  applicationPreference,
});

const setCopyAlertState = (state) => ({
  ...state,
  copyAlertState: !state.copyAlertState,
});

const setCopyAlertText = (state, { copyAlertText }) => ({
  ...state,
  copyAlertText,
});

const setDisplayConnectFormState = (state) => ({
  ...state,
  shouldDisplayConnectForm: !state.shouldDisplayConnectForm,
});

const setFormAlertState = (state, { formAlertState }) => ({
  ...state,
  formAlertState,
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
  applicationPreference: getDefaultApplicationPreference(financialInstitution),
  branchNameRequired: !!financialInstitution?.branchNameRequired,
  bsbBankRequired: !!financialInstitution?.BSBBankRequired,
  bsbBranchRequired: !!financialInstitution?.BSBBranchRequired,
  bsbRequired: !!financialInstitution?.BSBRequired,
  hasOnlineApplication: !!financialInstitution?.onlineApplicationSupported,
  hasPaperApplication: !!financialInstitution?.paperApplicationSupported,
  lastFourDigitsRequired: !!financialInstitution?.lastFourDigitsRequired,
  links: financialInstitution?._links?.onlineApplication?.href,
  nameOnCardRequired: !!financialInstitution?.nameOnCardRequired,
  notes: financialInstitution?.notes,
  formAlertState: false,
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

const setReferenceNumberState = (state, { referenceNumber }) => ({
  ...state,
  referenceNumber,
});

const submitBankFeedApplication = (state, { financialInstitutions }) => ({
  ...state,
  financialInstitutions,
});

const updateForm = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const handlers = {
  [LOAD_BANK_FEED_APPLICATION_DATA]: loadBankFeedApplicationData,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_ACCOUNT_TYPE]: setAccountTypeState,
  [SET_APPLICATION_ID]: setApplicationIdState,
  [SET_APPLICATION_PREFERENCE]: setApplicationPreferenceState,
  [SET_COPY_ALERT_STATE]: setCopyAlertState,
  [SET_COPY_ALERT_TEXT]: setCopyAlertText,
  [SET_DISPLAY_CONNECT_FORM_STATE]: setDisplayConnectFormState,
  [SET_FINANCIAL_INSTITUTION]: setFinancialInstitution,
  [SET_FORM_ALERT_STATE]: setFormAlertState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setModalState,
  [SET_NOTES_STATE]: setNotesState,
  [SET_REFERENCE_NUMBER_STATE]: setReferenceNumberState,
  [SUBMIT_BANK_FEED_APPLICATION]: submitBankFeedApplication,
  [UPDATE_FORM]: updateForm,
};

const BankFeedsApplyReducer = createReducer(getDefaultState(), handlers);

export default BankFeedsApplyReducer;
