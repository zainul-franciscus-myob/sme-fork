const getShowExpiryDaysOptions = (expirationTerm) =>
  [
    'OnADayOfTheMonth',
    'InAGivenNumberOfDays',
    'DayOfMonthAfterEOM',
    'NumberOfDaysAfterEOM',
  ].includes(expirationTerm);

export default getShowExpiryDaysOptions;
