import {
  getActiveEntry,
  getAddedEntries,
  getFilteredEntriesByKey,
  getIsEntryLoading,
  getIsEntryUploadingDone,
  getShouldPolling,
  getTableEntries,
  getUpdatedEntriesByKey,
  getUploadCompleteAlert,
  getUploadedEntry,
  getUploadingEntry,
  getUploadingErrorMessage,
} from '../InTrayListSelectors';
import OCRStatus from '../../OCRStatus';
import uploadStatuses from '../../uploadStatuses';

describe('InTrayListSelectors', () => {
  describe('getTableEntries', () => {
    describe('showInvoiceDetails', () => {
      it('should return true on existing document', () => {
        const entries = [{ id: 'id-1', ocrStatus: 'Completed' }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showInvoiceDetails).toBeTruthy();
      });

      it('should return false if file is uploading', () => {
        const entries = [
          { uploadId: 'uploadId-1', uploadStatus: uploadStatuses.inProgress },
        ];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showInvoiceDetails).toBeFalsy();
      });

      it('should return false if OCR is in progress', () => {
        const entries = [{ id: 'id-1', ocrStatus: 'InProgress' }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showInvoiceDetails).toBeFalsy();
      });

      it('should return false if document is submitting', () => {
        const entries = [{ id: 'id-1', isSubmitting: true }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showInvoiceDetails).toBeFalsy();
      });
    });

    describe('showActions', () => {
      it('should return true on existing document', () => {
        const entries = [{ id: 'id-1', ocrStatus: 'Completed' }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showActions).toBeTruthy();
      });

      it('should return false if file is uploading', () => {
        const entries = [
          { uploadId: 'uploadId-1', uploadStatus: uploadStatuses.inProgress },
        ];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showActions).toBeFalsy();
      });

      it('should return true if OCR is in progress', () => {
        const entries = [{ id: 'id-1', ocrStatus: 'InProgress' }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showActions).toBeTruthy();
      });

      it('should return false if document is submitting', () => {
        const entries = [{ id: 'id-1', isSubmitting: true }];

        const actual = getTableEntries.resultFunc(entries);

        expect(actual[0].showActions).toBeFalsy();
      });
    });
  });

  describe('getIsEntryLoading', () => {
    it('should return true if any of the entry is uploading', () => {
      const entries = [
        { uploadId: 'uploadId-1', uploadStatus: uploadStatuses.inProgress },
        { id: 'id-1' },
      ];

      const actual = getIsEntryLoading.resultFunc(entries);

      expect(actual).toBeTruthy();
    });

    it('should return true if any of the entry is submitting', () => {
      const entries = [{ id: 'id-1' }, { id: 'id-2', isSubmitting: true }];

      const actual = getIsEntryLoading.resultFunc(entries);

      expect(actual).toBeTruthy();
    });

    it('should return false if none of the entry is uploading or submitting', () => {
      const entries = [{ id: 'id-1' }, { id: 'id-2' }];

      const actual = getIsEntryLoading.resultFunc(entries);

      expect(actual).toBeFalsy();
    });
  });

  describe('getUploadingErrorMessage', () => {
    describe('validateFileSize', () => {
      it.each([
        [1, undefined],
        [10000000, undefined],
        [10000001, 'The file is too large. Please choose a file under 10MB.'],
      ])('should allow file size with in 10 MB limit', (size, expected) => {
        const file = { size, type: 'application/pdf' };

        const actual = getUploadingErrorMessage(file);

        expect(actual).toEqual(expected);
      });
    });

    describe('validateFileType', () => {
      it.each([
        ['application/pdf', undefined],
        ['image/png', undefined],
        ['image/jpeg', undefined],
        ['image/tiff', undefined],
        [
          'text/plain',
          "You can't attach a file of this format. Please use PDF, JPG, TIFF or PNG files.",
        ],
      ])('should allow file size with in 10 MB limit', (type, expected) => {
        const file = { size: 10, type };

        const actual = getUploadingErrorMessage(file);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getUploadingEntry', () => {
    it('should return a unique uploadId and upload status in progress', () => {
      const actual = getUploadingEntry(0);

      expect(actual.uploadId).toBeDefined();
      expect(actual.uploadStatus).toEqual(uploadStatuses.inProgress);
    });
  });

  describe('getUploadedEntry', () => {
    it('should return in tray entry with upload status done', () => {
      const id = 'id';
      const uploadId = 'uploadId';
      const entry = { id };
      const expected = { id, uploadId, uploadStatus: uploadStatuses.done };

      const actual = getUploadedEntry(uploadId, entry);

      expect(actual).toEqual(expected);
    });
  });

  describe('getAddedEntries', () => {
    it('should add a new entry to in tray list at first position', () => {
      const entry = { id: 'newEntry' };
      const entries = [{ id: '1' }, { id: '2' }];
      const state = { inTrayList: { entries } };
      const expected = [entry, { id: '1' }, { id: '2' }];

      const actual = getAddedEntries(state, entry);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdatedEntriesByKey', () => {
    it('should update entry by id', () => {
      const id = '1';
      const partialEntry = { id, isLoading: true };
      const entries = [{ id }, { id: '2' }];
      const state = { inTrayList: { entries } };
      const expected = [{ id, isLoading: true }, { id: '2' }];

      const actual = getUpdatedEntriesByKey(
        state,
        'id',
        partialEntry.id,
        partialEntry
      );

      expect(actual).toEqual(expected);
    });

    it('should update entry by uploadId', () => {
      const uploadId = '1';
      const partialEntry = { uploadId, isLoading: true };
      const entries = [{ uploadId }, { uploadId: '2' }];
      const state = { inTrayList: { entries } };
      const expected = [{ uploadId, isLoading: true }, { uploadId: '2' }];

      const actual = getUpdatedEntriesByKey(
        state,
        'uploadId',
        partialEntry.uploadId,
        partialEntry
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilteredEntriesByKey', () => {
    it('should remove entry by id', () => {
      const id = '1';
      const entries = [{ id }, { id: '2' }];
      const state = { inTrayList: { entries } };
      const expected = [{ id: '2' }];

      const actual = getFilteredEntriesByKey(state, 'id', id);

      expect(actual).toEqual(expected);
    });

    it('should remove entry by uploadId', () => {
      const uploadId = '1';
      const entries = [{ uploadId }, { uploadId: '2' }];
      const state = { inTrayList: { entries } };
      const expected = [{ uploadId: '2' }];

      const actual = getFilteredEntriesByKey(state, 'uploadId', uploadId);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUploadCompleteAlert', () => {
    it('should return success alert when all requests succeeded', () => {
      const results = [
        { success: true, response: { message: 'Success!' } },
        { success: true, response: { message: 'Success!' } },
        { success: true, response: { message: 'Success!' } },
      ];

      const expected = { message: 'Success!', type: 'success' };

      const actual = getUploadCompleteAlert(results);

      expect(actual).toEqual(expected);
    });

    it('should return danger alert when all request failed', () => {
      const results = [
        { success: false, response: { message: 'Failed!' } },
        { success: false, response: { message: 'Failed!' } },
        { success: false, response: { message: 'Failed!' } },
      ];

      const expected = { message: 'Failed! Failed! Failed!', type: 'danger' };

      const actual = getUploadCompleteAlert(results);

      expect(actual).toEqual(expected);
    });

    it('should return danger alert when one of the requests failed', () => {
      const results = [
        { success: true, response: { message: 'Success!' } },
        { success: false, response: { message: 'Failed!' } },
        { success: true, response: { message: 'Success!' } },
      ];

      const expected = { message: 'Failed!', type: 'danger' };

      const actual = getUploadCompleteAlert(results);

      expect(actual).toEqual(expected);
    });

    it('should return danger alert with concat error message', () => {
      const results = [
        { success: true, response: { message: 'Success!' } },
        { success: false, response: { message: 'Failed!' } },
        { success: false, response: { message: 'Failed!' } },
      ];

      const expected = { message: 'Failed! Failed!', type: 'danger' };

      const actual = getUploadCompleteAlert(results);

      expect(actual).toEqual(expected);
    });
  });

  describe('getActiveEntry', () => {
    it('should return active entry when activeEntryId is set', () => {
      const state = {
        inTrayList: {
          activeEntryId: '1',
          entries: [
            {
              id: '1',
              uploadedDate: '01/01/19',
            },
            {
              id: '2',
              uploadedDate: '02/02/19',
            },
          ],
        },
      };

      const expected = { activeEntryId: '1', uploadedDate: '01/01/19' };

      const actual = getActiveEntry(state);

      expect(actual).toEqual(expected);
    });

    it('should return uploadedDate set to empty when activeEntryId is not set', () => {
      const state = {
        inTrayList: {
          activeEntryId: undefined,
          entries: [
            {
              id: '1',
              uploadedDate: '01/01/19',
            },
            {
              id: '2',
              uploadedDate: '02/02/19',
            },
          ],
        },
      };

      const expected = { activeEntryId: undefined, uploadedDate: '' };

      const actual = getActiveEntry(state);

      expect(actual).toEqual(expected);
    });

    it('should return uploadedDate set to empty when no uploadedDate found', () => {
      const state = {
        inTrayList: {
          activeEntryId: '1',
          entries: [
            {
              id: '1',
            },
            {
              id: '2',
              uploadedDate: '02/02/19',
            },
          ],
        },
      };

      const expected = { activeEntryId: '1', uploadedDate: '' };

      const actual = getActiveEntry(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsEntryUploadingDone', () => {
    it('should return false when uploadStatus is inProgress', () => {
      const state = {
        inTrayList: {
          entries: [
            {
              id: '1',
              uploadStatus: uploadStatuses.inProgress,
            },
          ],
        },
      };

      const expected = false;

      const actual = getIsEntryUploadingDone(state, '1');

      expect(actual).toEqual(expected);
    });

    it('should return true when uploadStatus is done', () => {
      const state = {
        inTrayList: {
          entries: [
            {
              id: '1',
              uploadStatus: uploadStatuses.done,
            },
          ],
        },
      };

      const expected = true;

      const actual = getIsEntryUploadingDone(state, '1');

      expect(actual).toEqual(expected);
    });

    it('should return true when there is no uploadStatus', () => {
      const state = {
        inTrayList: {
          entries: [
            {
              id: '1',
            },
          ],
        },
      };

      const expected = true;

      const actual = getIsEntryUploadingDone(state, '1');

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldPolling', () => {
    it('should return false when all items have OCR status Completed', () => {
      const state = {
        inTrayList: {
          entries: [
            { ocrStatus: OCRStatus.Completed },
            { ocrStatus: OCRStatus.Completed },
          ],
        },
      };

      const expected = false;

      const actual = getShouldPolling(state);

      expect(actual).toEqual(expected);
    });

    it('should return true when all items have OCR status InProgress', () => {
      const state = {
        inTrayList: {
          entries: [
            { ocrStatus: OCRStatus.InProgress },
            { ocrStatus: OCRStatus.InProgress },
          ],
        },
      };

      const expected = true;

      const actual = getShouldPolling(state);

      expect(actual).toEqual(expected);
    });

    it('should return true when any item has OCR status InProgress', () => {
      const state = {
        inTrayList: {
          entries: [
            { ocrStatus: OCRStatus.Completed },
            { ocrStatus: OCRStatus.InProgress },
          ],
        },
      };

      const expected = true;

      const actual = getShouldPolling(state);

      expect(actual).toEqual(expected);
    });

    it('should return false if there is no in tray document', () => {
      const state = {
        inTrayList: {
          entries: [],
        },
      };

      const expected = false;

      const actual = getShouldPolling(state);

      expect(actual).toEqual(expected);
    });
  });
});
