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
  getNzbn,
  getRegion,
} from './invoiceDetailSelectors';
import AbnStatus from '../../../../components/autoFormatter/AbnInput/AbnStatus';
import Region from '../../../../common/types/Region';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

const constructEinvoiceOptionsAbnNzbn = (state) => {
  const region = getRegion(state);

  if (region === Region.nz) {
    const nzbn = getNzbn(state);

    return {
      subHeading: 'NZBN',
      value: nzbn?.nzbn || '',
    };
  }

  if (region === Region.au) {
    const abn = getAbn(state);

    return {
      subHeading: 'ABN',
      value: abn?.abn || '',
    };
  }

  return {};
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
  (appName) => Boolean(appName?.trim().length)
);

export const getInvalidAbnNzbnModalText = createSelector(
  getRegion,
  (region) => {
    const displayMsg = region === Region.nz ? 'NZBN' : 'ABN';

    return {
      title: `Invalid or empty ${displayMsg}`,
      body: `You can't send this as an e-invoice as the customer does not have a valid ${displayMsg} entered.`,
    };
  }
);

export const getIsActiveAbnOrNzbn = createSelector(
  getIsAbnLoading,
  getAbn,
  getNzbn,
  getRegion,
  (isAbnLoading, abn, nzbn, region) =>
    region === Region.au
      ? !isAbnLoading && abn?.status === AbnStatus.ACTIVE
      : !!nzbn
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
  abnNzbn: constructEinvoiceOptionsAbnNzbn,
  amountDue: getFormattedAmountDue,
  customerName: getCustomerName,
  invoiceNumber: getInvoiceNumber,
  issueDate: getFormattedIssueDate,
  attachments: getEInvoiceAttachments,
});
