import { getSendEmailPayload } from '../PurchaseOrderIntegratorSelectors';

describe('getSendEmailPayload', () => {
  it('returns the right shape for the email purchase order payload', () => {
    const state = {
      emailPurchaseOrder: {
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
        includePurchaseOrderNumberInEmail: true,
        attachments: [
          {
            keyName: 'some/key',
            uploadPassword: 'some/password',
            file: {
              name: 'emailAttachment',
              size: 1000,
              type: 'image/svg+xml',
            },
            state: 'finished',
          },
          {
            file: {
              name: 'failedEmailAttachment',
              size: 2000,
              type: 'image/svg+xml',
            },
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
      attachments: [
        {
          filename: 'emailAttachment',
          mimeType: 'image/svg+xml',
          keyName: 'some/key',
          uploadPassword: 'some/password',
        },
      ],
    };

    const actual = getSendEmailPayload(state);

    expect(actual).toEqual(expected);
  });
});
