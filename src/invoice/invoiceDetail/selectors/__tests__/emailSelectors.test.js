import { getSendEmailPayload } from '../emailSelectors';

describe('emailSelectors', () => {
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
          attachments: [],
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
        attachments: [],
      };

      const actual = getSendEmailPayload(state);

      expect(actual).toEqual(expected);
    });
  });
});
