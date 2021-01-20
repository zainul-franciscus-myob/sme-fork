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

const constructAbn = (state) => {
  const abn = getAbn(state);

  return abn?.abn || '';
};

const getFormattedIssueDate = (state) => formatSlashDate(getIssueDate(state));

const getFormattedAmountDue = (state) => formatCurrency(getAmountDue(state));

const getIsAttachmentFinished = (attachment) => attachment.state === 'finished';

const getEInvoiceAttachments = (state) => {
  const { attachments } = state.eInvoice;

  return attachments.map((attachment) => {
    const { key, file, error, state: attachmentState } = attachment;
    const { name, size, type } = file;
    return {
      key,
      canRemove: ['finished', 'failed'].includes(attachmentState),
      state: attachmentState,
      error,
      file,
      name,
      size,
      type,
    };
  });
};

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

export const getEInvoiceAttachmentsToSend = createSelector(
  getEInvoiceAttachments,
  (attachments) => attachments.filter(getIsAttachmentFinished)
);

export const getSendEInvoicePayload = createSelector(
  getEInvoiceAttachmentsToSend,
  (attachments) => ({
    Attachments: attachments.map(({ file }) => file),
  })
);

export const getSendEInvoiceOptions = createStructuredSelector({
  abn: constructAbn,
  amountDue: getFormattedAmountDue,
  customerName: getCustomerName,
  invoiceNumber: getInvoiceNumber,
  issueDate: getFormattedIssueDate,
  attachments: getEInvoiceAttachments,
});
