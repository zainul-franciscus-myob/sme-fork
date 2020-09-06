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
    it('returns true when feature toggle is on and contact is au supplier', () => {
      const state = {
        contact: {
          selectedContactType: 'Supplier',
        },
        region: 'au',
        isElectronicPaymentEnabled: true,
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(true);
    });

    it('returns false when feature toggle is off', () => {
      const state = {
        contact: {
          selectedContactType: 'Supplier',
        },
        region: 'au',
        isElectronicPaymentEnabled: false,
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(false);
    });

    it('returns false when contact is not supplier', () => {
      const state = {
        contact: {
          selectedContactType: 'Customer',
        },
        region: 'au',
        isElectronicPaymentEnabled: true,
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
        isElectronicPaymentEnabled: true,
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(false);
    });
  });
});
