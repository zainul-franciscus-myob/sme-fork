import { createSelector, createStructuredSelector } from 'reselect';

import ModalType from '../ModalType';
import QuoteLayout from '../QuoteLayout';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getQuoteId = state => state.quoteId;
export const getLayoutQueryParam = state => state.layout;
export const getDuplicateQuoteIdQueryParam = state => state.duplicatedQuoteId;
export const getOpenSendEmailQueryParam = state => state.openSendEmail;
export const getOpenExportPdfQueryParam = state => state.openExportPdf;

export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsPageEdited = state => state.isPageEdited;
export const getAlert = state => state.alert;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);
export const getModalAlert = state => state.modalAlert;
export const getIsModalActionDisabled = state => state.isModalSubmitting;
export const getIsContactLoading = state => state.isContactLoading;
export const getIsAccountComboboxDisabled = state => state.isAccountLoading;
export const getIsCalculating = state => state.isCalculating;
export const getIsLineAmountInputDirty = state => state.isLineAmountInputDirty;
export const getPageTitle = state => state.pageTitle;

export const getQuote = state => state.quote;
export const getLayout = state => state.quote.layout;
export const getContactName = state => state.quote.contactName;
export const getContactId = state => state.quote.contactId;
const getAddress = state => state.quote.address;
export const getQuoteNumber = state => state.quote.quoteNumber;
export const getPurchaseOrderNumber = state => state.quote.purchaseOrderNumber;
export const getIssueDate = state => state.quote.issueDate;
export const getExpirationTerm = state => state.quote.expirationTerm;
export const getExpirationDays = state => Number(state.quote.expirationDays);
const getNote = state => state.quote.note;
export const getIsTaxInclusive = state => state.quote.isTaxInclusive;
export const getLines = state => state.quote.lines;
const getLength = state => state.quote.lines.length;

const getNewLine = state => state.newLine;

export const getTotals = state => state.totals;
export const getTotalAmount = state => state.totals.totalAmount;

const getContactOptions = state => state.contactOptions;
export const getExpirationTermOptions = state => state.expirationTermOptions;
const getCommentOptions = state => state.commentOptions;
export const getItemOptions = state => state.itemOptions;
export const getTaxCodeOptions = state => state.taxCodeOptions;
export const getAccountOptions = state => state.accountOptions;

const getServiceTemplateOptions = state => state.serviceTemplateOptions.templateOptions;
const getItemTemplateOptions = state => state.itemTemplateOptions.templateOptions;

export const getTemplateOptions = createSelector(
  getLayout,
  getServiceTemplateOptions,
  getItemTemplateOptions,
  (layout, serviceTemplateOptions, itemTemplateOptions) => (layout === QuoteLayout.SERVICE
    ? serviceTemplateOptions
    : itemTemplateOptions),
);

export const getExportPdfTemplate = state => state.exportPdf.template;

export const getIsCreating = createSelector(getQuoteId, quoteId => quoteId === 'new');
export const getIsActionsDisabled = createSelector(
  getIsSubmitting,
  getIsCalculating,
  (isSubmitting, isCalculating) => isSubmitting || isCalculating,
);

export const getIsNewLine = (state, { index }) => state.quote.lines.length <= index;
export const getNewLineIndex = state => state.quote.lines.length - 1;
export const getLineByIndex = (state, props) => state.quote.lines[props.index];
export const getQuoteLineByIndex = (state, { index }) => (
  state.quote.lines[index] ? state.quote.lines[index] : state.newLine
);
export const getIsTableEmpty = createSelector(getLength, len => len === 0);
export const getTableData = createSelector(getLength, len => Array(len).fill({}));

export const getQuoteLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => line || newLine,
);

const getCustomerLink = createSelector(
  getRegion,
  getBusinessId,
  getContactId,
  (region, businessId, contactId) => `/#/${region}/${businessId}/contact/${contactId}`,
);

export const getTaxInclusiveLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax inclusive'),
);

export const getTaxExclusiveLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax exclusive'),
);

export const getQuoteDetailOptions = createStructuredSelector({
  layout: getLayout,
  contactId: getContactId,
  contactName: getContactName,
  address: getAddress,
  quoteNumber: getQuoteNumber,
  purchaseOrderNumber: getPurchaseOrderNumber,
  issueDate: getIssueDate,
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  isTaxInclusive: getIsTaxInclusive,
  note: getNote,
  contactOptions: getContactOptions,
  commentOptions: getCommentOptions,
  isCreating: getIsCreating,
  isCalculating: getIsCalculating,
  isContactLoading: getIsContactLoading,
  contactLink: getCustomerLink,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
});

export const getRouteUrlParams = state => ({
  openExportPdf: getOpenExportPdfQueryParam(state),
});

export const getShouldReload = (state) => {
  const isCreating = getIsCreating(state);
  const duplicatedQuoteId = getDuplicateQuoteIdQueryParam(state);

  return isCreating && !duplicatedQuoteId;
};

export const getShouldSaveAndExportPdf = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getShouldOpenExportPdfModal = (state) => {
  const isCreating = getIsCreating(state);
  const openExportPdf = getOpenExportPdfQueryParam(state);

  return !isCreating && openExportPdf === 'true';
};

export const getExportPdfFilename = (state) => {
  const quoteNumber = getQuoteNumber(state);

  return `${quoteNumber}.pdf`;
};

export const getShouldOpenEmailModal = (state) => {
  const isCreating = getIsCreating(state);
  const openSendEmail = getOpenSendEmailQueryParam(state);

  return !isCreating && openSendEmail === 'true';
};

export const getLoadQuoteDetailModalType = (context, emailQuote) => {
  const shouldOpenEmailModal = getShouldOpenEmailModal(context);
  if (shouldOpenEmailModal) {
    const { hasEmailReplyDetails } = emailQuote || {};

    return hasEmailReplyDetails
      ? ModalType.EMAIL_QUOTE
      : ModalType.EMAIL_SETTINGS;
  }

  const shouldOpenExportPdfModal = getShouldOpenExportPdfModal(context);
  if (shouldOpenExportPdfModal) {
    return ModalType.EXPORT_PDF;
  }

  return ModalType.NONE;
};

export const getContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Customer' };
};

export const getUpdatedContactOptions = (state, updatedOption) => {
  const contactOptions = getContactOptions(state);

  return contactOptions.some(option => option.value === updatedOption.value)
    ? contactOptions.map(option => (option.value === updatedOption.value ? updatedOption : option))
    : [updatedOption, ...contactOptions];
};

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getInventoryModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return ({
    businessId, region, isBuying: false, isSelling: true,
  });
};
