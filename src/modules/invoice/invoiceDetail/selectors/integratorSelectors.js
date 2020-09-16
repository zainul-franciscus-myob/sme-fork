import {
  LOAD_INVOICE_DETAIL,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
} from '../../InvoiceIntents';
import {
  getBusinessId,
  getCustomerId,
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

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};

export const getLoadInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);
  const quoteId = isCreating ? getQuoteIdQueryParam(state) : undefined;
  const duplicateId = isCreating ? getDuplicateId(state) : undefined;

  return {
    businessId,
    invoiceId,
    quoteId,
    duplicateId,
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
  const lines = getLines(state);
  const quoteId = getQuoteIdQueryParam(state);

  return {
    ...invoice,
    lines,
    quoteId,
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
    customerId,
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
    customerId,
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

export const getLoadCustomerUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const customerId = getCustomerId(state);

  return { businessId, customerId };
};

export const getLoadAddedCustomerUrlParams = (state, customerId) => {
  const businessId = getBusinessId(state);

  return { businessId, customerId };
};

export const getLoadAbnFromCustomerUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const customerId = getCustomerId(state);

  return { businessId, customerId };
};

export const getLoadPayDirectUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getInvoiceHistoryUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return {
    businessId,
    invoiceId,
  };
};
