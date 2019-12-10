import getShowExpirationDaysAmountInput from '../getShowExpirationDaysAmountInput';

describe('getShowExpirationDaysAmountInput', () => {
  it('returns true when the payment term is Due on a date of this month', () => {
    const expirationTerm = 'OnADayOfTheMonth';
    expect(getShowExpirationDaysAmountInput(expirationTerm)).toBeFalsy();
  });

  it('returns true when the payment term is Due on a date of next month', () => {
    const expirationTerm = 'DayOfMonthAfterEOM';
    expect(getShowExpirationDaysAmountInput(expirationTerm)).toBeFalsy();
  });

  it('returns false when the payment term is due in a number of days after the issue date', () => {
    const expirationTerm = 'InAGivenNumberOfDays';
    expect(getShowExpirationDaysAmountInput(expirationTerm)).toBeTruthy();
  });

  it('returns false when the payment term is due in a number of days after the end of the month', () => {
    const expirationTerm = 'NumberOfDaysAfterEOM';
    expect(getShowExpirationDaysAmountInput(expirationTerm)).toBeTruthy();
  });
});
