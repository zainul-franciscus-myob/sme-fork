import { createSelector, createStructuredSelector } from 'reselect';

import {
  getBusinessId,
  getIsAllowOnlinePayments,
} from './RecurringInvoiceSelectors';
import buildOnlinePaymentLink from '../../../../common/links/buildOnlinePaymentLink';

export const getPayDirect = (state) => state.payDirect;
const getIsLoading = (state) => state.payDirect.isLoading;
const getIsServiceAvailable = (state) => state.payDirect.isServiceAvailable;
const getIsRegistered = (state) => state.payDirect.isRegistered;
const getRegistrationUrl = (state) => state.payDirect.registrationUrl;
const getIsTrial = (state) => state.payDirect.isTrial;
const getSerialNumber = (state) => state.payDirect.serialNumber;

export const getSetUpOnlinePaymentsLink = createSelector(
  getRegistrationUrl,
  getBusinessId,
  getSerialNumber,
  getIsTrial,
  getIsRegistered,
  (url, businessId, serialNumber, isTrial, isRegistered) =>
    buildOnlinePaymentLink({
      url,
      businessId,
      serialNumber,
      isTrial,
      isRegistered,
      location: 'recurring-transaction',
    })
);

export const getPayDirectOptions = createStructuredSelector({
  isLoading: getIsLoading,
  isTrial: getIsTrial,
  isServiceAvailable: getIsServiceAvailable,
  isAllowOnlinePayments: getIsAllowOnlinePayments,
  hasSetUpOnlinePayments: getIsRegistered,
});
