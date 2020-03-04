import {
  getReminderLink,
} from '../contactDetailSelectors';

describe('contactDetailSelectors', () => {
  describe('getReminderLink', () => {
    it('getting the link', () => {
      const state = {
        reminders: {
          url: 'https://justin.com/preferences/customer',
        },
        businessId: '1234',
        uid: 'e312-e312-e312-e312',
      };

      const expected = 'https://justin.com/preferences/customer?consumer=ARL&origin=Customer&cfid=1234&id=e312-e312-e312-e312';
      const actual = getReminderLink(state);

      expect(actual).toEqual(expected);
    });
  });
});
