export const getPaymentMethodOptions = state => state.paymentMethodOptions;
export const getSplitNetPayBetweenOptions = state => state.splitNetPayBetweenOptions;
export const getElectronicPaymentDetails = state => state.paymentDetails.paymentMethod === 'Electronic';
export const getValueOptions = state => state.valueOptions;

export const getPaymentDetails = (state) => {
  const { bankAccounts, splitPayBetween } = state.paymentDetails;
  const updatedBankAccounts = bankAccounts.map(bankAccount => ({
    ...bankAccount,
    amountLabel: bankAccount.value === 'Dollars' ? '$' : '%',
  }));

  return {
    ...state.paymentDetails,
    bankAccounts: updatedBankAccounts.slice(0, Number(splitPayBetween)),
  };
};
