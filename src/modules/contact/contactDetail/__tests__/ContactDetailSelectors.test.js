import {
  getReminderLink,
  getShouldShowPaymentDetails,
} from '../contactDetailSelectors';

describe('contactDetailSelectors', () => {
  describe('getReminderLink', () => {
    it('getting the link', () => {
      const state = {
        reminders: {
          url: 'https://justin.com/preferences/customer',
        },
        businessId: '1234',
        contact: {
          uid: 'e312-e312-e312-e312',
        },
      };

      const expected =
        'https://justin.com/preferences/customer?consumer=ARL&origin=Customer&cfid=1234&id=e312-e312-e312-e312';
      const actual = getReminderLink(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowPaymentDetails', () => {
    it('returns false when contact is not supplier', () => {
      const state = {
        contact: {
          selectedContactType: 'Customer',
        },
        region: 'au',
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(false);
    });

    it('returns false when region is not au', () => {
      const state = {
        contact: {
          selectedContactType: 'Supplier',
        },
        region: 'nz',
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(false);
    });
  });
});
