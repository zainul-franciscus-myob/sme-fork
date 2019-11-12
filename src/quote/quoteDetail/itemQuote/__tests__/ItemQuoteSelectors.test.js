import {
  getCreateDuplicateQuoteURL,
  getCreateInvoiceFromQuoteURL,
  getCreateNewItemQuoteURL,
  getEmailAttachments,
  getEmptyQuoteLines,
  getExpiredDate,
  getFilesForUpload,
  getIsTaxInclusive,
  getLoadQuoteDetailModalType,
  getPayloadForUpdateIsTaxInclusive,
  getQuoteLineByIndex,
  getSendEmailPayload,
} from '../ItemQuoteSelectors';
import ModalType from '../../ModalType';

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
      const expected = '/#/au/businessId/invoice/new?quoteId=1';
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

  describe('getSendEmailPayload', () => {
    it('returns the right shape for the email quote payload', () => {
      const state = {
        emailQuote: {
          hasEmailReplyDetails: true,
          ccToEmail: [
            'geoff.spires@myob.com', 'tom.xu@myob.com',
          ],
          fromEmail: 'tom.xu@myob.com',
          fromName: 'Tom Xu',
          messageBody: 'Thank you for your patronage!',
          subject: 'Thank you!',
          toEmail: [
            'geoff.spires@myob.com', 'tom.xu@myob.com',
          ],
          templateName: 'INV Item print',
          includeQuoteNumberInEmail: true,
          attachments: [
            {
              keyName: 'some/key',
              uploadPassword: 'some/password',
              file: { name: 'emailAttachment', size: 1000, type: 'image/svg+xml' },
              state: 'finished',
            },
            {
              file: { name: 'failedEmailAttachment', size: 2000, type: 'image/svg+xml' },
              state: 'failed',
            },
          ],
        },
      };

      const expected = {
        ccToEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        fromEmail: 'tom.xu@myob.com',
        fromName: 'Tom Xu',
        messageBody: 'Thank you for your patronage!',
        subject: 'Thank you!',
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        templateName: 'INV Item print',
        attachments: [{
          filename: 'emailAttachment',
          mimeType: 'image/svg+xml',
          keyName: 'some/key',
          uploadPassword: 'some/password',
        }],
      };

      const actual = getSendEmailPayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getEmailAttachments', () => {
    it('returns attachments with name and size', () => {
      const attachmentState = {
        emailQuote: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            state: 'queued',
          }],
        },
      };

      const actual = getEmailAttachments(attachmentState);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 0,
        state: 'queued',
        error: undefined,
        canRemove: false,
      }];

      expect(actual).toEqual(expected);
    });

    it('calculates loaded size', () => {
      const attachmentState = {
        emailQuote: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            uploadProgress: 0.5,
            state: 'loading',
          }],
        },
      };

      const actual = getEmailAttachments(attachmentState);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 500,
        state: 'loading',
        error: undefined,
        canRemove: false,
      }];

      expect(actual).toEqual(expected);
    });

    it('sets canRemove to true if the state is not loading or queued', () => {
      const attachmentState = {
        emailQuote: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            state: 'finished',
          }],
        },
      };

      const actual = getEmailAttachments(attachmentState);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 0,
        state: 'finished',
        error: undefined,
        canRemove: true,
      }];

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilesForUpload', () => {
    it('get files for upload', () => {
      const files = [
        { file: 'invalid' },
        { file: 'valid' },
      ];

      const filesForUploadState = {
        emailQuote: {
          attachments: [
            {
              file: files[0],
              state: 'failed',
            },
            {
              file: files[1],
              state: 'queued',
            },
            {
              file: { file: 'unknown' },
              state: 'queued',
            },
          ],
        },
      };

      const expected = [files[1]];

      const actual = getFilesForUpload(filesForUploadState, files);

      expect(actual).toEqual(expected);
    });
  });
});
