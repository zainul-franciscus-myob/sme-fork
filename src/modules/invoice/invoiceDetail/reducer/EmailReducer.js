export const saveEmailSettings = (state) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    hasEmailReplyDetails: true,
  },
  emailInvoiceDefaultState: {
    ...state.emailInvoice,
    hasEmailReplyDetails: true,
  },
});

export const resetEmailInvoiceDetail = (state) => ({
  ...state,
  emailInvoice: state.emailInvoiceDefaultState,
});

export const updateEmailInvoiceDetail = (state, action) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    [action.key]: action.value,
  },
});

const isMoreThan25MB = (size) => size > 25000000;

const buildAttachmentState = (size) =>
  isMoreThan25MB(size)
    ? { state: 'failed', error: 'File is more than 25MB' }
    : { state: 'queued' };

export const addAttachments = (state, { files }) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    attachments: [
      ...state.emailInvoice.attachments,
      ...files.map((file) => ({
        ...buildAttachmentState(file.size),
        file,
      })),
    ],
  },
});

const updateEmailAttachment = (state, file, partialAttachment) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    attachments: state.emailInvoice.attachments.map((attachment) =>
      attachment.file === file
        ? { ...attachment, ...partialAttachment }
        : attachment
    ),
  },
});

export const uploadEmailAttachment = (
  state,
  { keyName, uploadPassword, file }
) =>
  updateEmailAttachment(state, file, {
    keyName,
    uploadPassword,
    state: 'finished',
  });

export const uploadEmailAttachmentFailed = (state, { message, file }) =>
  updateEmailAttachment(state, file, { error: message, state: 'failed' });

export const uploadEmailAttachmentUploadProgress = (
  state,
  { file, uploadProgress }
) => updateEmailAttachment(state, file, { state: 'loading', uploadProgress });

export const removeEmailAttachment = (state, { index }) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    attachments: state.emailInvoice.attachments.filter(
      (attachment, i) => index !== i
    ),
  },
});

export const setIsPreviewingPdf = (state, { isPreviewingPdf }) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    isPreviewingPdf,
  },
});
