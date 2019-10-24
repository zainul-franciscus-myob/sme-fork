import { createSelector } from 'reselect';

import { getBusinessId, getInvoiceId } from './invoiceDetailSelectors';

const getEmailToAddresses = state => state.emailInvoice.toEmail;
const getCcEmailToAddresses = state => state.emailInvoice.ccToEmail;
const getIsEmailMeACopy = state => state.emailInvoice.isEmailMeACopy;
const getEmailSubject = state => state.emailInvoice.subject;
const getEmailMessageBody = state => state.emailInvoice.messageBody;

export const getEmailInvoiceDetail = createSelector(
  getEmailToAddresses,
  getCcEmailToAddresses,
  getIsEmailMeACopy,
  getEmailSubject,
  getEmailMessageBody,
  (emailToAddresses, ccEmailToAddresses, isEmailMeACopy, subject, messageBody) => ({
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
  }),
);

export const getSendEmailUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getSendEmailPayload = (state) => {
  const { hasEmailReplyDetails, ...restOfEmailInvoice } = state.emailInvoice;

  return restOfEmailInvoice;
};
