import {
  addAttachments,
  removeEmailAttachment,
  uploadEmailAttachment,
} from '../EmailReducer';

describe('Purchase Order: EmailReducer', () => {
  describe('addAttachments', () => {
    it('should set set state for each attachment', () => {
      const state = {
        emailPurchaseOrder: {
          attachments: [],
        },
      };

      const newAttachment = {
        filename: 'attach.txt',
        mimeType: 'application/text',
        keyName: 'Path/Attach.txt',
        uploadPassword: '123',
      };

      const expectedState = {
        emailPurchaseOrder: {
          attachments: [{ file: newAttachment, state: 'queued' }],
        },
      };

      const actual = addAttachments(state, { files: [newAttachment] });
      expect(actual).toMatchObject(expectedState);
    });
  });

  describe('uploadEmailAttachment', () => {
    it('should add new attachment to the existing attachments', () => {
      const existingAttachment = {
        filename: '1.txt',
        mimeType: 'applicatin/text',
      };

      const state = {
        emailPurchaseOrder: {
          attachments: [{ file: existingAttachment }],
        },
      };

      const expectedState = {
        emailPurchaseOrder: {
          attachments: [
            {
              file: existingAttachment,
              keyName: 'Path/1.txt',
              uploadPassword: '456',
              state: 'finished',
            },
          ],
        },
      };

      const actual = uploadEmailAttachment(state, {
        keyName: 'Path/1.txt',
        uploadPassword: '456',
        file: existingAttachment,
      });

      expect(actual).toStrictEqual(expectedState);
    });
  });

  describe('removeEmailAttachment', () => {
    it('should remove the attachment from the existing attachments', () => {
      const state = {
        emailPurchaseOrder: {
          attachments: [
            {
              file: {
                filename: '1.txt',
                mimeType: 'applicatin/text',
              },
            },
            {
              file: {
                filename: '2.txt',
                mimeType: 'applicatin/text',
              },
            },
          ],
        },
      };

      const expectedState = {
        emailPurchaseOrder: {
          attachments: [
            {
              file: {
                filename: '2.txt',
                mimeType: 'applicatin/text',
              },
            },
          ],
        },
      };

      const actual = removeEmailAttachment(state, { index: 0 });
      expect(actual).toStrictEqual(expectedState);
    });
  });
});
