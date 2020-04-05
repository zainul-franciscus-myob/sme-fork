import {
  getCanSaveEmailSettings,
  getEmailAttachments,
  getEmailDetailFromLoadInvoiceDetail,
  getFilesForUpload,
  getSendEmailPayload,
} from '../emailSelectors';

describe('emailSelectors', () => {
  describe('getEmailDetailFromLoadInvoiceDetail', () => {
    const invoiceNumber = '1';

    it('modifies subject to include invoice number if includeInvoiceNumberInEmail is true', () => {
      const emailInvoice = {
        hasEmailReplyDetails: true,
        ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        includeInvoiceNumberInEmail: true,
        subject: 'Hot Chocolate is life',
        otherStuff: 'otherStuff',
      };

      const actual = getEmailDetailFromLoadInvoiceDetail({ emailInvoice, invoiceNumber });

      expect(actual.subject).toEqual('Invoice 1; Hot Chocolate is life');
    });

    it('defaults toEmail to an array of empty string if toEmail is empty', () => {
      const emailInvoice = {
        hasEmailReplyDetails: true,
        ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
        toEmail: [],
        includeInvoiceNumberInEmail: false,
        subject: 'Hot Chocolate is life',
        otherStuff: 'otherStuff',
      };

      const actual = getEmailDetailFromLoadInvoiceDetail({ emailInvoice, invoiceNumber });

      expect(actual.toEmail).toEqual(['']);
    });

    it('defaults ccToEmail to an array of empty string if ccToEmail is empty', () => {
      const emailInvoice = {
        hasEmailReplyDetails: true,
        ccToEmail: [],
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        includeInvoiceNumberInEmail: false,
        subject: 'Hot Chocolate is life',
        otherStuff: 'otherStuff',
      };

      const actual = getEmailDetailFromLoadInvoiceDetail({ emailInvoice, invoiceNumber });

      expect(actual.ccToEmail).toEqual(['']);
    });

    it('returns an empty object if there is no emailInvoice in payload', () => {
      const actual = getEmailDetailFromLoadInvoiceDetail({
        emailInvoice: undefined,
        invoiceNumber,
      });
      expect(actual).toEqual({});
    });
  });

  describe('getCanSaveEmailSettings', () => {
    it('should return true if neither fromEmail nor fromName is empty', () => {
      const state = {
        emailInvoice: {
          fromName: 'a',
          fromEmail: 'b',
        },
      };

      const actual = getCanSaveEmailSettings(state);
      expect(actual).toBeTruthy();
    });

    [
      { fromName: 'a', fromEmail: '' },
      { fromName: '', fromEmail: 'b' },
      { fromName: '', fromEmail: '' },
    ].forEach(({ fromName, fromEmail }) => {
      it('should return false if either fromName or fromEmail is empty', () => {
        const state = {
          emailInvoice: {
            fromName,
            fromEmail,
          },
        };

        const actual = getCanSaveEmailSettings(state);
        expect(actual).toBeFalsy();
      });
    });
  });

  describe('getSendEmailPayload', () => {
    it('returns the right shape for the email invoice payload', () => {
      const state = {
        emailInvoice: {
          hasEmailReplyDetails: true,
          businessName: 'Blue Bowl Homewares',
          ccToEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
          fromEmail: 'tom.xu@myob.com',
          fromName: 'Tom Xu',
          messageBody: 'Thank you for your patronage!',
          subject: 'Thank you!',
          toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
          toName: 'Geoff Speirs',
          templateName: 'INV Item print',
          includeInvoiceNumberInEmail: true,
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
        businessName: 'Blue Bowl Homewares',
        ccToEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        fromEmail: 'tom.xu@myob.com',
        fromName: 'Tom Xu',
        messageBody: 'Thank you for your patronage!',
        subject: 'Thank you!',
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        toName: 'Geoff Speirs',
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
      const state = {
        emailInvoice: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            state: 'queued',
          }],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 0,
        state: 'queued',
        error: undefined,
        canRemove: false,
        file: { name: 'emailAttachment', size: 1000 },
      }];

      expect(actual).toEqual(expected);
    });

    it('calculates loaded size', () => {
      const state = {
        emailInvoice: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            uploadProgress: 0.5,
            state: 'loading',
          }],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 500,
        state: 'loading',
        error: undefined,
        canRemove: false,
        file: { name: 'emailAttachment', size: 1000 },
      }];

      expect(actual).toEqual(expected);
    });

    it('sets canRemove to true if the state is not loading or queued', () => {
      const state = {
        emailInvoice: {
          attachments: [{
            keyName: 'some/key',
            file: { name: 'emailAttachment', size: 1000 },
            state: 'finished',
          }],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [{
        keyName: 'some/key',
        name: 'emailAttachment',
        size: 1000,
        loaded: 0,
        state: 'finished',
        error: undefined,
        canRemove: true,
        file: { name: 'emailAttachment', size: 1000 },
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

      const state = {
        emailInvoice: {
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

      const actual = getFilesForUpload(state, files);

      expect(actual).toEqual(expected);
    });
  });
});
