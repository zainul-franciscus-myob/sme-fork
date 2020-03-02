import { createSelector, createStructuredSelector } from 'reselect';

import {
  getBusinessId, getIsAllowOnlinePayments, getIsTrial, getSerialNumber,
} from './invoiceDetailSelectors';

const getIsLoading = state => state.payDirect.isLoading;
const getIsServiceAvailable = state => state.payDirect.isServiceAvailable;
const getHasSetUpOnlinePayments = state => state.payDirect.isRegistered;
const getSetUpOnlinePaymentsBaseUrl = state => state.payDirect.baseUrl;

const getSetUpOnlinePaymentsLink = createSelector(
  getBusinessId,
  getSerialNumber,
  getSetUpOnlinePaymentsBaseUrl,
  (businessId, serialNumber, baseUrl) => `${baseUrl}?cdf=${businessId}&sn=${serialNumber}`,
);

// eslint-disable-next-line import/prefer-default-export
export const getPayDirectOptions = createStructuredSelector({
  isLoading: getIsLoading,
  isTrial: getIsTrial,
  isServiceAvailable: getIsServiceAvailable,
  isAllowOnlinePayments: getIsAllowOnlinePayments,
  setUpOnlinePaymentsLink: getSetUpOnlinePaymentsLink,
  hasSetUpOnlinePayments: getHasSetUpOnlinePayments,
});
