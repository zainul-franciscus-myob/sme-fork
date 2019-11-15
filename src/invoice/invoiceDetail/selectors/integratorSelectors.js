import {
  LOAD_INVOICE_DETAIL,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
} from '../../InvoiceIntents';
import {
  getBusinessId,
  getContactId,
  getContactOptions,
  getDuplicatedInvoiceIdQueryParam,
  getInvoice,
  getInvoiceId,
  getIsCreating,
  getIsServiceLayout,
  getLayoutQueryParam,
  getLines,
  getQuoteIdQueryParam,
} from './invoiceDetailSelectors';
import { getInvoiceServiceLinesForPayload } from './serviceLayoutSelectors';

export const getLoadInvoiceIntent = (state) => {
  const isCreating = getIsCreating(state);

  if (isCreating) {
    const quoteId = getQuoteIdQueryParam(state);
    if (quoteId) {
      return LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE;
    }

    const duplicatedInvoiceId = getDuplicatedInvoiceIdQueryParam(state);
    if (duplicatedInvoiceId) {
      return LOAD_NEW_DUPLICATE_INVOICE_DETAIL;
    }

    return LOAD_NEW_INVOICE_DETAIL;
  }

  return LOAD_INVOICE_DETAIL;
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);
  const quoteId = isCreating ? getQuoteIdQueryParam(state) : undefined;
  const duplicatedInvoiceId = isCreating ? getDuplicatedInvoiceIdQueryParam(state) : undefined;

  return {
    businessId, invoiceId, quoteId, duplicatedInvoiceId,
  };
};

export const getLoadInvoiceQueryParams = (state) => {
  const isCreating = getIsCreating(state);
  const layout = isCreating ? getLayoutQueryParam(state) : undefined;

  return { layout };
};

export const getCreateOrUpdateInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getCreateOrUpdateInvoicePayload = (state) => {
  const invoice = getInvoice(state);

  const contacts = getContactOptions(state);
  const contactId = getContactId(state);
  const { name: contactName } = contacts.find(({ value }) => contactId === value) || {};

  const isServiceLayout = getIsServiceLayout(state);
  const invoiceLines = getLines(state);
  const lines = isServiceLayout
    ? getInvoiceServiceLinesForPayload(invoiceLines)
    : invoiceLines;

  return {
    ...invoice,
    contactName,
    lines,
  };
};

export const getDeleteInvoiceUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getLoadContactAddressUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const contactId = getContactId(state);

  return { businessId, contactId };
};

export const getLoadAddedContactUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};

export const getLoadPayDirectUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};
