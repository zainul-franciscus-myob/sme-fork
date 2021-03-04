import { createSelector } from 'reselect';

import {
  getBusinessId,
  getInvoiceId,
  getIsForeignCurrency,
  getLayout,
} from './invoiceDetailSelectors';
import {
  getIsAllowPaymentsByDirectDeposit,
  getIsAllowPaymentsByMail,
} from './paymentOptionsSelectors';
import { getIsRegistered } from './payDirectSelectors';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceLayout from '../types/InvoiceLayout';

const getEmailToAddresses = (state) => state.emailInvoice.toEmail;
const getCcEmailToAddresses = (state) => state.emailInvoice.ccToEmail;
const getIsEmailMeACopy = (state) => state.emailInvoice.isEmailMeACopy;
const getEmailSubject = (state) => state.emailInvoice.subject;
const getEmailMessageBody = (state) => state.emailInvoice.messageBody;
export const getEmailTemplateName = (state) => state.emailInvoice.templateName;
const getHasEmailReplyDetails = (state) =>
  state.emailInvoice.hasEmailReplyDetails;
export const getFromName = (state) => state.emailInvoice.fromName;
export const getFromEmail = (state) => state.emailInvoice.fromEmail;

export const getCanSaveEmailSettings = createSelector(
  getFromEmail,
  getFromName,
  (fromEmail, fromName) => fromEmail && fromName
);

export const getSaveEmailSettingsUrlParams = (state) => ({
  businessId: getBusinessId(state),
});
export const getSaveEmailSettingsContent = (state) => state.emailInvoice;

export const getEmailDetailFromLoadInvoiceDetail = ({
  emailInvoice,
  invoiceNumber,
}) =>
  emailInvoice
    ? {
        ...emailInvoice,
        toEmail: emailInvoice.toEmail.length > 0 ? emailInvoice.toEmail : [''],
        ccToEmail:
          emailInvoice.ccToEmail.length > 0 ? emailInvoice.ccToEmail : [],
        subject: emailInvoice.includeInvoiceNumberInEmail
          ? `Invoice ${invoiceNumber}; ${emailInvoice.subject}`
          : emailInvoice.subject,
      }
    : {};

export const getEmailInvoiceDetail = createSelector(
  getEmailToAddresses,
  getCcEmailToAddresses,
  getIsEmailMeACopy,
  getEmailSubject,
  getEmailMessageBody,
  getEmailTemplateName,
  (
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
    emailTemplateName
  ) => ({
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
    emailTemplateName,
  })
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
      .filter((attachment) => attachment.state === 'finished')
      .map(({ file, keyName, uploadPassword }) => ({
        filename: file.name,
        mimeType: file.type,
        keyName,
        uploadPassword,
      })),
  };
};

export const getEmailAttachments = createSelector(
  (state) => state.emailInvoice.attachments,
  (attachments) =>
    attachments.map((attachment) => ({
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
    }))
);

export const getFilesForUpload = (state, files) =>
  files.filter(
    (file) =>
      state.emailInvoice.attachments.find(
        (attachment) => attachment.file === file
      ).state === 'queued'
  );

export const getEmailModalType = (state) =>
  getHasEmailReplyDetails(state)
    ? InvoiceDetailModalType.EMAIL_INVOICE
    : InvoiceDetailModalType.EMAIL_SETTINGS;

export const getShowEmailButton = createSelector(
  getLayout,
  getIsForeignCurrency,
  (layout, isForeignCurrency) =>
    [InvoiceLayout.SERVICE, InvoiceLayout.ITEM_AND_SERVICE].includes(layout) &&
    !isForeignCurrency
);

export const getIsTotalMoreThan25MB = (state) =>
  state.emailInvoice.attachments.reduce(
    (total, attachment) => total + attachment.file.size,
    0
  ) > 25000000;

export const getHasCCEmails = (state) =>
  state.emailInvoice.ccToEmail && state.emailInvoice.ccToEmail.length > 0;

export const getHasEmailToAddress = (state) =>
  state.emailInvoice.toEmail &&
  state.emailInvoice.toEmail.some((val) => val && val !== '');

export const getIsSendingEmail = (state) => state.isSendingEmail;
export const getIsPreviewingPdf = (state) => state.emailInvoice.isPreviewingPdf;

export const getPaymentOptions = createSelector(
  getIsAllowPaymentsByDirectDeposit,
  getIsAllowPaymentsByMail,
  getIsRegistered,
  (
    isDirectDepositAvailable,
    isPaymentByMailAvailable,
    isPayDirectAvailable
  ) => [
    {
      option: 'Direct deposit',
      isAvailable: isDirectDepositAvailable,
    },
    {
      option: 'Mail',
      isAvailable: isPaymentByMailAvailable,
    },
    {
      option: 'Online invoice payments',
      isAvailable: isPayDirectAvailable,
    },
  ]
);
