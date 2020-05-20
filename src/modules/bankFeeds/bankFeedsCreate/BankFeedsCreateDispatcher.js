import {
  LOAD_BANK_FEED_APPLICATION_DATA,
  RESET_ACCOUNT_INFORMATION_STATE,
  SET_ACCOUNT_NAME_REQUIRED,
  SET_ACCOUNT_NUMBER_REQUIRED,
  SET_ACCOUNT_SUFFIX_REQUIRED,
  SET_ACCOUNT_TYPE,
  SET_ACCOUNT_TYPE_REQUIRED,
  SET_ALERT,
  SET_APPLICATION_PREFERENCE,
  SET_BRANCH_NAME_REQUIRED,
  SET_BSB_BANK_REQUIRED,
  SET_BSB_BRANCH_REQUIRED,
  SET_BSB_REQUIRED,
  SET_IS_SUBMITTING,
  SET_LAST_FOUR_DIGITS_REQUIRED,
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

const BankFeedsCreateDispatcher = store => ({
  loadBankFeedApplicationData: response => store.dispatch({
    intent: LOAD_BANK_FEED_APPLICATION_DATA,
    ...response,
  }),

  submitBankFeedApplication: response => store.dispatch({
    intent: SUBMIT_BANK_FEED_APPLICATION,
    ...response,
  }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  resetAccountInformationState: () => store.dispatch({
    intent: RESET_ACCOUNT_INFORMATION_STATE,
  }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setAlert: alert => store.dispatch({
    intent: SET_ALERT,
    alert,
  }),

  setAccountNameRequiredState: accountNameRequired => store.dispatch({
    intent: SET_ACCOUNT_NAME_REQUIRED,
    accountNameRequired,
  }),

  setAccountNumberRequiredState: accountNumberRequired => store.dispatch({
    intent: SET_ACCOUNT_NUMBER_REQUIRED,
    accountNumberRequired,
  }),

  setAccountSuffixRequiredState: accountSuffixRequired => store.dispatch({
    intent: SET_ACCOUNT_SUFFIX_REQUIRED,
    accountSuffixRequired,
  }),

  setAccountType: accountType => store.dispatch({
    intent: SET_ACCOUNT_TYPE,
    accountType,
  }),

  setAccountTypeRequiredState: accountTypeRequired => store.dispatch({
    intent: SET_ACCOUNT_TYPE_REQUIRED,
    accountTypeRequired,
  }),

  setApplicationPreference: applicationPreference => store.dispatch({
    intent: SET_APPLICATION_PREFERENCE,
    applicationPreference,
  }),

  setBranchNameRequiredState: branchNameRequired => store.dispatch({
    intent: SET_BRANCH_NAME_REQUIRED,
    branchNameRequired,
  }),

  setBsbBankRequiredState: bsbBankRequired => store.dispatch({
    intent: SET_BSB_BANK_REQUIRED,
    bsbBankRequired,
  }),

  setBsbBranchRequiredState: bsbBranchRequired => store.dispatch({
    intent: SET_BSB_BRANCH_REQUIRED,
    bsbBranchRequired,
  }),

  setBsbRequiredState: bsbRequired => store.dispatch({
    intent: SET_BSB_REQUIRED,
    bsbRequired,
  }),

  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  setIsSubmitting: isSubmitting => store.dispatch({
    intent: SET_IS_SUBMITTING,
    isSubmitting,
  }),

  setLastFourDigitsRequiredState: lastFourDigitsRequired => store.dispatch({
    intent: SET_LAST_FOUR_DIGITS_REQUIRED,
    lastFourDigitsRequired,
  }),

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setModalState: isModalOpen => store.dispatch({
    intent: SET_MODAL_STATE,
    isModalOpen,
  }),

  setNameOnCardRequiredState: nameOnCardRequired => store.dispatch({
    intent: SET_NAME_ON_CARD_REQUIRED,
    nameOnCardRequired,
  }),

  setNotesState: notes => store.dispatch({
    intent: SET_NOTES_STATE,
    notes,
  }),

  setOnlineApplicationSupportedState: param => store.dispatch({
    intent: SET_ONLINE_APPLICATION_SUPPORTED_STATE,
    param,
  }),

  setPaperApplicationSupportedState: param => store.dispatch({
    intent: SET_PAPER_APPLICATION_SUPPORTED_STATE,
    param,
  }),

  updateForm: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },
});

export default BankFeedsCreateDispatcher;
