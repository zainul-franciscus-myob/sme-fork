import {
  getAddNewItemLabel,
  getContactModalContext,
  getLoadContactOptionsParams,
  getSearchContactParams,
} from '../contactComboboxSelectors';
import ContactType from '../types/ContactType';

describe('contactComboboxSelectors', () => {
  describe('getAddNewItemLabel', () => {
    it.each([
      ['Create customer', ContactType.CUSTOMER],
      ['Create supplier', ContactType.SUPPLIER],
      ['Create employee', ContactType.EMPLOYEE],
      ['Create contact', ContactType.ALL],
      ['Create contact', ContactType.ALL_EXCLUDING_EMPLOYEE],
      ['Create contact', ContactType.OTHER],
    ])('return "%s" when contact type is %s', (expected, contactType) => {
      const actual = getAddNewItemLabel.resultFunc(contactType);

      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadContactOptionsParams', () => {
    it('return query parameters for load contact options', () => {
      const expected = { contactType: ContactType.CUSTOMER, offset: 3 };
      const state = {
        contactType: ContactType.CUSTOMER,
        pagination: { offset: 3 },
      };

      const actual = getLoadContactOptionsParams(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getSearchContactParams', () => {
    it('return query parameters for load contact options', () => {
      const expected = {
        contactType: ContactType.CUSTOMER,
        offset: 0,
        keywords: 'keywords',
      };
      const state = {
        contactType: ContactType.CUSTOMER,
        pagination: { offset: 3 },
      };

      const actual = getSearchContactParams(state, 'keywords');

      expect(actual).toEqual(expected);
    });
  });

  describe('getContactModalContext', () => {
    it.each([
      ['Customer', ContactType.CUSTOMER],
      ['Supplier', ContactType.SUPPLIER],
      [undefined, ContactType.EMPLOYEE],
      [undefined, ContactType.ALL],
      [undefined, ContactType.ALL_EXCLUDING_EMPLOYEE],
      [undefined, ContactType.OTHER],
    ])(
      'return %s contact type for quick add modal',
      (expected, contactType) => {
        const state = {
          businessId: '1232-1232',
          region: 'au',
          contactType,
        };

        const actual = getContactModalContext(state);

        expect(actual).toEqual({
          businessId: '1232-1232',
          region: 'au',
          contactType: expected,
        });
      }
    );
  });
});
