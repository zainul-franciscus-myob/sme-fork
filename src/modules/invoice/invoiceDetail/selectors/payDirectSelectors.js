import { createSelector, createStructuredSelector } from 'reselect';

import {
  getBusinessId,
  getCanApplySurcharge,
  getIsAllowOnlinePayments,
  getIsTrial,
  getSerialNumber,
} from './invoiceDetailSelectors';
import buildOnlinePaymentLink from '../../../../common/links/buildOnlinePaymentLink';

export const getPayDirect = (state) => state.payDirect;
const getIsLoading = (state) => state.payDirect.isLoading;
const getIsServiceAvailable = (state) => state.payDirect.isServiceAvailable;
const getIsRegistered = (state) => state.payDirect.isRegistered;
const getRegistrationUrl = (state) => state.payDirect.registrationUrl;
const getIsSurchargingAvailable = (state) =>
  state.payDirect.isSurchargingAvailable && getIsAllowOnlinePayments(state);
const getIsSurchargingRegistered = (state) =>
  state.payDirect.isSurchargingRegistered;

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
      location: 'invoice',
    })
);

// eslint-disable-next-line import/prefer-default-export
export const getPayDirectOptions = createStructuredSelector({
  isLoading: getIsLoading,
  isTrial: getIsTrial,
  isServiceAvailable: getIsServiceAvailable,
  isAllowOnlinePayments: getIsAllowOnlinePayments,
  hasSetUpOnlinePayments: getIsRegistered,
  canApplySurcharge: getCanApplySurcharge,
  showSurchargingOptions: getIsSurchargingAvailable,
  hasSetupSurcharging: getIsSurchargingRegistered,
});
