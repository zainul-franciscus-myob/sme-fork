import { createSelector } from 'reselect';

import { getBusinessId, getInvoiceId } from './invoiceDetailSelectors';
import InvoiceDetailModalType from '../InvoiceDetailModalType';

const getEmailToAddresses = state => state.emailInvoice.toEmail;
const getCcEmailToAddresses = state => state.emailInvoice.ccToEmail;
const getIsEmailMeACopy = state => state.emailInvoice.isEmailMeACopy;
const getEmailSubject = state => state.emailInvoice.subject;
const getEmailMessageBody = state => state.emailInvoice.messageBody;
const getEmailTemplateName = state => state.emailInvoice.templateName;
const getHasEmailReplyDetails = state => state.emailInvoice.hasEmailReplyDetails;

export const getEmailInvoiceDetail = createSelector(
  getEmailToAddresses,
  getCcEmailToAddresses,
  getIsEmailMeACopy,
  getEmailSubject,
  getEmailMessageBody,
  getEmailTemplateName,
  (emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
    emailTemplateName) => ({
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
    emailTemplateName,
  }),
);

export const getSendEmailUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getSendEmailPayload = (state) => {
  const {
    hasEmailReplyDetails,
    includeInvoiceNumberInEmail,
    attachments,
    ...restOfEmailInvoice
  } = state.emailInvoice;

  return {
    ...restOfEmailInvoice,
    attachments: attachments
      .filter(attachment => attachment.state === 'finished')
      .map(({ file, keyName, uploadPassword }) => ({
        filename: file.name,
        mimeType: file.type,
        keyName,
        uploadPassword,
      })),
  };
};

export const getEmailAttachments = createSelector(
  state => state.emailInvoice.attachments,
  attachments => attachments.map(attachment => ({
    keyName: attachment.keyName,
    name: attachment.file.name,
    size: attachment.file.size,
    loaded: attachment.uploadProgress
      ? Math.round(attachment.file.size * attachment.uploadProgress)
      : 0,
    state: attachment.state,
    error: attachment.error,
    canRemove: !['queued', 'loading'].includes(attachment.state),
    file: attachment.file,
  })),
);

export const getFilesForUpload = (state, files) => (
  files.filter(file => state.emailInvoice.attachments.find(
    attachment => attachment.file === file,
  ).state === 'queued')
);

export const getEmailModalType = (state) => (
  getHasEmailReplyDetails(state)
    ? InvoiceDetailModalType.EMAIL_INVOICE
    : InvoiceDetailModalType.EMAIL_SETTINGS
);
