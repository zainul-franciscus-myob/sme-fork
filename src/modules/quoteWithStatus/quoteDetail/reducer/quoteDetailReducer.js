import Decimal from 'decimal.js';

import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_QUOTE_LINE,
  CACHE_ITEM_SELLING_DETAILS,
  CALCULATE_LINES,
  CALCULATE_LINE_AMOUNTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  CLOSE_MODAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_JOB_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  RELOAD_QUOTE_DETAIL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_QUOTE_LINE,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ACCOUNT_LOADING_STATE,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_JOB_LOADING_STATE,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_QUOTE_LINE_DIRTY,
  SET_QUOTE_SUBMITTING_STATE,
  SET_SUBMITTING_STATE,
  TOGGLE_QUOTE_HISTORY_ACCORDION,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_LAYOUT,
  UPDATE_QUOTE_DETAIL_HEADER_OPTIONS,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPDATE_QUOTE_LINE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  addAttachments,
  removeEmailAttachment,
  resetEmailQuoteDetail,
  resetOpenSendEmailParam,
  updateEmailQuoteDetail,
  uploadEmailAttachment,
  uploadEmailAttachmentFailed,
  uploadEmailAttachmentUploadProgress,
} from './EmailReducer';
import {
  calculateLines,
  calculatePartialQuoteLineAmounts,
} from './calculationReducer';
import {
  getBusinessId,
  getQuoteId,
  getRegion,
  getUpdatedContactOptions,
} from '../selectors/QuoteDetailSelectors';
import { getQuoteHistoryAccordionStatus } from '../selectors/QuoteHistorySelectors';
import { toggleQuoteHistoryAccordion } from './QuoteHistoryReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import QuoteLayout from '../QuoteLayout';
import QuoteLineType from '../QuoteLineType';
import createReducer from '../../../../store/createReducer';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import getDefaultState, {
  DEFAULT_DISCOUNT,
  DEFAULT_UNITS,
} from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, { alert }) => ({ ...state, alert });

const openModal = (state, { modal }) => ({ ...state, modal });

const closeModal = (state) => ({ ...state, modal: undefined });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({
  ...state,
  isModalSubmitting,
});

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const getLoadQuoteDetailEmailQuote = (emailQuote, quoteNumber) =>
  emailQuote
    ? {
        ...emailQuote,
        toEmail: emailQuote.toEmail.length > 0 ? emailQuote.toEmail : [''],
        ccToEmail:
          emailQuote.ccToEmail.length > 0 ? emailQuote.ccToEmail : [''],
        subject: emailQuote.includeQuoteNumberInEmail
          ? `Quote ${quoteNumber}; ${emailQuote.subject}`
          : emailQuote.subject,
      }
    : {};

const buildJobOptions = ({ action, jobId }) => {
  const { jobOptions = [] } = action;
  return jobOptions.filter(({ isActive, id }) => isActive || id === jobId);
};

const loadQuoteDetail = (state, action) => ({
  ...state,
  pageTitle: action.pageTitle,
  quote: {
    ...state.quote,
    ...action.quote,
    lines: action.quote.lines.map((line) => {
      const lineJobOptions = buildJobOptions({ action, jobId: line.jobId });

      if (
        [
          QuoteLineType.SERVICE,
          QuoteLineType.ITEM,
          QuoteLineType.SUB_TOTAL,
        ].includes(line.type)
      ) {
        const amount = action.quote.isTaxInclusive
          ? new Decimal(line.taxExclusiveAmount).add(line.taxAmount).valueOf()
          : new Decimal(line.taxExclusiveAmount).valueOf();

        return {
          ...line,
          amount,
          displayAmount: formatAmount(amount),
          lineJobOptions,
        };
      }

      return { ...line, lineJobOptions };
    }),
  },
  newLine: {
    ...state.newLine,
    ...action.newLine,
    lineJobOptions: buildJobOptions({ action }),
  },
  contactOptions: action.contactOptions,
  expirationTermOptions: action.expirationTermOptions,
  commentOptions: action.commentOptions,
  template: action.template || state.template,
  itemOptions: action.itemOptions,
  accountOptions: action.accountOptions,
  taxCodeOptions: action.taxCodeOptions,
  emailQuote: {
    ...state.emailQuote,
    ...getLoadQuoteDetailEmailQuote(
      action.emailQuote,
      action.quote.quoteNumber
    ),
  },
  emailQuoteDefaultState: {
    ...state.emailQuoteDefaultState,
    ...getLoadQuoteDetailEmailQuote(
      action.emailQuote,
      action.quote.quoteNumber
    ),
  },
  exportPdf: {
    ...state.exportPdf,
    ...action.exportPdf,
  },
  startOfFinancialYearDate: action.startOfFinancialYearDate,
});

