import { createSelector, createStructuredSelector } from 'reselect';

import { TaxCalculatorTypes, createTaxCalculator } from '../../../../common/taxCalculator';
import ModalType from '../ModalType';
import QuoteLayout from '../QuoteLayout';
import QuoteLineType from '../QuoteLineType';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.quote);

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getQuoteId = state => state.quoteId;
export const getLayoutQueryParam = state => state.layout;
export const getDuplicateId = state => state.duplicateId;

export const getLoadingState = state => state.loadingState;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsPageEdited = state => state.isPageEdited;
export const getAlert = state => state.alert;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);
export const getModalAlert = state => state.modalAlert;
export const getIsModalActionDisabled = state => state.isModalSubmitting;
const getIsContactLoading = state => state.isContactLoading;
export const getIsAccountComboboxDisabled = state => state.isAccountLoading;
export const getIsJobComboboxDisabled = state => state.isJobLoading;
export const getIsCalculating = state => state.isCalculating;
export const getIsLineAmountInputDirty = state => state.isLineAmountInputDirty;
export const getPageTitle = state => state.pageTitle;

export const getQuote = state => state.quote;
export const getLayout = state => state.quote.layout;
export const getContactId = state => state.quote.contactId;
const getAddress = state => state.quote.address;
export const getQuoteNumber = state => state.quote.quoteNumber;
export const getPurchaseOrderNumber = state => state.quote.purchaseOrderNumber;
export const getIssueDate = state => state.quote.issueDate;
export const getExpirationTerm = state => state.quote.expirationTerm;
export const getExpirationDays = state => Number(state.quote.expirationDays);
export const getNote = state => state.quote.note;
export const getIsTaxInclusive = state => state.quote.isTaxInclusive;
export const getLines = state => state.quote.lines;
export const getLength = state => state.quote.lines.length;
export const getIsQuoteJobColumnEnabled = state => state.isQuoteJobColumnEnabled;

const getNewLine = state => state.newLine;

export const getTotals = state => state.totals;
export const getTotalAmount = state => state.totals.totalAmount;

const getContactOptions = state => state.contactOptions;
export const getExpirationTermOptions = state => state.expirationTermOptions;
export const getCommentOptions = state => state.commentOptions;
export const getItemOptions = state => state.itemOptions;
export const getJobOptions = state => state.jobOptions;
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

export const getNewLineIndex = state => state.quote.lines.length - 1;
export const getLineByIndex = (state, props) => state.quote.lines[props.index];

export const getIsTableEmpty = createSelector(getLength, len => len === 0);
export const getTableData = createSelector(getLength, len => Array(len).fill({}));

export const getQuoteLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => {
    if (line) {
      return line.type === QuoteLineType.SUB_TOTAL
        ? { ...line, description: 'Subtotal' }
        : line;
    }

    return newLine;
  },
);

export const getTaxInclusiveLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax inclusive'),
);

export const getTaxExclusiveLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax exclusive'),
);

export const getTaxCodeLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax code'),
);

export const getTaxLabel = createSelector(
  getRegion, region => getRegionToDialectText(region)('Tax'),
);

const getIsCustomerDisabled = createSelector(
  getIsCreating,
  getIsContactLoading,
  (isCreating, isContactLoading) => isContactLoading || !isCreating,
);

export const getQuoteDetailOptions = createStructuredSelector({
  contactId: getContactId,
  address: getAddress,
  quoteNumber: getQuoteNumber,
  purchaseOrderNumber: getPurchaseOrderNumber,
  issueDate: getIssueDate,
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  isTaxInclusive: getIsTaxInclusive,
  contactOptions: getContactOptions,
  isCalculating: getIsCalculating,
  isCustomerDisabled: getIsCustomerDisabled,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
});

export const getShouldSaveAndReload = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getExportPdfFilename = (state) => {
  const quoteNumber = getQuoteNumber(state);

  return `${quoteNumber}.pdf`;
};

export const getContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Customer' };
};

export const getUpdatedContactOptions = (state, updatedOption) => {
  const contactOptions = getContactOptions(state);

  return contactOptions.some(option => option.id === updatedOption.id)
    ? contactOptions.map(option => (option.id === updatedOption.id ? updatedOption : option))
    : [updatedOption, ...contactOptions];
};

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getJobModalContext = (state) => {
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

export const getIsTaxCalculationRequired = state => state.quote.lines.some(line => line.taxCodeId);

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getTaxCalculations = (state, { isSwitchingTaxInclusive }) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const isLineAmountsTaxInclusive = isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive;
  const lines = getLines(state);
  const taxCodes = getTaxCodeOptions(state);
  return calculate({
    lines,
    taxCodes,
    isTaxInclusive,
    isLineAmountsTaxInclusive,
  });
};

export const getItemSellingDetailsFromCache = (state, itemId) => (
  state.cachedItemSellingDetails[itemId]
);

export const getIsExportingPDF = createSelector(
  getModal,
  getIsModalActionDisabled,
  (modal, isModalActionDisabled) => (
    modal && modal.type === ModalType.EXPORT_PDF && isModalActionDisabled
  ),
);

const getIsLineTypeSupported = line => [
  QuoteLineType.SERVICE, QuoteLineType.ITEM,
].includes(line.type);

const getIsLayoutSupported = createSelector(
  getLayout, layout => [
    QuoteLayout.SERVICE, QuoteLayout.ITEM_AND_SERVICE,
  ].includes(layout),
);

export const getIsLinesSupported = createSelector(
  getLines,
  lines => lines.every(line => getIsLineTypeSupported(line)),
);

export const getIsReadOnlyLayout = createSelector(
  getIsLayoutSupported,
  getIsLinesSupported,
  (isLayoutSupported, isLinesSupported) => !isLayoutSupported || !isLinesSupported,
);

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getLayout,
  (isLayoutSupported, layout) => (
    !isLayoutSupported
      ? `This quote is missing information because the ${layout} quote layout isn't supported in the browser. Switch to AccountRight desktop to use this feature.`
      : 'This quote is read only because it contains unsupported features. Switch to AccountRight desktop to edit this quote.'
  ),
);
