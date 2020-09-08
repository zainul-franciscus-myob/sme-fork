import { getAttachments, getFilesForUpload } from '../attachmentsSelectors';

describe('attachmentsSelectors', () => {
  describe('getAttachments', () => {
    it('get attachment list', () => {
      const state = {
        openEntry: {
          attachments: [
            {
              id: '1',
              name: 'name.pdf',
              size: 1234,
              state: 'queued',
              error: 'too large file',
              isInProgress: true,
            },
            {
              id: '2',
              name: 'name2.pdf',
              size: 1234,
              isInProgress: false,
            },
            {
              id: '3',
              name: 'name3.pdf',
              size: 1000,
              uploadProgress: 0.5,
              state: 'loading',
            },
          ],
        },
      };

      const expected = [
        {
          id: '1',
          name: 'name.pdf',
          size: 1234,
          loaded: 0,
          state: 'queued',
          error: 'too large file',
          canOperate: false,
          isInProgress: true,
        },
        {
          id: '2',
          name: 'name2.pdf',
          size: 1234,
          loaded: 0,
          state: 'default',
          canOperate: true,
          isInProgress: false,
        },
        {
          id: '3',
          name: 'name3.pdf',
          size: 1000,
          loaded: 500,
          state: 'loading',
          canOperate: false,
        },
      ];

      const actual = getAttachments(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilesForUpload', () => {
    it('get files for upload', () => {
      const files = [{ file: 'invalid' }, { file: 'valid' }];

      const state = {
        openEntry: {
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
