import {
  LOAD_BANK_FEED_APPLICATION_DATA,
  SET_ACCOUNT_TYPE,
  SET_ALERT,
  SET_APPLICATION_PREFERENCE,
  SET_COPY_ALERT_STATE,
  SET_COPY_ALERT_TEXT,
  SET_DISPLAY_CONNECT_FORM_STATE,
  SET_FINANCIAL_INSTITUTION,
  SET_FORM_ALERT_STATE,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
  SUBMIT_BANK_FEED_APPLICATION,
  UPDATE_FORM,
} from './BankFeedsApplyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const BankFeedsApplyDispatcher = store => ({
  loadBankFeedApplicationData: response => store.dispatch({
    intent: LOAD_BANK_FEED_APPLICATION_DATA,
    ...response,
  }),

  submitBankFeedApplication: response => store.dispatch({
    intent: SUBMIT_BANK_FEED_APPLICATION,
    ...response,
  }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setAlert: alert => store.dispatch({
    intent: SET_ALERT,
    alert,
  }),

  setAccountType: accountType => store.dispatch({
    intent: SET_ACCOUNT_TYPE,
    accountType,
  }),

  setApplicationPreference: applicationPreference => store.dispatch({
    intent: SET_APPLICATION_PREFERENCE,
    applicationPreference,
  }),

  setCopyAlertState: copyAlertState => store.dispatch({
    intent: SET_COPY_ALERT_STATE,
    copyAlertState,
  }),

  setCopyAlertText: copyAlertText => store.dispatch({
    intent: SET_COPY_ALERT_TEXT,
    copyAlertText,
  }),

  setDisplayConnectFormState: shouldDisplayConnectForm => store.dispatch({
    intent: SET_DISPLAY_CONNECT_FORM_STATE,
    shouldDisplayConnectForm,
  }),

  setFinancialInstitution: financialInstitution => store.dispatch({
    intent: SET_FINANCIAL_INSTITUTION,
    financialInstitution,
  }),

  setFormAlertState: formAlertState => store.dispatch({
    intent: SET_FORM_ALERT_STATE,
    formAlertState,
  }),

  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  setIsSubmitting: isSubmitting => store.dispatch({
    intent: SET_IS_SUBMITTING,
    isSubmitting,
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

  updateForm: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },
});

export default BankFeedsApplyDispatcher;
