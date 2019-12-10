import {
  getAccountModalContext,
  getIsAccountComboboxDisabled,
  getLoadQuoteDetailModalType,
  getQuoteDetailOptions,
  getUpdatedContactOptions,
} from '../QuoteDetailSelectors';
import ModalType from '../../ModalType';

describe('QuoteDetailSelectors', () => {
  describe('getQuoteDetailOptions', () => {
    it('returns correct shape for QuoteDetailOptions component', () => {
      const state = {
        quote: {
          id: '1',
          contactId: '3',
          contactName: 'Patrick Bateman',
          expirationTerm: 'Prepaid',
          expirationDays: 0,
          chargeForLatePayment: 123.12,
          discountForEarlyPayment: 3546.34,
          numberOfDaysForDiscount: 10,
          amountPaid: '10.00',
          isTaxInclusive: true,
          quoteNumber: '0000012334563456',
          address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
          issueDate: '2018-11-02',
          purchaseOrderNumber: '123',
          note: 'Thank you!',
        },
        commentOptions: [],
        contactOptions: [
          {
            name: 'Cow Feed 1',
            value: '1',
          },
          {
            name: 'Cow Feed 2',
            value: '2',
          },
          {
            name: 'Cow Feed 3',
            value: '3',
          },
        ],
        expirationTermOptions: [
          {
            value: 'OnADayOfTheMonth',
            name: 'On a day of the month',
          },
          {
            value: 'InAGivenNumberOfDays',
            name: 'In a given no. of days',
          },
          {
            value: 'DayOfMonthAfterEOM',
            name: 'Day of month after EOM',
          },
          {
            value: 'NumberOfDaysAfterEOM',
            name: 'No. of days after EOM',
          },
          {
            value: 'Prepaid',
            name: 'Prepaid',
          },
          {
            value: 'CashOnDelivery',
            name: 'C.O.D.',
          },
        ],
        isCreating: false,
        isCalculating: false,
        isContactLoading: false,
        region: 'au',
        businessId: '123',
      };

      const expected = {
        contactId: '3',
        contactName: 'Patrick Bateman',
        address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        quoteNumber: '0000012334563456',
        purchaseOrderNumber: '123',
        issueDate: '2018-11-02',
        expirationTerm: 'Prepaid',
        expirationDays: 0,
        expirationTermOptions: [
          {
            value: 'OnADayOfTheMonth',
            name: 'On a day of the month',
          },
          {
            value: 'InAGivenNumberOfDays',
            name: 'In a given no. of days',
          },
          {
            value: 'DayOfMonthAfterEOM',
            name: 'Day of month after EOM',
          },
          {
            value: 'NumberOfDaysAfterEOM',
            name: 'No. of days after EOM',
          },
          {
            value: 'Prepaid',
            name: 'Prepaid',
          },
          {
            value: 'CashOnDelivery',
            name: 'C.O.D.',
          },
        ],
        isTaxInclusive: true,
        note: 'Thank you!',
        contactOptions: [
          { name: 'Cow Feed 1', value: '1' },
          { name: 'Cow Feed 2', value: '2' },
          { name: 'Cow Feed 3', value: '3' },
        ],
        commentOptions: [],
        isCreating: false,
        isCalculating: false,
        isContactLoading: false,
        contactLink: '/#/au/123/contact/3',
        taxExclusiveLabel: 'Tax exclusive',
        taxInclusiveLabel: 'Tax inclusive',
      };

      const actual = getQuoteDetailOptions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadQuoteDetailModalType', () => {
    it.each([
      [ModalType.NONE, false, undefined, undefined, { hasEmailReplyDetails: true }],
      [ModalType.EMAIL_INVOICE, false, 'true', undefined, { hasEmailReplyDetails: true }],
      [ModalType.EMAIL_SETTINGS, false, 'true', undefined, { hasEmailReplyDetails: false }],
      [ModalType.EXPORT_PDF, false, undefined, 'true', { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, undefined, undefined, { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, 'true', undefined, { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, 'true', undefined, { hasEmailReplyDetails: false }],
      [ModalType.NONE, true, undefined, 'true', { hasEmailReplyDetails: true }],
    ], ('should return modal type %s', (
      expected, isCreating, openSendEmail, openExportPdf, emailQuote,
    ) => {
      const customState = {
        invoiceId: isCreating ? 'new' : '1',
        openSendEmail,
        openExportPdf,
      };

      const actual = getLoadQuoteDetailModalType(customState, emailQuote);

      expect(actual).toEqual(expected);
    }));
  });

  describe('getIsAccountComboboxDisabled', () => {
    it('returns true when account is loading', () => {
      const loadingState = {
        isAccountLoading: true,
      };

      const actual = getIsAccountComboboxDisabled(loadingState);

      expect(actual).toEqual(true);
    });
    it('returns false when account is not loading', () => {
      const loadingState = {
        isAccountLoading: false,
      };

      const actual = getIsAccountComboboxDisabled(loadingState);

      expect(actual).toEqual(false);
    });
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const contextState = {
        region: 'Spain', businessId: 'manzana',
      };

      const actual = getAccountModalContext(contextState);

      expect(actual).toEqual({ region: 'Spain', businessId: 'manzana' });
    });
  });

  describe('getUpdatedCustomerOptions', () => {
    it('should contain newly added contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = {
        value: '2',
        name: 'Option 2',
      };
      const expected = [option2, option1];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });

    it('should contain updated contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = {
        value: '1',
        name: 'Option 1',
      };
      const expected = [option2];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });
  });
});
