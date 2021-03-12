import { createSelector } from 'reselect';

export const getIsAllowPaymentsByDirectDeposit = (state) =>
  state.paymentOptions?.isAllowPaymentsByDirectDeposit;

export const getIsAllowPaymentsByMail = (state) =>
  state.paymentOptions?.isAllowPaymentsByMail;

export const getPaymentOptions = (state) => state.paymentOptions;

export const getHasUpdatedPaymentSettings = (state) =>
  state.hasUpdatedPaymentSettings;

export const getShouldShowPaymentSettingsModal = createSelector(
  getHasUpdatedPaymentSettings,
  getIsAllowPaymentsByDirectDeposit,
  getIsAllowPaymentsByMail,
  (
    hasUpdatedPaymentSettings,
    allowPaymentsByDirectDeposit,
    allowPaymentsByMail
  ) =>
    !hasUpdatedPaymentSettings &&
    !allowPaymentsByDirectDeposit &&
    !allowPaymentsByMail
);
