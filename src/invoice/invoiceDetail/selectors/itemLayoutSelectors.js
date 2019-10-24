import { createSelector } from 'reselect';

import {
  getAmountPaid,
  getBusinessId,
  getIsTaxInclusive,
  getLength,
  getLines,
  getNewLine,
} from './invoiceDetailSelectors';

export const getItemLayoutTable = createSelector(
  getLength,
  length => Array(length).fill({}),
);

export const getInvoiceLineByIndex = (state, { index }) => {
  const invoiceLine = state.invoice.lines[index];

  return invoiceLine || getNewLine(state);
};

export const getShouldLineSelectItem = (state, { index }) => {
  const lineCount = getLength(state);

  return lineCount <= index;
};

export const getNewLineIndex = state => getLength(state) - 1;

export const getIsAnAmountLineInput = key => ['units', 'unitPrice', 'discount', 'amount'].includes(key);

export const getInvoiceItemCalculatedLinesUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getInvoiceItemCalculateTaxInclusiveChangePayload = (state) => {
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

export const getInvoiceItemCalculateLineChangePayload = ({ state, index, itemId }) => {
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

export const getInvoiceItemCalculateAmountChangePayload = (state, index, key) => {
  const amountInput = state.invoice.lines[index][key];
  const updatedLines = state.invoice.lines.map(
    (line, lineIndex) => (lineIndex === index
      ? { ...line, [key]: amountInput }
      : line),
  );
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return {
    index,
    key,
    isTaxInclusive,
    amountPaid,
    lines: updatedLines,
  };
};

export const getInvoiceItemCalculateTaxCodeChangePayload = (state) => {
  const lines = getLines(state);
  const isTaxInclusive = getIsTaxInclusive(state);
  const amountPaid = getAmountPaid(state);

  return {
    isTaxInclusive,
    amountPaid,
    lines,
  };
};

// eslint-disable-next-line max-len
export const getInvoiceItemCalculateLineRemovalPayload = getInvoiceItemCalculateTaxCodeChangePayload;
