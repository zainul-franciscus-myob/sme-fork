import {
  LOAD_INVOICE_DETAIL,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
} from '../../InvoiceIntents';
import {
  getAmountPaid,
  getBusinessId,
  getContactId,
  getDuplicatedInvoiceIdQueryParam,
  getInvoice,
  getInvoiceId,
  getIsCreating,
  getIsTaxInclusive,
  getLines,
  getQuoteIdQueryParam,
  getSelectedContacts,
} from './invoiceDetailSelectors';

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

export const getCreateOrUpdateInvoiceUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getCreateOrUpdateInvoicePayload = (state) => {
  const invoice = getInvoice(state);

  const selectedContacts = getSelectedContacts(state);
  const contactId = getContactId(state);
  const { name: contactName } = selectedContacts[contactId] || {};

  const lines = getLines(state);

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

export const getLoadItemOptionUrlParams = (state, { itemId }) => ({
  businessId: getBusinessId(state),
  itemId,
});

export const getCalculateLineTotalsUrlParams = state => ({
  businessId: getBusinessId(state),
});

export const getInvoiceHistoryUrlParams = (state) => {
  const isCreating = getIsCreating(state);

  const businessId = getBusinessId(state);
  const invoiceId = isCreating ? undefined : getInvoiceId(state);

  return {
    businessId, invoiceId,
  };
};

export const getCalculateLineTotalsContent = (state) => {
  const lines = getLines(state);
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return {
    isTaxInclusive,
    amountPaid,
    lines,
  };
};

export const getCalculateLineTotalsOnAmountChangeContent = (state, { index, key }) => {
  const amountInput = state.invoice.lines[index][key];
  const updatedLines = state.invoice.lines.map(
    (line, lineIndex) => (lineIndex === index
      ? { ...line, [key]: amountInput }
      : line),
  );
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);
  const { layout } = state.invoice;

  return {
    layout,
    index,
    key,
    isTaxInclusive,
    amountPaid,
    lines: updatedLines,
  };
};

export const getCalculateLineTotalsOnItemChangeContent = (state, { index, itemId }) => {
  const lines = getLines(state);
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return {
    index,
    itemId,
    isTaxInclusive,
    amountPaid,
    lines,
  };
};

export const getCalculateLineTotalsOnTaxInclusiveChangeContent = (state) => {
  const lines = getLines(state);
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return {
    lines,
    isTaxInclusive,
    isLineAmountsTaxInclusive: !isTaxInclusive,
    amountPaid,
  };
};
