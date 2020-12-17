import uuid from '../../../../common/uuid/uuid';

const isMoreThan25MB = (size) => size > 25000000;

const buildAttachmentState = (size) =>
  isMoreThan25MB(size)
    ? { state: 'failed', error: 'File is more than 25MB' }
    : { state: 'finished' };

const buildAttachmentKey = () => ({ key: uuid() });

export const resetSendEInvoiceAttachments = (state, { modalAlert }) => ({
  ...state,
  modalAlert,
  eInvoice: {
    ...state.eInvoice,
    attachments: [],
  },
});

export const addEInvoiceAttachments = (state, { files }) => ({
  ...state,
  eInvoice: {
    ...state.eInvoice,
    attachments: [
      ...state.eInvoice.attachments,
      ...files.map((file) => ({
        ...buildAttachmentState(file.size),
        ...buildAttachmentKey(),
        file,
      })),
    ],
  },
});

export const removeEInvoiceAttachment = (state, { index }) => ({
  ...state,
  eInvoice: {
    ...state.eInvoice,
    attachments: state.eInvoice.attachments.filter(
      (attachment, i) => index !== i
    ),
  },
});
