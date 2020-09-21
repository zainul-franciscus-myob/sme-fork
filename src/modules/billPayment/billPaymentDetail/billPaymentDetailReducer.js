import {
  CHANGE_BANK_STATEMENT_TEXT,
  CHANGE_REFERENCE_ID,
  CLOSE_MODAL,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_STATEMENT_TEXT,
  OPEN_MODAL,
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
  supplierStatementText: '',
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

const formatBankStatementText = (bankStatementText) => {
  if (!bankStatementText.trim()) return '';

  const maxLengthAu = 18;
  const pattern = `^(?=.{0,${maxLengthAu}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matches = bankStatementText.trim().match(pattern);
  const formattedText = matches ? matches[0] : '';

  return formattedText.toUpperCase();
};

const getDefaultBankStatementText = ({ supplierStatementText, referenceId }) =>
  formatBankStatementText(supplierStatementText || `PAYMENT ${referenceId}`);

const loadNewBillPayment = (state, action) => ({
  ...state,
  accounts: action.accounts,
  accountId: action.accountId,
  showPaidBills: action.showPaidBills,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
  bankStatementText: getDefaultBankStatementText(action),
  electronicClearingAccountId: action.electronicClearingAccountId,
  startOfFinancialYearDate: action.startOfFinancialYearDate,
});

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

const updateBankStatementText = (state, action) => ({
  ...state,
  bankStatementText: action?.bankStatementText
    ? formatBankStatementText(action.bankStatementText)
    : getDefaultBankStatementText(state),
});

const updateWhenUsingDefaultStatementText = (stateUpdater) => (
  state,
  action
) => {
  /*
  This function wrapper handles the update of the bank statement text
  to the a default. There are multiple source and multiple triggers that can
  result in the statement text being changed and updated. This text must be
  provided and only valid characters for creation of valid ABA

  The priority works in this order:
  1. A direct input by the user
  2. The default text for a supplier from the contact screen
  3. A default string "PAYMENT <reference>"

  After the correct statement text has been applied it calls the provided
  function to update the remaining state
   */
  const shouldUpdate =
    !state.bankStatementText ||
    getDefaultBankStatementText(state) === state.bankStatementText;

  const newState = stateUpdater(state, action);
  return shouldUpdate ? updateBankStatementText(newState) : newState;
};

const updateHeaderOption = (state, action) => ({
  ...state,
  ...pageEdited,
  [action.key]: action.value,
  entries:
    action.key === 'supplierId' && action.value !== state.supplierId
      ? []
      : state.entries,
});

const changeBankStatementText = (state, { bankStatementText }) => {
  return {
    ...state,
    ...pageEdited,
    bankStatementText: formatBankStatementText(bankStatementText),
  };
};

const updateReferenceId = updateWhenUsingDefaultStatementText(
  (state, { referenceId }) => ({
    ...state,
    ...pageEdited,
    referenceId,
    originalReferenceId: referenceId,
  })
);

const changeReferenceId = updateWhenUsingDefaultStatementText(
  (state, { referenceId }) => ({
    ...state,
    ...pageEdited,
    referenceId,
  })
);

const loadSupplierStatementText = updateWhenUsingDefaultStatementText(
  (state, { supplierStatementText }) => ({
    ...state,
    ...pageEdited,
    supplierStatementText,
  })
);

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
  [LOAD_SUPPLIER_STATEMENT_TEXT]: loadSupplierStatementText,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [UPDATE_TABLE_INPUT_FIELD]: updateTableInputField,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CHANGE_REFERENCE_ID]: changeReferenceId,
  [CHANGE_BANK_STATEMENT_TEXT]: changeBankStatementText,
  [UPDATE_BANK_STATEMENT_TEXT]: updateBankStatementText,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_REDIRECT_URL]: setRedirectUrl,
};

const billPaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default billPaymentDetailReducer;
