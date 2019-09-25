import {
  getCreateDuplicateQuoteURL,
  getCreateInvoiceFromQuoteURL,
  getCreateNewItemQuoteURL,
  getEmptyQuoteLines,
  getExpiredDate,
  getExportPdfForms,
  getIsTaxInclusive,
  getPayloadForUpdateIsTaxInclusive,
  getQuoteLineByIndex,
} from '../ItemQuoteSelectors';

describe('ItemQuoteSelectors', () => {
  describe('getIsTaxInclusive', () => {
    [
      {
        input: true,
        output: 'Tax inclusive',
      },
      {
        input: false,
        output: 'Tax exclusive',
      },
    ].forEach((test) => {
      it(`returns ${test.input} when ${test.output}`, () => {
        const state = {
          quote: {
            isTaxInclusive: test.input,
          },
        };

        expect(getIsTaxInclusive(state)).toEqual(test.output);
      });
    });
  });

  describe('getExpiredDate with term', () => {
    describe('OnADayOfTheMonth', () => {
      it('returns a day of next month when exp days bigger than issue date', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-26',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });

      it('returns a day of current month when exp days smaller than issue date', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-24',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('InAGivenNumberOfDays', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-02-04',
            expirationTerm: 'InAGivenNumberOfDays',
            expirationDays: '27',
          },
        };
        const expected = '03/03/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('DayOfMonthAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-30',
            expirationTerm: 'DayOfMonthAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '31/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('NumberOfDaysAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-30',
            expirationTerm: 'NumberOfDaysAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '01/06/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('Prepaid', () => {
      it('returns issueDate', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-30',
            expirationTerm: 'Prepaid',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('CashOnDelivery', () => {
      it('returns issueDate', () => {
        const expDateState = {
          quote: {
            issueDate: '2019-04-30',
            expirationTerm: 'CashOnDelivery',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });
  });

  describe('getEmptyQuoteLines', () => {
    it('gives empty array of quote lines size', () => {
      const state = {
        quote: {
          lines: [
            1, 2, 3,
          ],
        },
      };
      const expected = [{}, {}, {}];
      expect(getEmptyQuoteLines(state)).toEqual(expected);
    });
  });

  describe('getQuoteLineByIndex', () => {
    it('gets a quote line by index', () => {
      const state = {
        quote: {
          lines: [
            'a', 'b', 'c',
          ],
        },
      };
      const index = 2;
      const expected = 'c';

      expect(getQuoteLineByIndex(state, { index })).toEqual(expected);
    });

    it('gets new line when nothing present at index', () => {
      const state = {
        quote: {
          lines: [
            'a', 'b', 'c',
          ],
        },
        newLine: 'd',
      };
      const index = 3;
      const expected = 'd';

      expect(getQuoteLineByIndex(state, { index })).toEqual(expected);
    });
  });

  describe('getPayloadForUpdateIsTaxInclusive', () => {
    it('returns payload with current line tax inclusive state', () => {
      const state = {
        quote: {
          isTaxInclusive: true,
          lines: [],
        },
      };

      const actual = getPayloadForUpdateIsTaxInclusive(state);

      expect(actual.isTaxInclusive).toEqual(false);
    });
  });

  const getURLState = {
    region: 'au',
    businessId: 'businessId',
    quoteId: '1',
    layout: 'item',
  };

  describe('getCreateInvoiceFromQuoteURL', () => {
    it('returns the correct URL to create an invoice from quote', () => {
      const expected = '/#/au/businessId/invoice/newItem?quoteId=1';
      const actual = getCreateInvoiceFromQuoteURL(getURLState);

      expect(expected).toEqual(actual);
    });
  });

  describe('getCreateNewItemQuoteURL', () => {
    it('returns the correct URL to create a new quote', () => {
      const expected = '/#/au/businessId/quote/newItem';
      const actual = getCreateNewItemQuoteURL(getURLState);

      expect(expected).toEqual(actual);
    });
  });

  describe('getCreateDuplicateQuoteURL', () => {
    it('returns the correct URL to create a duplicate quote from another quote CRUD page', () => {
      const expected = '/#/au/businessId/quote/newItem?duplicatedQuoteId=1';
      const actual = getCreateDuplicateQuoteURL(getURLState);

      expect(expected).toEqual(actual);
    });
  });

  describe('getExportPdfForms', () => {
    it('gets export pdf forms', () => {
      const state = {
        exportPdf: {
          forms: [
            {
              name: 'a',
              label: 'apple',
            },
          ],
        },
      };

      const actual = getExportPdfForms(state);

      expect(actual).toEqual([
        {
          name: 'a',
          label: 'apple',
        },
      ]);
    });
  });
});
