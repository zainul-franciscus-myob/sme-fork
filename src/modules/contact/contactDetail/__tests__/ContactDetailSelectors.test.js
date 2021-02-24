import {
  getFormattedBillingAddress,
  getFormattedShippingAddress,
  getIsPersonalContactType,
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
        'https://justin.com/preferences/customer?consumer=ARL&source=SMEP&origin=Customer&cfid=1234&id=e312-e312-e312-e312';
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

  describe('getIsPersonalContactType', () => {
    it('return false when selected contact type is not other', () => {
      const state = {
        contact: {
          selectedContactType: 'Customer',
        },
      };

      const actual = getIsPersonalContactType(state);
      expect(actual).toBe(false);
    });

    it('return true when selected contact type is other', () => {
      const state = {
        contact: {
          selectedContactType: 'Other',
        },
      };

      const actual = getIsPersonalContactType(state);
      expect(actual).toBe(true);
    });
  });

  describe('getFormattedShippingAddress', () => {
    it('shouldShowAutocompleteAddressCombobox is true given country is Australia', () => {
      const state = {
        contact: {
          shippingAddress: {
            country: 'Australia',
            phoneNumbers: [],
          },
        },
      };
      const actual = getFormattedShippingAddress(state);
      expect(actual.shouldShowAutocompleteAddressCombobox).toBe(true);
    });

    it('shouldShowAutocompleteAddressCombobox is false given country is not Australia', () => {
      const state = {
        contact: {
          shippingAddress: {
            country: 'Brazil',
            phoneNumbers: [],
          },
        },
      };
      const actual = getFormattedShippingAddress(state);
      expect(actual.shouldShowAutocompleteAddressCombobox).toBe(false);
    });
  });

  describe('getFormattedBillingAddress', () => {
    it('shouldShowAutocompleteAddressCombobox is true given country is Australia', () => {
      const state = {
        contact: {
          billingAddress: {
            country: 'Australia',
            phoneNumbers: [],
          },
        },
      };
      const actual = getFormattedBillingAddress(state);
      expect(actual.shouldShowAutocompleteAddressCombobox).toBe(true);
    });

    it('shouldShowAutocompleteAddressCombobox is false given country is not Australia', () => {
      const state = {
        contact: {
          billingAddress: {
            country: 'Brazil',
            phoneNumbers: [],
          },
        },
      };
      const actual = getFormattedBillingAddress(state);
      expect(actual.shouldShowAutocompleteAddressCombobox).toBe(false);
    });
  });
});
