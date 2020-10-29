import {
  CHANGE_BANK_STATEMENT_TEXT,
  CHANGE_REFERENCE_ID,
  CLOSE_MODAL,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_DETAILS,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_SUPPLIER_LOADING,
  SET_IS_TABLE_LOADING,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_BILL_PAYMENT_ID,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_REMITTANCE_ADVICE_DETAILS,
  UPDATE_REMITTANCE_ADVICE_TYPE,
  UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
  UPDATE_TABLE_INPUT_FIELD,
} from '../BillPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import remittanceAdviceTypes from './remittanceAdviceTypes';

const getDefaultState = () => ({
  region: '',
  businessId: '',
  billPaymentId: '',
  supplierId: '',
  supplierName: '',
  accounts: [],
  accountId: '',
  defaultAccountId: '',
  electronicClearingAccountId: '',
  isElectronicallyProcessed: false,
  electronicPaymentId: null,
  electronicPaymentReference: '',
  showPaidBills: false,
  referenceId: '',
  originalReferenceId: '',
  description: '',
  supplierStatementText: '',
  bankStatementText: '',
  arePaymentDetailsComplete: false,
  date: formatIsoDate(new Date()),
  entries: [],
  totalPaid: '',
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  isPageEdited: false,
  isSupplierLoading: false,
  isTableLoading: false,
  modalType: '',
  alertMessage: { message: '', type: '' },
  paymentAmount: '',
  applyPaymentToBillId: '',
  startOfFinancialYearDate: '',
  shouldSendRemittanceAdvice: false,
  isRemittanceAdviceEnabled: false,
  remittanceAdviceType: remittanceAdviceTypes.email,
  templateOptions: [''],
  remittanceAdviceDetails: {
    toAddresses: [''],
    ccAddresses: [''],
    subject: '',
    isEmailMeACopy: false,
    messageBody: '',
    templateName: '',
  },
});

const pageEdited = { isPageEdited: true };

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsSupplierLoading = (state, { isSupplierLoading }) => ({
  ...state,
  isSupplierLoading,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
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
  const matches = bankStatementText.trimLeft().match(pattern);
  const formattedText = matches ? matches[0] : '';

  return formattedText.toUpperCase();
};

const getDefaultBankStatementText = ({ supplierStatementText, referenceId }) =>
  formatBankStatementText(supplierStatementText || `PAYMENT ${referenceId}`);

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
  to the default. There are multiple sources and multiple triggers that can
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

const createBillListEntries = (state, entries) =>
  entries.map((entry) => {
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
  });

const loadSupplierDetails = updateWhenUsingDefaultStatementText(
  (state, { supplierStatementText, arePaymentDetailsComplete, entries }) => ({
    ...state,
    supplierStatementText,
    arePaymentDetailsComplete,
    entries: createBillListEntries(state, entries),
  })
);

const loadBillList = (state, { entries }) => ({
  ...state,
  entries: createBillListEntries(state, entries),
});

const loadNewBillPayment = (state, action) => {
  const newState = {
    ...state,
    accounts: action.accounts,
    accountId: action.accountId,
    defaultAccountId: action.accountId,
    showPaidBills: action.showPaidBills,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
    bankStatementText: getDefaultBankStatementText(action),
    electronicClearingAccountId: action.electronicClearingAccountId,
    startOfFinancialYearDate: action.startOfFinancialYearDate,
  };

  if (action.supplierId) {
    return {
      ...loadSupplierDetails(newState, action),
      supplierId: action.supplierId,
      supplierName: action.supplierName,
    };
  }

  return newState;
};

const loadBillPayment = (state, action) => ({
  ...state,
  date: action.date,
  supplierId: action.supplierId,
  supplierName: action.supplierName,
  supplierStatementText: action.supplierStatementText,
  accounts: action.accounts,
  accountId: action.accountId,
  defaultAccountId: action.accountId,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
  entries: action.entries,
  description: action.description,
  bankStatementText: action.bankStatementText,
  electronicClearingAccountId: action.electronicClearingAccountId,
  isElectronicallyProcessed: action.isElectronicallyProcessed,
  electronicPaymentId: action.electronicPaymentId,
  electronicPaymentReference: action.electronicPaymentReference,
  startOfFinancialYearDate: action.startOfFinancialYearDate,
  arePaymentDetailsComplete: action.arePaymentDetailsComplete,
  templateOptions: action.templateOptions,
  remittanceAdviceDetails: {
    ...state.remittanceAdviceDetails,
    ...action.remittanceAdviceDefaults,
  },
  isPageEdited: false,
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

const updateRemittanceAdviceDetails = (state, action) => {
  return {
    ...state,
    remittanceAdviceDetails: {
      ...state.remittanceAdviceDetails,
      [action.key]: action.value,
    },
  };
};

const changeBankStatementText = (state, { bankStatementText }) => {
  return {
    ...state,
    ...pageEdited,
    bankStatementText,
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

const updateBillPaymentId = (state, { billPaymentId }) => ({
  ...state,
  billPaymentId,
});

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

const updateShouldSendRemittanceAdvice = (state, action) => ({
  ...state,
  shouldSendRemittanceAdvice: action.shouldSendRemittanceAdvice,
});

const updateRemittanceAdviceType = (state, { remittanceAdviceType }) => ({
  ...state,
  remittanceAdviceType,
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
  alertMessage: {
    type: action.type,
    message: action.message,
  },
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUPPLIER_LOADING]: setIsSupplierLoading,
  [SET_IS_TABLE_LOADING]: setIsTableLoading,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_BILL_LIST]: loadBillList,
  [LOAD_SUPPLIER_DETAILS]: loadSupplierDetails,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [UPDATE_REMITTANCE_ADVICE_DETAILS]: updateRemittanceAdviceDetails,
  [UPDATE_TABLE_INPUT_FIELD]: updateTableInputField,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CHANGE_REFERENCE_ID]: changeReferenceId,
  [UPDATE_BILL_PAYMENT_ID]: updateBillPaymentId,
  [CHANGE_BANK_STATEMENT_TEXT]: changeBankStatementText,
  [UPDATE_BANK_STATEMENT_TEXT]: updateBankStatementText,
  [SET_SUBMITTING_STATE]: setSubmittingState,

  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [UPDATE_SHOULD_SEND_REMITTANCE_ADVICE]: updateShouldSendRemittanceAdvice,
  [UPDATE_REMITTANCE_ADVICE_TYPE]: updateRemittanceAdviceType,
};

const billPaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default billPaymentDetailReducer;
