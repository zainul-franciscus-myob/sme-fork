import { createSelector } from 'reselect';

import { getLayout } from './QuoteDetailSelectors';
import ModalType from '../ModalType';
import QuoteLayout from '../QuoteLayout';

const getEmailToAddresses = state => state.emailQuote.toEmail;
const getCcEmailToAddresses = state => state.emailQuote.ccToEmail;
const getIsEmailMeACopy = state => state.emailQuote.isEmailMeACopy;
const getEmailSubject = state => state.emailQuote.subject;
const getEmailMessageBody = state => state.emailQuote.messageBody;
const getEmailTemplateName = state => state.emailQuote.templateName;
const getHasEmailReplyDetails = state => state.emailQuote.hasEmailReplyDetails;

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
    file: attachment.file,
  })),
);

export const getFilesForUpload = (state, files) => (
  files.filter(file => state.emailQuote.attachments.find(
    attachment => attachment.file === file,
  ).state === 'queued')
);

export const getEmailModalType = (state) => (
  getHasEmailReplyDetails(state)
    ? ModalType.EMAIL_QUOTE
    : ModalType.EMAIL_SETTINGS
);

export const getShowEmailButton = createSelector(
  getLayout,
  (layout) => ([
    QuoteLayout.SERVICE,
    QuoteLayout.ITEM_AND_SERVICE,
    QuoteLayout.PROFESSIONAL,
    QuoteLayout.TIME_BILLING,
  ].includes(layout)),
);
