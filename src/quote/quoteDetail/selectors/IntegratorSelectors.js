import { LOAD_NEW_DUPLICATE_QUOTE_DETAIL, LOAD_NEW_QUOTE_DETAIL, LOAD_QUOTE_DETAIL } from '../../QuoteIntents';
import {
  getBusinessId,
  getContactId,
  getDuplicateQuoteIdQueryParam,
  getExportPdfTemplate,
  getIsCreating,
  getIsTaxInclusive,
  getLayoutQueryParam,
  getLines,
  getQuote,
  getQuoteId,
} from './QuoteDetailSelectors';

export const getLoadQuoteIntent = (state) => {
  const isCreating = getIsCreating(state);

  if (isCreating) {
    const duplicatedQuoteId = getDuplicateQuoteIdQueryParam(state);
    if (duplicatedQuoteId) {
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
  const duplicatedQuoteId = isCreating ? getDuplicateQuoteIdQueryParam(state) : undefined;

  return { businessId, quoteId, duplicatedQuoteId };
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

export const getQuoteServiceCalculatedTotalsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getQuoteServiceCalculatedTotalsPayload = (state) => {
  const quote = getQuote(state);

  return {
    isTaxInclusive: quote.isTaxInclusive,
    lines: quote.lines.map(({ allocatedAccountId, amount, taxCodeId }) => ({
      allocatedAccountId, amount, taxCodeId,
    })),
  };
};

export const getQuoteItemCalculatedLinesUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getCalculateQuoteItemItemChangePayload = (state, index, itemId) => ({
  index,
  itemId,
  lines: getLines(state),
  isTaxInclusive: getIsTaxInclusive(state),
});

export const getCalculateQuoteItemLineRemovePayload = state => ({
  lines: getLines(state),
  isTaxInclusive: getIsTaxInclusive(state),
});

export const getCalculateQuoteItemTaxCodeChangePayload = state => ({
  lines: getLines(state),
  isTaxInclusive: getIsTaxInclusive(state),
});

export const getCalculateQuoteItemIsTaxInclusiveChangePayload = (state) => {
  const currentLineIsTaxInclusiveState = !getIsTaxInclusive(state);
  return {
    lines: getLines(state),
    isTaxInclusive: currentLineIsTaxInclusiveState,
  };
};

export const getCalculateQuoteItemAmountChangePayload = (state, index, key) => ({
  index,
  key,
  lines: getLines(state),
  isTaxInclusive: getIsTaxInclusive(state),
});

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
