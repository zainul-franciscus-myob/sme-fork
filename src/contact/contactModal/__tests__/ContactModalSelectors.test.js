import { getTitle } from '../ContactModalSelectors';

describe('ContactModalSelectors', () => {
  describe('getTitle', () => {
    it.each([
      [false, 'Customer', 'Create customer'],
      [false, 'Supplier', 'Create supplier'],
      [false, 'Other', 'Create general'],
      [true, undefined, 'Create contact'],
      [false, undefined, 'Create contact'],
    ])('should return modal title based on contact type', (showContactType, contactType, expected) => {
      const contactTypeOptions = [
        { name: 'Customer', value: 'Customer' },
        { name: 'Supplier', value: 'Supplier' },
        { name: 'General', value: 'Other' },
      ];

      const actual = getTitle.resultFunc(showContactType, contactType, contactTypeOptions);

      expect(actual).toEqual(expected);
    });
  });
});
