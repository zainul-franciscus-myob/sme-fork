import {
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_PAYMENT_DETAILS,
} from '../../EmployeeIntents';

const getAppliedFormatRestrictions = (currentText, text, length) => {
  const pattern = `^(?=.{0,${length}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matchedText = text.match(pattern);

  return matchedText === null
    ? currentText
    : matchedText[0].toUpperCase();
};

const getUpdatedBankStatementText = (
  currentText,
  text,
) => getAppliedFormatRestrictions(currentText, text, 18);

const getUpdatedAccountName = (
  currentText,
  text,
) => getAppliedFormatRestrictions(currentText, text, 32);

const updatePaymentDetails = (state, action) => ({
  ...state,
  paymentDetails: {
    ...state.paymentDetails,
    [action.key]: ((action.key === 'bankStatementText')
      ? getUpdatedBankStatementText(state.paymentDetails.bankStatementText, action.value)
      : action.value),
  },
  isPageEdited: true,
});
const updateBankAccountDetails = (state, action) => {
  const { bankAccounts } = state.paymentDetails;
  const bankAccount = state.paymentDetails.bankAccounts[action.index];
  const updatedBankAccount = {
    ...bankAccount,
    [action.key]: ((action.key === 'accountName')
      ? getUpdatedAccountName(bankAccount.accountName, action.value)
      : action.value),
  };

  const updatedBankAccounts = bankAccounts.map(
    (account, index) => ((index === action.index) ? updatedBankAccount : account),
  );

  return {
    ...state,
    paymentDetails: {
      ...state.paymentDetails,
      bankAccounts: updatedBankAccounts,
    },
    isPageEdited: true,
  };
};

export default {
  [UPDATE_PAYMENT_DETAILS]: updatePaymentDetails,
  [UPDATE_BANK_ACCOUNT_DETAILS]: updateBankAccountDetails,
};
