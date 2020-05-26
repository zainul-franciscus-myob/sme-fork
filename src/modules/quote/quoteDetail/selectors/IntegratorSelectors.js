import {
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
} from '../../QuoteIntents';
import {
  getBusinessId,
  getContactId,
  getDuplicateId,
  getExportPdfTemplate,
  getIsCreating,
  getLayoutQueryParam,
  getQuote,
  getQuoteId,
} from './QuoteDetailSelectors';

export const getLoadQuoteIntent = (state) => {
  const isCreating = getIsCreating(state);

  if (isCreating) {
    const duplicateId = getDuplicateId(state);

    if (duplicateId) {
      return LOAD_NEW_DUPLICATE_QUOTE_DETAIL;
    }

    return LOAD_NEW_QUOTE_DETAIL;
  }

  return LOAD_QUOTE_DETAIL;
};

export const getLoadQuoteUrlParams = (state) => {
  const isCreating = getIsCreating(state);
  const businessId = getBusinessId(state);

  const quoteId = isCreating ? undefined : getQuoteId(state);
  const duplicateId = isCreating ? getDuplicateId(state) : undefined;

  return { businessId, quoteId, duplicateId };
};

export const getLoadQuoteQueryParams = (state) => {
  const isCreating = getIsCreating(state);
  const layout = isCreating ? getLayoutQueryParam(state) : undefined;

  return { layout };
};

export const getCreateOrUpdateQuoteUrlParams = (state) => {
  const isCreating = getIsCreating(state);
  const businessId = getBusinessId(state);
  const quoteId = isCreating ? undefined : getQuoteId(state);

  return { businessId, quoteId };
};

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};

export const getCreateOrUpdateQuotePayload = (state) => {
  const quote = getQuote(state);
  const lines = quote.lines.map((line) => {
    const { accountOptions, taxCodeOptions, ...rest } = line;
    return rest;
  });

  return ({
    ...quote,
    lines,
  });
};

export const getDeleteQuoteUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const quoteId = getQuoteId(state);

  return { businessId, quoteId };
};

export const getLoadContactAddressUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const contactId = getContactId(state);

  return { businessId, contactId };
};

export const getLoadContactAfterCreateUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};

export const getLoadAccountAfterCreateUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadItemAfterCreateUrlParams = (state, itemId) => {
  const businessId = getBusinessId(state);

  return ({ businessId, itemId });
};

export const getSendEmailUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const quoteId = getQuoteId(state);

  return { businessId, quoteId };
};

export const getSendEmailPayload = (state) => {
  const {
    hasEmailReplyDetails,
    includeQuoteNumberInEmail,
    attachments,
    ...restOfEmailQuote
  } = state.emailQuote;

  return {
    ...restOfEmailQuote,
    attachments: attachments
      .filter(attachment => attachment.state === 'finished')
      .map(({ file, keyName, uploadPassword }) => ({
        filename: file.name,
        mimeType: file.type,
        keyName,
        uploadPassword,
      })),
  };
};

export const getUploadEmailAttachmentUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getExportPdfQuoteUrlParams = state => ({
  businessId: getBusinessId(state),
  quoteId: getQuoteId(state),
});

export const getExportPdfQuoteParams = state => ({
  formName: getExportPdfTemplate(state),
});
