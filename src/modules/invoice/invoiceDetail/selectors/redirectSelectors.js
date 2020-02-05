import { businessEventToFeatureMap } from '../../../../common/types/BusinessEventTypeMap';
import {
  getAmountDue,
  getBusinessId,
  getContactId,
  getInvoiceId,
  getIsServiceLayout,
  getRegion,
} from './invoiceDetailSelectors';
import getQueryFromParams from '../../../../common/getQueryFromParams/getQueryFromParams';

const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};

export const getInvoicePaymentUrl = (state) => {
  const redirectParams = {
    customerId: getContactId(state),
    paymentAmount: getAmountDue(state),
    applyPaymentToInvoiceId: getInvoiceId(state),
  };

  const urlParams = getQueryFromParams(redirectParams);
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/invoicePayment/new${urlParams}`;
};

export const getInvoiceAndQuoteSettingsUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/salesSettings`;
};

export const getInvoiceListUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/invoice`;
};

export const getInvoiceReadWithEmailModalUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const invoiceId = getInvoiceId(state);

  return `${baseUrl}/invoice/${invoiceId}?openSendEmail=true`;
};

const getCreateInvoiceUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/invoice/new`;
};

export const getCreateNewInvoiceUrl = (state) => {
  const isServiceLayout = getIsServiceLayout(state);
  const layout = isServiceLayout ? 'service' : 'item';

  const createNewUrl = getCreateInvoiceUrl(state);

  return `${createNewUrl}?layout=${layout}`;
};

export const getCreateDuplicateInvoiceUrl = (state) => {
  const createNewUrl = getCreateInvoiceUrl(state);
  const invoiceId = getInvoiceId(state);

  return `${createNewUrl}?duplicatedInvoiceId=${invoiceId}`;
};

export const getInvoiceReadWithExportPdfModalUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const invoiceId = getInvoiceId(state);

  return `${baseUrl}/invoice/${invoiceId}?openExportPdf=true`;
};

export const getSubscriptionSettingsUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/settings/subscription`;
};

export const getRedirectRefUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const feature = businessEventToFeatureMap[state.redirectRefJournalType];
  return `${baseUrl}/${feature}/${state.redirectRefJournalId}`;
};
