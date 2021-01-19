import {
  getEmailAttachments,
  getEmailDetailFromPurchaseOrderDetail,
  getFilesForUpload,
  getShowEmailButton,
} from '../EmailSelectors';
import PurchaseOrderLayout from '../../types/PurchaseOrderLayout';

describe('emailSelectors', () => {
  describe('getEmailDetailFromPurchaseOrderDetail', () => {
    it('defaults toEmail to an array of empty string if toEmail is empty', () => {
      const emailPurchaseOrder = {
        hasEmailReplyDetails: true,
        ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
        toEmail: [],
        subject: 'Hot Chocolate is life',
        otherStuff: 'otherStuff',
      };

      const actual = getEmailDetailFromPurchaseOrderDetail({
        emailPurchaseOrder,
      });

      expect(actual.toEmail).toEqual(['']);
    });

    it('defaults ccToEmail to an array of empty string if ccToEmail is empty', () => {
      const emailPurchaseOrder = {
        hasEmailReplyDetails: true,
        ccToEmail: [],
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        subject: 'Hot Chocolate is life',
        otherStuff: 'otherStuff',
      };

      const actual = getEmailDetailFromPurchaseOrderDetail({
        emailPurchaseOrder,
      });

      expect(actual.ccToEmail).toEqual(['']);
    });

    it('returns an empty object if there is no emailPurchaseOrder in payload', () => {
      const actual = getEmailDetailFromPurchaseOrderDetail({
        emailPurchaseOrder: undefined,
      });
      expect(actual).toEqual({});
    });
  });

  describe('getEmailAttachments', () => {
    it('returns attachments with name and size', () => {
      const state = {
        emailPurchaseOrder: {
          attachments: [
            {
              keyName: 'some/key',
              file: { name: 'emailAttachment', size: 1000 },
              state: 'queued',
            },
          ],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [
        {
          keyName: 'some/key',
          name: 'emailAttachment',
          size: 1000,
          loaded: 0,
          state: 'queued',
          error: undefined,
          canRemove: false,
          file: { name: 'emailAttachment', size: 1000 },
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('calculates loaded size', () => {
      const state = {
        emailPurchaseOrder: {
          attachments: [
            {
              keyName: 'some/key',
              file: { name: 'emailAttachment', size: 1000 },
              uploadProgress: 0.5,
              state: 'loading',
            },
          ],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [
        {
          keyName: 'some/key',
          name: 'emailAttachment',
          size: 1000,
          loaded: 500,
          state: 'loading',
          error: undefined,
          canRemove: false,
          file: { name: 'emailAttachment', size: 1000 },
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('sets canRemove to true if the state is not loading or queued', () => {
      const state = {
        emailPurchaseOrder: {
          attachments: [
            {
              keyName: 'some/key',
              file: { name: 'emailAttachment', size: 1000 },
              state: 'finished',
            },
          ],
        },
      };

      const actual = getEmailAttachments(state);

      const expected = [
        {
          keyName: 'some/key',
          name: 'emailAttachment',
          size: 1000,
          loaded: 0,
          state: 'finished',
          error: undefined,
          canRemove: true,
          file: { name: 'emailAttachment', size: 1000 },
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilesForUpload', () => {
    it('get files for upload', () => {
      const files = [{ file: 'invalid' }, { file: 'valid' }];

      const state = {
        emailPurchaseOrder: {
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

  describe('getShowEmailButton', () => {
    it.each([
      [PurchaseOrderLayout.SERVICE, true],
      [PurchaseOrderLayout.ITEM_AND_SERVICE, true],
      [PurchaseOrderLayout.PROFESSIONAL, false],
      [PurchaseOrderLayout.TIME_BILLING, false],
      [PurchaseOrderLayout.MISCELLANEOUS, false],
      ['BOGUS_LAYOUT', false],
    ])('when purchase order has %s layout, return %s', (layout, expected) => {
      const actual = getShowEmailButton.resultFunc(layout);

      expect(actual).toEqual(expected);
    });
  });
});