const reloadQuoteDetail = (state, action) => {
  const defaultState = getDefaultState();

  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const quoteId = getQuoteId(state);

  const context = { businessId, region, quoteId };

  const initialState = {
    ...defaultState,
    ...context,
    isQuoteJobColumnEnabled: state.isQuoteJobColumnEnabled,
    loadingState: LoadingState.LOADING_SUCCESS,
  };

  const loadState = loadQuoteDetail(initialState, action);

  return {
    ...loadState,
    quoteHistoryAccordionStatus: getQuoteHistoryAccordionStatus(state),
  };
};

const updateQuoteIdAfterCreate = (state, action) => ({
  ...state,
  quoteId: action.quoteId,
});

const setDuplicateId = (state, action) => ({
  ...state,
  duplicateId: action.duplicateId,
});

const updateLayout = (state, { value }) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    layout: value,
    lines: state.quote.lines
      .filter((line) => line.type === QuoteLineType.SERVICE)
      .map((line) => ({
        ...line,
        id: '',
      })),
  },
  newLine: {
    ...state.newLine,
    type:
      value === QuoteLayout.ITEM_AND_SERVICE
        ? QuoteLineType.ITEM
        : QuoteLineType.SERVICE,
  },
});

const updateQuoteDetailHeaderOptions = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [key]: value,
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const addQuoteLine = (state, action) => {
  const { id, ...partialLine } = action.line;
  const type = partialLine.itemId ? QuoteLineType.ITEM : QuoteLineType.SERVICE;

  const taxCodeId = partialLine.accountId
    ? getDefaultTaxCodeId({
        accountOptions: state.accountOptions,
        accountId: partialLine.accountId,
      })
    : '';

  return {
    ...state,
    quote: {
      ...state.quote,
      lines: [
        ...state.quote.lines,
        {
          ...state.newLine,
          descriptionDirty: Boolean(partialLine.description),
          type,
          taxCodeId,
          ...partialLine,
        },
      ],
    },
    isPageEdited: true,
  };
};

const updateQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (index === action.index) {
        const lineLayout =
          action.key === 'itemId' ? QuoteLineType.ITEM : line.type;

        return {
          ...line,
          id: line.type === lineLayout ? line.id : '',
          jobId: action.key === 'jobId' ? action.value : line.jobId,
          taxCodeId:
            action.key === 'accountId'
              ? getDefaultTaxCodeId({
                  accountId: action.value,
                  accountOptions: state.accountOptions,
                })
              : line.taxCodeId,
          type: lineLayout,
          descriptionDirty:
            action.key === 'description' || line.descriptionDirty,
          [action.key]: action.value,
        };
      }

      return line;
    }),
  },
});

const removeQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.filter((_, index) => index !== action.index),
  },
});

const setQuoteSubmittingState = (state, action) => ({
  ...state,
  isCalculating: action.isCalculating,
});

const setQuoteLineDirty = (state, action) => ({
  ...state,
  isLineAmountInputDirty: action.isLineAmountInputDirty,
});

const loadCustomerAddress = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    address: action.address,
  },
});

const loadCustomerAfterCreate = (state, { contactId, address, option }) => ({
  ...state,
  quote: {
    ...state.quote,
    contactId,
    address,
  },
  contactOptions: getUpdatedContactOptions(state, option),
});

const setCustomerLoadingState = (state, { isContactLoading }) => ({
  ...state,
  isContactLoading,
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line) => ({
      ...line,
      lineJobOptions: [job, ...line.lineJobOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    lineJobOptions: [job, ...state.newLine.lineJobOptions],
  },
  isPageEdited: true,
});

const setAccountLoadingState = (state, { isAccountLoading }) => ({
  ...state,
  isAccountLoading,
});

const setJobLoadingState = (state, { isJobLoading }) => ({
  ...state,
  isJobLoading,
});

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [action.response, ...state.itemOptions],
});

