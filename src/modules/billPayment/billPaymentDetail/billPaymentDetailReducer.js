import {
  CLOSE_MODAL,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  OPEN_MODAL,
  RESET_BANK_STATEMENT_TEXT,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_TABLE_INPUT_FIELD,
} from '../BillPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getShowBankStatementText } from './BillPaymentDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  region: '',
  businessId: '',
  billPaymentId: '',
  supplierId: '',
  accounts: [],
  accountId: '',
  electronicClearingAccountId: '',
  showPaidBills: false,
  referenceId: '',
  originalReferenceId: '',
  description: '',
  bankStatementText: '',
  date: formatIsoDate(new Date()),
  entries: [],
  totalPaid: '',
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isSubmitting: false,
  isPageEdited: false,
  modalType: '',
  alertMessage: '',
  paymentAmount: '',
  applyPaymentToBillId: '',
  startOfFinancialYearDate: '',
});

const pageEdited = { isPageEdited: true };

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const getBankStatementText = (state, referenceId) => {
  const shouldSetBankstatementText = getShowBankStatementText(state);
  return shouldSetBankstatementText ? `Payment ${referenceId}` : '';
};

const loadNewBillPayment = (state, action) => {
  const newState = {
    ...state,
    accounts: action.accounts,
    accountId: action.accountId,
    showPaidBills: action.showPaidBills,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
    electronicClearingAccountId: action.electronicClearingAccountId,
    startOfFinancialYearDate: action.startOfFinancialYearDate,
  };

  const bankStatementText = getBankStatementText(newState, action.referenceId);

  return {
    ...newState,
    bankStatementText,
    originalBankStatementText: bankStatementText,
  };
};

const loadBillPayment = (state, action) => ({
  ...state,
  date: action.date,
  supplierId: action.supplierId,
  accounts: action.accounts,
  accountId: action.accountId,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
  entries: action.entries,
  description: action.description,
  bankStatementText: action.bankStatementText,
  originalBankStatementText: action.bankStatementText,
  electronicClearingAccountId: action.electronicClearingAccountId,
  startOfFinancialYearDate: action.startOfFinancialYearDate,
});

const loadBillList = (state, action) => ({
  ...state,
  entries: action.entries.map((entry) => {
    const prevEntry = state.entries.find((prev) => prev.id === entry.id);
    const shouldApplyPaymentTo = state.applyPaymentToBillId === entry.id;

    if (shouldApplyPaymentTo) {
      return {
        ...entry,
        paidAmount: state.paymentAmount,
      };
    }

    if (prevEntry) {
      return {
        ...entry,
        paidAmount: prevEntry.paidAmount,
        discountAmount: prevEntry.discountAmount,
      };
    }

    return entry;
  }),
});

const updateHeaderOption = (state, action) => ({
  ...state,
  ...pageEdited,
  [action.key]: action.value,
  entries:
    action.key === 'supplierId' && action.value !== state.supplierId
      ? []
      : state.entries,
});

const resetBankStatementText = (state, { value }) => ({
  ...state,
  ...pageEdited,
  bankStatementText: !value ? state.originalBankStatementText : value,
});

const updateBankStatementText = (state) => {
  const bankStatementText = getBankStatementText(state, state.referenceId);

  return {
    ...state,
    ...pageEdited,
    bankStatementText,
    originalBankStatementText:
      bankStatementText || state.originalBankStatementText,
  };
};

const updateTableInputField = (state, action) => ({
  ...state,
  ...pageEdited,
  entries: state.entries.map((entry, index) =>
    index === action.index
      ? {
          ...entry,
          [action.key]: action.value,
        }
      : entry
  ),
});

const updateReferenceId = (state, action) => {
  const bankStatementText = getBankStatementText(state, action.referenceId);

  return {
    ...state,
    ...pageEdited,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
    bankStatementText,
    originalBankStatementText:
      bankStatementText || state.originalBankStatementText,
  };
};

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = (state) => ({
  ...state,
  modalType: '',
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_BILL_LIST]: loadBillList,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [UPDATE_TABLE_INPUT_FIELD]: updateTableInputField,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [RESET_BANK_STATEMENT_TEXT]: resetBankStatementText,
  [UPDATE_BANK_STATEMENT_TEXT]: updateBankStatementText,
  [SET_REDIRECT_URL]: setRedirectUrl,
};

const billPaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default billPaymentDetailReducer;
