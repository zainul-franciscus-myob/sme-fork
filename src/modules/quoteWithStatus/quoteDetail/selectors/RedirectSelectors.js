import {
  getBusinessId,
  getLayout,
  getQuoteId,
  getRegion,
} from './QuoteDetailSelectors';

const getBaseUrl = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);

  return `/#/${region}/${businessId}`;
};

const getCreateQuoteUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/quote/new`;
};

export const getCreateNewQuoteUrl = (state) => {
  const createQuoteUrl = getCreateQuoteUrl(state);
  const layout = getLayout(state);

  return `${createQuoteUrl}?layout=${layout}`;
};

const getReadQuoteUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const quoteId = getQuoteId(state);

  return `${baseUrl}/quote/${quoteId}`;
};

export const getQuoteReadWithEmailModalUrl = (state) => {
  const readQuoteUrl = getReadQuoteUrl(state);

  return `${readQuoteUrl}?openSendEmail=true`;
};

export const getQuoteListURL = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/quote`;
};

export const getCreateInvoiceFromQuoteUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const quoteId = getQuoteId(state);

  return `${baseUrl}/invoice/new?quoteId=${quoteId}`;
};

export const getInvoiceAndQuoteSettingsUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/salesSettings`;
};
