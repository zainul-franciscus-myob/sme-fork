import { createSelector } from 'reselect';

import {
  getBusinessId,
  getCustomerId,
  getIsCreating,
  getIsCustomerDisabled,
  getRegion,
} from './invoiceDetailSelectors';

export const getCustomerQuoteCount = (state) => state.customerQuotes.length;
export const getCustomerHasNoQuotes = (state) => !state.customerQuotes.length;
export const getShouldShowCustomerQuotes = createSelector(
  getCustomerId,
  (state) => state.isLoadingCustomerQuotes,
  (customerId, isLoadingQuotes) => !!customerId && !isLoadingQuotes
);
export const getCustomerQuotes = createSelector(
  getBusinessId,
  getRegion,
  (state) => state.customerQuotes,
  (businessId, region, customerQuotes) =>
    customerQuotes.map((quote) => {
      return {
        ...quote,
        url: `/#/${region}/${businessId}/quote/${quote.id}`,
      };
    })
);
export const getCustomerQuoteId = (state) => state.customerQuoteId;
export const getInvoiceQuoteUrl = createSelector(
  getBusinessId,
  getRegion,
  getCustomerQuoteId,
  (businessId, region, customerQuoteId) =>
    `/#/${region}/${businessId}/invoice/new?quoteId=${customerQuoteId}`
);
export const getShouldEnableConvertQuote = createSelector(
  getCustomerQuoteId,
  (customerQuoteId) => !!customerQuoteId
);

export const getShouldLoadCustomerQuote = (state) => {
  const isCreating = getIsCreating(state);
  const isCustomerDisabled = getIsCustomerDisabled(state);
  const customerId = getCustomerId(state);

  return isCreating && !isCustomerDisabled && customerId;
};
