const getShowExpirationDaysAmountInput = (expirationTerm) =>
  ['InAGivenNumberOfDays', 'NumberOfDaysAfterEOM'].includes(expirationTerm);

export default getShowExpirationDaysAmountInput;
