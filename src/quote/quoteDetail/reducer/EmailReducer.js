export const updateEmailQuoteDetail = (state, action) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    [action.key]: action.value,
  },
});

export const resetOpenSendEmailParam = state => ({
  ...state,
  openSendEmail: 'false',
});

export const resetEmailQuoteDetail = state => ({
  ...state,
  emailQuote: state.emailQuoteDefaultState,
});

const isMoreThan25MB = size => size > 25000000;

const buildAttachmentState = size => (
  isMoreThan25MB(size) ? { state: 'failed', error: 'File is more than 25MB' } : { state: 'queued' }
);

export const addAttachments = (state, { files }) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: [
      ...state.emailQuote.attachments,
      ...files.map(file => ({
        ...buildAttachmentState(file.size),
        file,
      })),
    ],
  },

});

const updateEmailAttachment = (state, file, partialAttachment) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: state.emailQuote.attachments.map(attachment => (
      attachment.file === file ? { ...attachment, ...partialAttachment } : attachment
    )),
  },
});

export const uploadEmailAttachment = (state, { keyName, uploadPassword, file }) => (
  updateEmailAttachment(state, file, { keyName, uploadPassword, state: 'finished' })
);

export const uploadEmailAttachmentFailed = (state, { message, file }) => (
  updateEmailAttachment(state, file, { error: message, state: 'failed' })
);

export const uploadEmailAttachmentUploadProgress = (state, { file, uploadProgress }) => (
  updateEmailAttachment(state, file, { state: 'loading', uploadProgress })
);

export const removeEmailAttachment = (state, { index }) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: state.emailQuote.attachments.filter((attachment, i) => index !== i),
  },
});
