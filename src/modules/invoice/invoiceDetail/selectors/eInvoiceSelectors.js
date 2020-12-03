import { createSelector, createStructuredSelector } from 'reselect';

import {
  getAmountDue,
  getBusinessId,
  getCustomerName,
  getInvoiceId,
  getInvoiceNumber,
  getIssueDate,
  getRegion,
} from './invoiceDetailSelectors';
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

// TODO: will come back to these for validating ABN when 'send e-invoice' button is clicked.
// export const getIsActiveAbn = createSelector(
//   getIsAbnLoading,
//   getAbn,
//   (isAbnLoading, abn) => !isAbnLoading && abn?.status === AbnStatus.ACTIVE
// );

export const getSendEInvoiceUrlParams = createSelector(
  getBusinessId,
  getInvoiceId,
  (businessId, invoiceId) => ({ businessId, invoiceId })
);

export const getSendEInvoiceOptions = createStructuredSelector({
  amountDue: getFormattedAmountDue,
  customerName: getCustomerName,
  invoiceNumber: getInvoiceNumber,
  issueDate: getFormattedIssueDate,
});
