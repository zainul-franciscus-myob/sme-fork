import { createSelector } from 'reselect';

import {
  getAbn,
  getBusinessId,
  getInvoiceId,
  getIsAbnLoading,
  getRegion,
} from './invoiceDetailSelectors';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';
import Region from '../../../../common/types/Region';

export const getEInvoiceAppName = (state) => state.eInvoice.appName;

export const getSendEInvoiceUrlParams = createSelector(
  getBusinessId,
  getInvoiceId,
  (businessId, invoiceId) => ({ businessId, invoiceId })
);

export const getShowEInvoiceButton = createSelector(
  getEInvoiceAppName,
  getRegion,
  (appName, region) => region !== Region.nz && Boolean(appName?.trim().length)
);

export const getEnableEInvoiceButton = createSelector(
  getShowEInvoiceButton,
  getIsAbnLoading,
  getAbn,
  (showEInvoiceButton, isAbnLoading, abn) =>
    showEInvoiceButton && !isAbnLoading && abn?.status === AbnStatus.ACTIVE
);
