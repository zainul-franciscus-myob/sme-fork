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

const getDefaultBankStatementText = ({ supplierStatementText, referenceId }) =>
  formatBankStatementText(supplierStatementText || `PAYMENT ${referenceId}`);

export const updateBankStatementText = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    bankStatementText: action?.bankStatementText
      ? formatBankStatementText(action.bankStatementText)
      : getDefaultBankStatementText(state.recordBillPayment),
  },
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
    !state.recordBillPayment.bankStatementText ||
    getDefaultBankStatementText(state.recordBillPayment) ===
      state.recordBillPayment.bankStatementText;

  const newState = stateUpdater(state, action);
  return shouldUpdate ? updateBankStatementText(newState) : newState;
};

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
    bankStatementText: getDefaultBankStatementText(action.response),
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

export const updateReferenceId = updateWhenUsingDefaultStatementText(
  (state, { referenceId }) => ({
    ...state,
    recordBillPayment: {
      ...state.recordBillPayment,
      isModalEdited: true,
      referenceId,
      originalReferenceId: referenceId,
    },
  })
);

export const updateBillPaymentAmountFields = (state, action) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    isModalEdited: true,
    isPaymentAmountEdited: true,
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

export const changeBankStatementText = (state, { bankStatementText }) => {
  return {
    ...state,
    recordBillPayment: {
      ...state.recordBillPayment,
      bankStatementText,
    },
  };
};

export const updateShouldSendRemittanceAdvice = (
  state,
  { shouldSendRemittanceAdvice }
) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    shouldSendRemittanceAdvice,
  },
});

export const updateBillPaymentId = (state, { billPaymentId }) => ({
  ...state,
  recordBillPayment: {
    ...state.recordBillPayment,
    billPaymentId,
  },
});
