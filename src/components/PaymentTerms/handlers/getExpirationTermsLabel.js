const getExpirationTermsLabel = expirationTerm => ({
  InAGivenNumberOfDays: 'days after the issue date',
  OnADayOfTheMonth: 'of this month',
  NumberOfDaysAfterEOM: 'days after the end of the month',
  DayOfMonthAfterEOM: 'of next month',
}[expirationTerm]);

export default getExpirationTermsLabel;
