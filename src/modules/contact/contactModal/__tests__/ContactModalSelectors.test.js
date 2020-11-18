import {
  getShouldShowPaymentDetails,
  getTitle,
} from '../ContactModalSelectors';

describe('ContactModalSelectors', () => {
  describe('getTitle', () => {
    it.each([
      [false, 'Customer', 'Create customer'],
      [false, 'Supplier', 'Create supplier'],
      [false, 'Other', 'Create personal'],
      [true, undefined, 'Create contact'],
      [false, undefined, 'Create contact'],
    ])(
      'should return modal title based on contact type',
      (showContactType, contactType, expected) => {
        const contactTypeOptions = [
          { name: 'Customer', value: 'Customer' },
          { name: 'Supplier', value: 'Supplier' },
          { name: 'Personal', value: 'Other' },
        ];

        const actual = getTitle.resultFunc(
          showContactType,
          contactType,
          contactTypeOptions
        );

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getShouldShowPaymentDetails', () => {
    it('returns true when contact is au supplier', () => {
      const state = {
        contact: {
          contactType: 'Supplier',
        },
        region: 'au',
      };

      const actual = getShouldShowPaymentDetails(state);
      expect(actual).toBe(true);
    });

    it('returns false when contact is not supplier', () => {
      const state = {
        contact: {
          contactType: 'Customer',
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
