import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsTaxInclusive,
  getLength,
  getLines,
  getNewLine,
} from './invoiceDetailSelectors';

export const getTableData = createSelector(getLength, len => Array(len).fill({}));

export const getLineByIndex = (state, props) => state.invoice.lines[props.index];

export const getInvoiceLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => line || newLine,
);

export const getInvoiceServiceCalculatedTotalsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getIsAccountComboboxDisabled = state => state.isAccountLoading;

export const getInvoiceServiceCalculatedTotalsPayload = (state) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const lines = getLines(state);

  return ({
    isTaxInclusive,
    lines: lines.map(({ allocatedAccountId, amount, taxCodeId }) => ({
      allocatedAccountId, amount, taxCodeId,
    })),
  });
};

export const getInvoiceServiceLinesForPayload = lines => lines.map((line) => {
  const { accountOptions, taxCodeOptions, ...rest } = line;

  return rest;
});