const changeExportPdfForm = (state, action) => ({
  ...state,
  exportPdf: {
    ...state.exportPdf,
    template: action.template,
  },
});

const calculateUnitPrice = (
  sellingPrice,
  taxAmount,
  itemIsTaxInclusive,
  invoiceIsTaxInclusive
) => {
  const itemTaxExclusivePrice = itemIsTaxInclusive
    ? sellingPrice - taxAmount
    : sellingPrice;

  return invoiceIsTaxInclusive
    ? itemTaxExclusivePrice + taxAmount
    : itemTaxExclusivePrice;
};

const loadItemSellingDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (index !== action.index) return line;

      const {
        unitOfMeasure,
        description,
        sellTaxCodeId,
        incomeAccountId,
        sellingPrice,
        isTaxInclusive,
        taxAmount,
      } = action.itemSellingDetails;

      const unitPrice = calculateUnitPrice(
        Number(sellingPrice),
        Number(taxAmount),
        isTaxInclusive,
        state.quote.isTaxInclusive
      );

      return {
        ...line,
        units: DEFAULT_UNITS,
        unitOfMeasure,
        discount: DEFAULT_DISCOUNT,
        description,
        taxCodeId: sellTaxCodeId,
        accountId: incomeAccountId,
        unitPrice,
        amount: unitPrice,
      };
    }),
  },
});

const cacheItemSellingDetails = (state, { itemId, itemSellingDetails }) => ({
  ...state,
  cachedItemSellingDetails: {
    ...state.cachedItemSellingDetails,
    [itemId]: itemSellingDetails,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_MODAL_ALERT]: setModalAlert,

  [LOAD_QUOTE_DETAIL]: loadQuoteDetail,
  [RELOAD_QUOTE_DETAIL]: reloadQuoteDetail,
  [UPDATE_QUOTE_ID_AFTER_CREATE]: updateQuoteIdAfterCreate,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [UPDATE_QUOTE_DETAIL_HEADER_OPTIONS]: updateQuoteDetailHeaderOptions,
  [UPDATE_LAYOUT]: updateLayout,

  [ADD_QUOTE_LINE]: addQuoteLine,
  [UPDATE_QUOTE_LINE]: updateQuoteLine,
  [REMOVE_QUOTE_LINE]: removeQuoteLine,

  [SET_QUOTE_SUBMITTING_STATE]: setQuoteSubmittingState,
  [SET_QUOTE_LINE_DIRTY]: setQuoteLineDirty,
  [CALCULATE_LINES]: calculateLines,

  [LOAD_CONTACT_ADDRESS]: loadCustomerAddress,
  [LOAD_CONTACT_AFTER_CREATE]: loadCustomerAfterCreate,

  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_JOB_LOADING_STATE]: setJobLoadingState,
  [SET_CONTACT_LOADING_STATE]: setCustomerLoadingState,

  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_ACCOUNT_LOADING_STATE]: setAccountLoadingState,

  [LOAD_ITEM_AFTER_CREATE]: loadItemOption,

  [UPDATE_EMAIL_QUOTE_DETAIL]: updateEmailQuoteDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [RESET_EMAIL_QUOTE_DETAIL]: resetEmailQuoteDetail,
  [ADD_EMAIL_ATTACHMENTS]: addAttachments,
  [UPLOAD_EMAIL_ATTACHMENT]: uploadEmailAttachment,
  [UPLOAD_EMAIL_ATTACHMENT_FAILED]: uploadEmailAttachmentFailed,
  [UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS]: uploadEmailAttachmentUploadProgress,
  [REMOVE_EMAIL_ATTACHMENT]: removeEmailAttachment,

  [CHANGE_EXPORT_PDF_TEMPLATE]: changeExportPdfForm,
  [CALCULATE_LINE_AMOUNTS]: calculatePartialQuoteLineAmounts,
  [LOAD_ITEM_SELLING_DETAILS]: loadItemSellingDetails,
  [CACHE_ITEM_SELLING_DETAILS]: cacheItemSellingDetails,

  [TOGGLE_QUOTE_HISTORY_ACCORDION]: toggleQuoteHistoryAccordion,
};

const quoteDetailReducer = createReducer(getDefaultState(), handlers);

export default quoteDetailReducer;
