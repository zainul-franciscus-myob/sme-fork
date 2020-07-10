import {
  getEmailAttachments,
  getFilesForUpload,
  getShowEmailButton,
} from '../EmailSelectors';
import QuoteLayout from '../../QuoteLayout';

describe('EmailSelectors', () => {
  describe('getEmailAttachments', () => {
    it('returns attachments with name and size', () => {
      const attachmentState = {
        emailQuote: {
          attachments: [
            {
              keyName: 'some/key',
              file: { name: 'emailAttachment', size: 1000 },
              state: 'queued',
            },
          ],
        },
      };

      const actual = getEmailAttachments(attachmentState);

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
      const attachmentState = {
        emailQuote: {
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

      const actual = getEmailAttachments(attachmentState);

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
      const attachmentState = {
        emailQuote: {
          attachments: [
            {
              keyName: 'some/key',
              file: { name: 'emailAttachment', size: 1000 },
              state: 'finished',
            },
          ],
        },
      };

      const actual = getEmailAttachments(attachmentState);

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

  describe('getShowEmailButton', () => {
    it.each([
      [QuoteLayout.SERVICE, true],
      [QuoteLayout.ITEM_AND_SERVICE, true],
      [QuoteLayout.PROFESSIONAL, true],
      [QuoteLayout.TIME_BILLING, true],
      [QuoteLayout.MISCELLANEOUS, false],
      ['BOGUS_LAYOUT', false],
    ])('when quote has %s layout, return %s', (layout, expected) => {
      const actual = getShowEmailButton.resultFunc(layout);

      expect(actual).toEqual(expected);
    });
  });
});
