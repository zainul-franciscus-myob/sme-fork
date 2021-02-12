import { getShowPrefillRecurringButton } from '../recurringBillSelectors';

describe('recurringBillSelectors', () => {
  describe('getShowPrefillRecurringButton', () => {
    it('shows on new bill', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(
        true,
        false,
        true
      );

      expect(actual).toBeTruthy();
    });

    it('hides when feature toggle is off', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(
        true,
        false,
        false
      );

      expect(actual).toBeFalsy();
    });

    it('hides when customer is disabled', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(true, true, true);

      expect(actual).toBeFalsy();
    });
  });
});
