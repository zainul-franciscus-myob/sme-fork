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
  getDuplicateId,
  getInvoice,
  getInvoiceId,
  getIsCreating,
  getLines,
  getQuoteIdQueryParam,
} from './invoiceDetailSelectors';

export const getLoadInvoiceIntent = (state) => {
  const isCreating = getIsCreating(state);

  if (isCreating) {
    const quoteId = getQuoteIdQueryParam(state);
    if (quoteId) {
      return LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE;
    }

    const duplicateId = getDuplicateId(state);
    if (duplicateId) {
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
  const duplicateId = isCreating ? getDuplicateId(state) : undefined;

  return {
    businessId, invoiceId, quoteId, duplicateId,
  };
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
  const { name: contactName } = contacts.find(({ id }) => contactId === id) || {};

  const lines = getLines(state);

  return {
    ...invoice,
    contactName,
    lines,
  };
};

export const getCreateOrUpdatePreConversionUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getDeleteInvoiceUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getCreateOrUpdatePreConversionPayload = (state) => {
  const {
    contactId,
    expirationTerm,
    expirationDays,
    isTaxInclusive,
    invoiceNumber,
    address,
    issueDate,
    purchaseOrderNumber,
    note,
    amountPaid,
    isAllowOnlinePayments,
    lines,
  } = getInvoice(state);

  return {
    contactId,
    expirationTerm,
    expirationDays,
    isTaxInclusive,
    invoiceNumber,
    address,
    issueDate,
    purchaseOrderNumber,
    note,
    amountPaid,
    isAllowOnlinePayments,
    lines,
  };
};

export const getDeletePreConversionInvoiceUrlParams = (state) => {
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

export const getLoadItemOptionUrlParams = (state, { itemId }) => ({
  businessId: getBusinessId(state),
  itemId,
});

export const getInvoiceHistoryUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return {
    businessId, invoiceId,
  };
};
