import { createSelector } from 'reselect';

import { getAbn, getIsAbnLoading } from './invoiceDetailSelectors';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';

export const getEInvoiceAppName = (state) => state.eInvoice.appName;

export const getShowEInvoiceButton = createSelector(
  getEInvoiceAppName,
  (appName) => Boolean(appName?.trim().length)
);

export const getEnableEInvoiceButton = createSelector(
  getShowEInvoiceButton,
  getIsAbnLoading,
  getAbn,
  (showEInvoiceButton, isAbnLoading, abn) =>
    showEInvoiceButton && !isAbnLoading && abn?.status === AbnStatus.ACTIVE
);
