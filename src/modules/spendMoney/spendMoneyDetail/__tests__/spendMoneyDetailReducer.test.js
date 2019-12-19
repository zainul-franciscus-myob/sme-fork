import {
  ADD_ATTACHMENTS,
  PREFILL_DATA_FROM_IN_TRAY,
  UPDATE_SPEND_MONEY_HEADER,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../../SpendMoneyIntents';
import spendMoneyReducer from '../spendMoneyDetailReducer';

describe('spendMoneyDetailReducer', () => {
  describe('addAttachments', () => {
    it('should add less than 10MB attachment', () => {
      const state = {
        attachments: [],
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
        attachments: [{
          name: 'filename',
          size: 10000000,
          state: 'queued',
          file,
        }],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should set failed state when adding more than 10MB attachment', () => {
      const state = {
        attachments: [],
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
        attachments: [{
          name: 'filename',
          size: 10000001,
          state: 'failed',
          error: 'File is more than 10MB',
          file,
        }],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachment', () => {
    it('update state for uploaded attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        attachments: [{
          state: 'queued',
          name: 'filename',
          file,
        }],
      };

      const action = {
        intent: UPLOAD_ATTACHMENT,
        id: 'document id',
        name: 'filename',
        file,
      };

      const expected = {
        attachments: [{
          id: 'document id',
          name: 'filename',
          state: 'finished',
          file,
        }],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachmentFailed', () => {
    it('update state for upload failed attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        attachments: [{
          state: 'queued',
          file,
        }],
      };

      const action = {
        intent: UPLOAD_ATTACHMENT_FAILED,
        message: 'error',
        file,
      };

      const expected = {
        attachments: [{
          state: 'failed',
          error: 'error',
          file,
        }],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateHeader', () => {
    describe('selectedPayToContactId', () => {
      it('should update selectedPayToContactId and isReportable', () => {
        const state = {
          spendMoney: {
            isReportable: false,
            selectedPayToContactId: '2',
            payToContacts: [
              { id: '1', isReportable: true },
              { id: '2', isReportable: false },
            ],
          },
        };

        const action = {
          intent: UPDATE_SPEND_MONEY_HEADER,
          key: 'selectedPayToContactId',
          value: '1',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.selectedPayToContactId).toEqual('1');
        expect(actual.spendMoney.isReportable).toBeTruthy();
      });
    });

    describe('isReportable', () => {
      it('should update value', () => {
        const state = {
          spendMoney: {
            isReportable: false,
          },
        };

        const action = {
          intent: UPDATE_SPEND_MONEY_HEADER,
          key: 'isReportable',
          value: true,
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.isReportable).toBeTruthy();
      });
    });

    it('updates prefill status when corresponding field changed', () => {
      const state = {
        spendMoney: {},
        prefillStatus: {
          description: true,
        },
      };

      const action = {
        intent: UPDATE_SPEND_MONEY_HEADER,
        key: 'description',
        value: 'dummy text',
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.prefillStatus).toEqual({
        description: false,
      });
    });
  });

  describe('PREFILL_NEW_SPEND_MONEY_FROM_IN_TRAY', () => {
    const document = {
      thumbnailUrl: 'https://assets.digital.myob.com/images/favicons/apple-touch-icon.png',
      uploadedDate: '04/04/2019',
    };

    const buildExpected = ({ spendMoney, prefillStatus }) => ({
      spendMoney,
      inTrayDocument: document,
      prefillStatus,
      isPageEdited: true,
      showPrefillInfo: true,
    });

    it('prefills spendMoney', () => {
      const state = {
        spendMoney: {},
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const response = {
        spendMoney: {
          date: '2019-01-01',
          description: 'Some notes 437889188',
          selectedPayToContactId: '2',
          isTaxInclusive: true,
          lines: [
            {
              amount: '10.00',
              description: 'Cooler Large',
            },
          ],
        },
        newLine: {
          amount: '500.77',
          displayAmount: '500.77',
        },
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(buildExpected({
        spendMoney: {
          selectedPayToContactId: '2',
          date: '2019-01-01',
          description: 'Some notes 437889188',
          isTaxInclusive: true,
          lines: [{
            amount: '10.00',
            displayAmount: '10.00',
          }],
        },
        prefillStatus: {
          date: true,
          description: true,
          isTaxInclusive: true,
          selectedPayToContactId: true,
        },
      }));
    });

    it('does not prefill bill when no ocr data available', () => {
      const state = {
        spendMoney: {},
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const response = {
        spendMoney: {},
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(buildExpected({
        spendMoney: {
        },
        prefillStatus: {
          date: false,
          description: false,
          isTaxInclusive: false,
          selectedPayToContactId: false,
        },
      }));
    });
  });
});
