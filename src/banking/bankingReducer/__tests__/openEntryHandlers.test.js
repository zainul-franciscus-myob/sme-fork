import { ADD_ATTACHMENTS, UPLOAD_ATTACHMENT, UPLOAD_ATTACHMENT_FAILED } from '../../BankingIntents';
import { loadOpenEntry } from '../openEntryHandlers';
import bankingReducer from '../index';

describe('openEntryHandlers', () => {
  describe('addAttachments', () => {
    it('should add less than 10MB attachment', () => {
      const state = {
        openEntry: {
          attachments: [],
        },
      };

      const file = {
        name: 'filename',
        size: 10000000,
      };

      const action = {
        intent: ADD_ATTACHMENTS,
        files: [file],
      };

      const expected = {
        openEntry: {
          attachments: [{
            name: 'filename',
            size: 10000000,
            state: 'queued',
            file,
          }],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should set failed state when adding more than 10MB attachment', () => {
      const state = {
        openEntry: {
          attachments: [],
        },
      };

      const file = {
        name: 'filename',
        size: 10000001,
      };

      const action = {
        intent: ADD_ATTACHMENTS,
        files: [file],
      };

      const expected = {
        openEntry: {
          attachments: [{
            name: 'filename',
            size: 10000001,
            state: 'failed',
            error: 'File is more than 10MB',
            file,
          }],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachment', () => {
    it('update state for uploaded attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        openEntry: {
          attachments: [{
            state: 'queued',
            name: 'filename',
            file,
          }],
        },
      };

      const action = {
        intent: UPLOAD_ATTACHMENT,
        id: 'document id',
        name: 'filename',
        file,
      };

      const expected = {
        openEntry: {
          attachments: [{
            id: 'document id',
            name: 'filename',
            state: 'finished',
            file,
          }],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachmentFailed', () => {
    it('update state for upload failed attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        openEntry: {
          attachments: [{
            state: 'queued',
            file,
          }],
        },
      };

      const action = {
        intent: UPLOAD_ATTACHMENT_FAILED,
        message: 'error',
        file,
      };

      const expected = {
        openEntry: {
          attachments: [{
            state: 'failed',
            error: 'error',
            file,
          }],
        },
      };

      const actual = bankingReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('loadOpenEntry', () => {
    const attachments = ['some', 'attachments'];

    const state = {
      entries: [
        {},
        { description: 'abc' },
      ],
      openEntry: {
        attachments,
      },
    };
    it('should preserve attachments', () => {
      const actual = loadOpenEntry(state, 1, 'propName', 'propValue', true);

      expect(actual.openEntry.attachments).toBe(attachments);
    });
    it('should preserve bank feed description', () => {
      const actual = loadOpenEntry(state, 1, 'propName', 'propValue', true);

      expect(actual.openEntry.description).toEqual('abc');
    });
  });
});
