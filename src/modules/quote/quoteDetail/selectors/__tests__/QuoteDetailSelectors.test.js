import {
  getAccountModalContext,
  getIsAccountComboboxDisabled,
  getIsExportingPDF,
  getIsLinesSupported,
  getIsReadOnlyLayout,
  getIsTaxCalculationRequired,
  getQuoteDetailOptions,
  getQuoteLine,
  getTemplateOptions,
  getUpdatedContactOptions,
} from '../QuoteDetailSelectors';
import ModalType from '../../ModalType';
import QuoteLayout from '../../QuoteLayout';
import QuoteLineType from '../../QuoteLineType';

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
            id: '1',
          },
          {
            name: 'Cow Feed 2',
            id: '2',
          },
          {
            name: 'Cow Feed 3',
            id: '3',
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
        contactOptions: [
          { name: 'Cow Feed 1', id: '1' },
          { name: 'Cow Feed 2', id: '2' },
          { name: 'Cow Feed 3', id: '3' },
        ],
        isCalculating: false,
        isCustomerDisabled: true,
        taxExclusiveLabel: 'Tax exclusive',
        taxInclusiveLabel: 'Tax inclusive',
      };

      const actual = getQuoteDetailOptions(state);

      expect(actual).toEqual(expected);
    });
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
      const option1 = { id: '1', name: 'Option 1' };
      const option2 = {
        id: '2',
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

  describe('getTemplateOptions', () => {
    it('should return item template options if the layout is item and service', () => {
      const itemTemplateOptions = {
        defaultTemplate: '',
        templateOptions: [
          {
            name: 'item-related',
            label: 'apple',
          },
        ],
      };

      const state = {
        quote: {
          layout: QuoteLayout.ITEM_AND_SERVICE,
        },
        itemTemplateOptions,
        serviceTemplateOptions: {
          defaultTemplate: '',
          templateOptions: [
            {
              name: 'service-related',
              label: 'apple',
            },
          ],
        },
      };

      const actual = getTemplateOptions(state);

      expect(actual).toEqual(itemTemplateOptions.templateOptions);
    });

    it('should return service template options if the layout is service', () => {
      const serviceTemplateOptions = {
        defaultTemplate: '',
        templateOptions: [
          {
            name: 'service-related',
            label: 'apple',
          },
        ],
      };

      const state = {
        quote: {
          layout: QuoteLayout.SERVICE,
        },
        itemTemplateOptions: {
          defaultTemplate: '',
          templateOptions: [
            {
              name: 'item-related',
              label: 'apple',
            },
          ],
        },
        serviceTemplateOptions,
      };

      const actual = getTemplateOptions(state);

      expect(actual).toEqual(serviceTemplateOptions.templateOptions);
    });
  });

  describe('getIsTaxCalculationRequired', () => {
    it('should calculate tax when at least one line has tax code', () => {
      const state = {
        quote: {
          lines: [
            { taxCodeId: '4' },
            { taxCodeId: '' },
          ],
        },
      };

      const actual = getIsTaxCalculationRequired(state);

      expect(actual).toBe(true);
    });

    it('should not calculate tax when no line has tax code', () => {
      const state = {
        quote: {
          lines: [
            { taxCodeId: '' },
            { taxCodeId: '' },
          ],
        },
      };

      const actual = getIsTaxCalculationRequired(state);

      expect(actual).toBe(false);
    });
  });

  describe('getIsDownloadingPDF', () => {
    it('should return true when modal is submitting and modal type is pdf', () => {
      const state = {
        isModalSubmitting: true,
        modal: {
          type: ModalType.EXPORT_PDF,
        },
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when modal is not submitting', () => {
      const state = {
        isModalSubmitting: false,
        modal: {
          type: ModalType.EXPORT_PDF,
        },
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal type is not export pdf', () => {
      const state = {
        isModalSubmitting: true,
        modal: {
          type: ModalType.EMAIL_QUOTE,
        },
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal is not open', () => {
      const state = {
        isModalSubmitting: false,
        modal: undefined,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getQuoteLine', () => {
    const newLine = { pingu: '🐧' };

    describe('returns new line', () => {
      const actual = getQuoteLine.resultFunc(newLine, undefined);

      expect(actual).toEqual(newLine);
    });

    describe('returns existing line', () => {
      const line = { freddo: '🐸' };

      const actual = getQuoteLine.resultFunc(newLine, line);

      expect(actual).toEqual(line);
    });

    describe('returns subtitle line', () => {
      const line = { type: QuoteLineType.SUB_TOTAL, amount: '10' };

      const actual = getQuoteLine.resultFunc(newLine, line);

      expect(actual).toEqual({ type: QuoteLineType.SUB_TOTAL, description: 'Subtotal', amount: '10' });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [QuoteLineType.SERVICE, true],
      [QuoteLineType.ITEM, true],
      [QuoteLineType.HEADER, false],
      [QuoteLineType.SUB_TOTAL, false],
    ])('validate whether invoice with %s line type are supported', (type, expected) => {
      const lines = [
        { type: QuoteLineType.SERVICE },
        { type: QuoteLineType.ITEM },
        { type },
      ];

      const actual = getIsLinesSupported.resultFunc(lines);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsReadOnlyLayout', () => {
    it.each([
      [QuoteLayout.SERVICE, false],
      [QuoteLayout.ITEM_AND_SERVICE, false],
      [QuoteLayout.PROFESSIONAL, true],
      [QuoteLayout.TIME_BILLING, true],
      [QuoteLayout.MISCELLANEOUS, true],
      ['N/A', true],
    ])('%s layout', (layout, expected) => {
      const actual = getIsReadOnlyLayout({ quote: { layout, lines: [] } });

      expect(actual).toEqual(expected);
    });

    it.each([
      [QuoteLineType.SERVICE, false],
      [QuoteLineType.ITEM, false],
      [QuoteLineType.HEADER, true],
      [QuoteLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnlyLayout({
        quote: {
          layout: QuoteLayout.ITEM_AND_SERVICE,
          lines: [
            { type: QuoteLineType.SERVICE },
            { type: QuoteLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });
  });
});
