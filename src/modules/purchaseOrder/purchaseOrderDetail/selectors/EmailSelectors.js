import { createSelector } from 'reselect';

import {
  getIsForeignCurrency,
  getPurchaseOrderLayout,
} from './purchaseOrderSelectors';
import ModalType from '../types/ModalType';
import PurchaseOrderLayout from '../types/PurchaseOrderLayout';

const getEmailToAddresses = (state) => state.emailPurchaseOrder.toEmail;
const getCcEmailToAddresses = (state) => state.emailPurchaseOrder.ccToEmail;
const getIsEmailMeACopy = (state) => state.emailPurchaseOrder.isEmailMeACopy;
const getEmailSubject = (state) => state.emailPurchaseOrder.subject;
const getEmailMessageBody = (state) => state.emailPurchaseOrder.messageBody;
const getEmailTemplateName = (state) => state.emailPurchaseOrder.templateName;
const getHasEmailReplyDetails = (state) =>
  state.emailPurchaseOrder.hasEmailReplyDetails;
export const getFromName = (state) => state.emailPurchaseOrder.fromName;
export const getFromEmail = (state) => state.emailPurchaseOrder.fromEmail;

export const getCanSaveEmailSettings = createSelector(
  getFromEmail,
  getFromName,
  (fromEmail, fromName) => fromEmail && fromName
);

export const getEmailPurchaseOrderDetail = createSelector(
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

export const getEmailAttachments = createSelector(
  (state) => state.emailPurchaseOrder.attachments,
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
      state.emailPurchaseOrder.attachments.find(
        (attachment) => attachment.file === file
      ).state === 'queued'
  );

export const getEmailModalType = (state) =>
  getHasEmailReplyDetails(state)
    ? ModalType.EMAIL_PURCHASE_ORDER
    : ModalType.EMAIL_SETTINGS;

export const getShowEmailButton = createSelector(
  getPurchaseOrderLayout,
  getIsForeignCurrency,
  (layout, isForeignCurrency) =>
    [
      PurchaseOrderLayout.SERVICE,
      PurchaseOrderLayout.ITEM_AND_SERVICE,
    ].includes(layout) && !isForeignCurrency
);

export const getEmailDetailFromPurchaseOrderDetail = ({ emailPurchaseOrder }) =>
  emailPurchaseOrder
    ? {
        ...emailPurchaseOrder,
        toEmail:
          emailPurchaseOrder.toEmail.length > 0
            ? emailPurchaseOrder.toEmail
            : [''],
        ccToEmail:
          emailPurchaseOrder.ccToEmail.length > 0
            ? emailPurchaseOrder.ccToEmail
            : [''],
      }
    : {};
