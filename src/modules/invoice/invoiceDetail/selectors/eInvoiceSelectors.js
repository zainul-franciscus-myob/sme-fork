import { createSelector, createStructuredSelector } from 'reselect';

import {
  getAbn,
  getAmountDue,
  getBusinessId,
  getCustomerName,
  getInvoiceId,
  getInvoiceNumber,
  getIsAbnLoading,
  getIssueDate,
  getRegion,
} from './invoiceDetailSelectors';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';
import Region from '../../../../common/types/Region';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

const getFormattedIssueDate = (state) => formatSlashDate(getIssueDate(state));

const getFormattedAmountDue = (state) => formatCurrency(getAmountDue(state));

export const getEInvoiceAppName = (state) => state.eInvoice.appName;

export const getShowEInvoiceButton = createSelector(
  getEInvoiceAppName,
  getRegion,
  (appName, region) => region !== Region.nz && Boolean(appName?.trim().length)
);

export const getIsActiveAbn = createSelector(
  getIsAbnLoading,
  getAbn,
  (isAbnLoading, abn) => !isAbnLoading && abn?.status === AbnStatus.ACTIVE
);

export const getSendEInvoiceUrlParams = createSelector(
  getBusinessId,
  getInvoiceId,
  (businessId, invoiceId) => ({ businessId, invoiceId })
);

const constructAbn = (state) => {
  const abn = getAbn(state);

  return abn?.abn || '';
};

export const getSendEInvoiceOptions = createStructuredSelector({
  abn: constructAbn,
  amountDue: getFormattedAmountDue,
  customerName: getCustomerName,
  invoiceNumber: getInvoiceNumber,
  issueDate: getFormattedIssueDate,
});
