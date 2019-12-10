import getExpirationTermsLabel from '../getExpirationTermsLabel';

describe('getExpirationTermsLabel', () => {
  it.each([
    ['InAGivenNumberOfDays', 'days after the issue date'],
    ['OnADayOfTheMonth', 'of this month'],
    ['NumberOfDaysAfterEOM', 'days after the end of the month'],
    ['DayOfMonthAfterEOM', 'of next month'],
  ])('returns the label for the expiration terms popover input',
    (expirationTerm, expectedLabel) => {
      const actual = getExpirationTermsLabel(expirationTerm);
      expect(actual).toEqual(expectedLabel);
    });
});
