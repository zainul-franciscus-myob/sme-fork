import { getAmountDue } from '../selectors/billSelectors';
import { getDefaultState } from './getDefaultState';

const formatBankStatementText = (bankStatementText) => {
  if (!bankStatementText?.trim()) return '';

  const maxLengthAu = 18;
  const pattern = `^(?=.{0,${maxLengthAu}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matches = bankStatementText.trimLeft().match(pattern);
  const formattedText = matches ? matches[0] : '';

  return formattedText.toUpperCase();
};

const getDefaultBankStatementText = (supplierStatementText, referenceId) =>
  formatBankStatementText(supplierStatementText || `PAYMENT ${referenceId}`);

export const loadNewBillPayment = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    ...getDefaultState().recordBillPayment,
    isModalEdited: false,
    accounts: action.response.accounts,
    accountId: action.response.accountId,
    defaultAccountId: action.response.accountId,
    referenceId: action.response.referenceId,
    originalReferenceId: action.response.referenceId,
    electronicClearingAccountId: action.response.electronicClearingAccountId,
    startOfFinancialYearDate: action.response.startOfFinancialYearDate,
    supplierName: action.response.supplierName,
    arePaymentDetailsComplete: action.response.arePaymentDetailsComplete,
    supplierStatementText: action.response.supplierStatementText,
    bankStatementText: getDefaultBankStatementText(
      action.response.supplierStatementText,
      action.response.referenceId
    ),
    paidAmount: getAmountDue(state),
  },
});

export const setPaymentModalLoadingState = (state, { isModalLoading }) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    isModalLoading,
  },
});

export const updateHeaderOption = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    isModalEdited: true,
    [action.key]: action.value,
  },
});

export const updateReferenceId = (state, { referenceId }) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    isModalEdited: true,
    referenceId,
    originalReferenceId: referenceId,
    bankStatementText: getDefaultBankStatementText(
      state.recordBillPayment.supplierStatementText,
      referenceId
    ),
  },
});

export const updateBillPaymentAmountFields = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    isModalEdited: true,
    [action.key]: action.value,
  },
});

export const setPaymentModalAlert = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    ...action,
  },
});

export const setPaymentModalSubmittingState = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    ...action,
  },
});
