import { getLoadAccountAfterCreateUrlParams, getSendEmailPayload } from '../IntegratorSelectors';
import state from './fixtures/state';

describe('IntegratorSelectors', () => {
  describe('getLoadAccountAfterCreateUrlParams', () => {
    it('gets businessId and retruns it with accountId', () => {
      const actual = getLoadAccountAfterCreateUrlParams(state, 'accountId');

      expect(actual).toEqual({
        accountId: 'accountId', businessId: 'businessId',
      });
    });
  });

  describe('getSendEmailPayload', () => {
    it('returns the right shape for the email quote payload', () => {
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
});
