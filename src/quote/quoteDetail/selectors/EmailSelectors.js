import { createSelector } from 'reselect';

import ModalType from '../ModalType';

const getEmailToAddresses = state => state.emailQuote.toEmail;
const getCcEmailToAddresses = state => state.emailQuote.ccToEmail;
const getIsEmailMeACopy = state => state.emailQuote.isEmailMeACopy;
const getEmailSubject = state => state.emailQuote.subject;
const getEmailMessageBody = state => state.emailQuote.messageBody;
const getEmailTemplateName = state => state.emailQuote.templateName;

export const getEmailQuoteDetail = createSelector(
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
    emailTemplateName,
  ) => ({
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
    emailTemplateName,
  }),
);

export const getEmailAttachments = createSelector(
  state => state.emailQuote.attachments,
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
  })),
);

export const getFilesForUpload = (state, files) => (
  files.filter(file => state.emailQuote.attachments.find(
    attachment => attachment.file === file,
  ).state === 'queued')
);

export const getIsEmailModalOpen = state => (
  state.modalType === ModalType.EMAIL_QUOTE
);
