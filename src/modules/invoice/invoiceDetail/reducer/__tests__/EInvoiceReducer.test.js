import {
  ADD_EINVOICE_ATTACHMENTS,
  REMOVE_EINVOICE_ATTACHMENT,
  RESET_SEND_EINVOICE_ATTACHMENTS,
} from '../../../InvoiceIntents';
import {
  addEInvoiceAttachments,
  removeEInvoiceAttachment,
  resetSendEInvoiceAttachments,
} from '../EInvoiceReducer';

describe('EInvoiceReducer', () => {
  describe('resetSendEInvoiceAttachments', () => {
    it('should reset eInvoice to default state', () => {
      const state = {
        eInvoice: {
          appName: 'FooBar',
          attachments: [
            {
              file: 'FILE',
              state: 'finished',
              key: '123',
            },
          ],
        },
      };
      const action = {
        intent: RESET_SEND_EINVOICE_ATTACHMENTS,
      };
      const actual = resetSendEInvoiceAttachments(state, action);

      expect(actual.eInvoice).toEqual({
        appName: 'FooBar',
        attachments: [],
      });
    });
  });

  describe('addEInvoiceAttachments', () => {
    describe('transform payload of attachments', () => {
      it('should add single attachment to eInvoice from state', () => {
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments: [],
          },
        };
        const action = {
          intent: ADD_EINVOICE_ATTACHMENTS,
          files: [
            {
              name: 'File',
              type: 'text/pdf',
            },
          ],
        };
        const actual = addEInvoiceAttachments(state, action);

        expect(actual.eInvoice.appName).toEqual('FooBar');
        expect(actual.eInvoice.attachments).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              state: 'finished',
              key: expect.any(String),
              file: expect.any(Object),
            }),
          ])
        );
      });

      it('should add single attachment to eInvoice from previous state', () => {
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments: [
              {
                state: 'finished',
                key: '123',
                file: 'FILE',
              },
            ],
          },
        };
        const action = {
          intent: ADD_EINVOICE_ATTACHMENTS,
          files: [
            {
              name: 'File',
              type: 'text/pdf',
            },
          ],
        };
        const actual = addEInvoiceAttachments(state, action);

        expect(actual.eInvoice.appName).toEqual('FooBar');
        expect(actual.eInvoice.attachments.length).toEqual(2);
      });

      it('should add multiple attachments to eInvoice from state', () => {
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments: [],
          },
        };
        const files = new Array(3).fill({
          name: 'File',
          type: 'text/pdf',
        });
        const action = {
          intent: ADD_EINVOICE_ATTACHMENTS,
          files,
        };
        const actual = addEInvoiceAttachments(state, action);

        expect(actual.eInvoice.appName).toEqual('FooBar');
        expect(actual.eInvoice.attachments.length).toEqual(3);
      });

      it('should add error to attachment in eInvoice from state when file size is more than 25MB', () => {
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments: [],
          },
        };
        const file = {
          size: 25000001,
          name: 'File',
          type: 'text/pdf',
        };
        const action = {
          intent: ADD_EINVOICE_ATTACHMENTS,
          files: [file],
        };
        const actual = addEInvoiceAttachments(state, action);

        expect(actual.eInvoice.appName).toEqual('FooBar');
        expect(actual.eInvoice.attachments.length).toEqual(1);
        expect(actual.eInvoice.attachments).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              state: 'failed',
              error: 'File is more than 25MB',
              key: expect.any(String),
              file: expect.any(Object),
            }),
          ])
        );
      });
    });
  });

  describe('removeEInvoiceAttachment', () => {
    const state = {
      eInvoice: {
        attachments: [
          {
            state: 'finished',
            key: '123',
            file: 'FILE1',
          },
          {
            state: 'finished',
            key: '234',
            file: 'FILE2',
          },
          {
            state: 'finished',
            key: '345',
            file: 'FILE3',
          },
        ],
      },
    };
    it.each`
      index | expected
      ${0}  | ${2}
      ${2}  | ${2}
    `(
      `should remove attachment from eInvoice state when given index: "$index"`,
      ({ index, expected }) => {
        const action = {
          intent: REMOVE_EINVOICE_ATTACHMENT,
          index,
        };
        const actual = removeEInvoiceAttachment(state, action);

        expect(actual.eInvoice.attachments.length).toEqual(expected);
        expect(actual.eInvoice.attachments[index]).not.toEqual(
          state.eInvoice.attachments[index]
        );
      }
    );
  });
});
