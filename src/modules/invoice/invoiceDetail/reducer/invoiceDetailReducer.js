import Decimal from 'decimal.js';

import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINE_AMOUNTS,
  CALCULATE_LINE_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_PAY_DIRECT,
  RELOAD_INVOICE_DETAIL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_TOTALS,
  SAVE_EMAIL_SETTINGS,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_INVOICE_HISTORY_CLOSED,
  SET_INVOICE_HISTORY_LOADING,
  SET_INVOICE_HISTORY_OPEN,
  SET_INVOICE_HISTORY_UNAVAILABLE,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_REF,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_INVOICE_DETAIL_HEADER_OPTIONS,
  UPDATE_INVOICE_ID_AFTER_CREATE,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../InvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  addAttachments,
  removeEmailAttachment,
  resetEmailInvoiceDetail,
  saveEmailSettings,
  updateEmailInvoiceDetail,
  uploadEmailAttachment,
  uploadEmailAttachmentFailed,
  uploadEmailAttachmentUploadProgress,
} from './EmailReducer';
import {
  calculateAmountDue,
  getBusinessId,
  getInvoiceId,
  getIsInvoiceJobColumnEnabled,
  getRegion,
  getUpdatedContactOptions,
} from '../selectors/invoiceDetailSelectors';
import { calculateLineAmounts, calculateLineTotals } from './calculationReducer';
import { getEmailDetailFromLoadInvoiceDetail } from '../selectors/emailSelectors';
import { getInvoiceHistory, getInvoiceHistoryAccordionStatus } from '../selectors/invoiceHistorySelectors';
import { getPayDirect } from '../selectors/payDirectSelectors';
import {
  loadInvoiceHistory,
  setInvoiceHistoryClosed,
  setInvoiceHistoryLoading,
  setInvoiceHistoryOpen,
  setInvoiceHistoryUnavailable,
} from './InvoiceHistoryReducer';
import { loadPayDirect, setPayDirectLoadingState } from './PayDirectReducer';
import { updateExportPdfDetail } from './ExportPdfReducer';
import InvoiceLayout from '../types/InvoiceLayout';
import InvoiceLineLayout from '../types/InvoiceLineLayout';
import LoadingState from '../../../../components/PageView/LoadingState';
import calculateTotals from '../../../../common/taxCalculator/calculateTotals';
import createReducer from '../../../../store/createReducer';
import getDefaultState, { DEFAULT_DISCOUNT, DEFAULT_UNITS } from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const setLoadingState = (state, { loadingState }) => ({ ...state, loadingState });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const setModalType = (state, { modalType }) => ({ ...state, modalType });

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({ ...state, isModalSubmitting });

const setTotalsOnLoad = ({ isTaxInclusive, lines, amountPaid }) => {
  const totals = calculateTotals({ isTaxInclusive, lines });
  const originalAmountDue = calculateAmountDue(totals.totalAmount, amountPaid);

  return {
    ...totals,
    originalAmountDue,
  };
};

const loadInvoiceDetail = (state, action) => {
  const defaultState = getDefaultState();

  return {
    ...state,
    ...action,
    invoice: {
      ...state.invoice,
      ...action.invoice,
      status: action.invoice.status || defaultState.invoice.status,
      lines: action.invoice.lines.map(line => {
        const amount = action.invoice.isTaxInclusive
          ? (new Decimal(line.taxExclusiveAmount).add(line.taxAmount)).valueOf()
          : (new Decimal(line.taxExclusiveAmount)).valueOf();

        return {
          ...line,
          amount,
        };
      }),
    },
    totals: action.invoice.lines.length === 0
      ? defaultState.totals
      : {
        ...setTotalsOnLoad(action.invoice),
      },
    newLine: {
      ...state.newLine,
      ...action.newLine,
    },
    comments: action.comments || state.comments,
    serialNumber: action.serialNumber,
    contactOptions: action.contactOptions || state.contactOptions,
    expirationTermOptions: action.expirationTermOptions || state.expirationTermOptions,
    itemOptions: action.itemOptions || state.itemOptions,
    taxCodeOptions: action.taxCodeOptions || state.taxCodeOptions,
    emailInvoice: {
      ...state.emailInvoice,
      ...getEmailDetailFromLoadInvoiceDetail({
        emailInvoice: action.emailInvoice,
        invoiceNumber: action.invoice.invoiceNumber,
      }),
    },
    emailInvoiceDefaultState: {
      ...state.emailInvoiceDefaultState,
      ...getEmailDetailFromLoadInvoiceDetail({
        emailInvoice: action.emailInvoice,
        invoiceNumber: action.invoice.invoiceNumber,
      }),
    },
    exportPdf: {
      ...state.exportPdf,
      ...action.exportPdf,
    },
    subscription: {
      ...defaultState.subscription,
      ...action.subscription,
      monthlyLimit: action.subscription.monthlyLimit || defaultState.subscription.monthlyLimit,
      isUpgradeModalShowing: action.subscription.monthlyLimit
        ? !!action.subscription.monthlyLimit.hasHitLimit
        : defaultState.subscription.isUpgradeModalShowing,
    },
  };
};

const reloadInvoiceDetail = (state, action) => {
  const defaultState = getDefaultState();

  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const invoiceId = getInvoiceId(state);
  const payDirect = getPayDirect(state);
  const invoiceHistory = getInvoiceHistory(state);
  const invoiceHistoryAccordionStatus = getInvoiceHistoryAccordionStatus(state);
  const isInvoiceJobColumnEnabled = getIsInvoiceJobColumnEnabled(state);

  const context = { businessId, region, invoiceId };

  const initialState = {
    ...defaultState,
    ...context,
  };

  const loadState = loadInvoiceDetail(initialState, action);

  return {
    ...loadState,
    payDirect,
    invoiceHistory,
    invoiceHistoryAccordionStatus,
    isInvoiceJobColumnEnabled,
    loadingState: LoadingState.LOADING_SUCCESS,
  };
};

const updateInvoiceState = (state, partialInvoice) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    ...partialInvoice,
  },
});

const loadContactAddress = (state, { address }) => updateInvoiceState(state, { address });

const loadContactAfterCreate = (state, { contactId, address, option }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    contactId,
    address,
  },
  contactOptions: getUpdatedContactOptions(state, option),
});

const setContactLoadingState = (state, { isContactLoading }) => ({ ...state, isContactLoading });

const updateInvoiceIdAfterCreate = (state, { invoiceId }) => ({ ...state, invoiceId });

const setInvoiceDetailHeaderOptions = (state, { key, value }) => updateInvoiceState(
  state, { [key]: value },
);

const updatePaymentAmount = (state, { amountPaid }) => updateInvoiceState(state, { amountPaid });

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [
    action.response,
    ...state.itemOptions,
  ],
});

const updateInvoiceLayout = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    layout: action.layout,
    lines: state.invoice.lines
      .filter(line => line.layout === InvoiceLineLayout.SERVICE)
      .map(line => ({
        ...line,
        id: '',
      })),
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const calculateLineLayout = (layout, key) => {
  const isItemLayout = layout === InvoiceLayout.ITEM;
  const isUpdateItemId = key === 'itemId';

  if (isItemLayout) {
    return layout;
  }

  return isUpdateItemId ? InvoiceLayout.ITEM : InvoiceLayout.SERVICE;
};

const updateInvoiceLine = (state, action) => {
  const isUpdateAccountId = action.key === 'accountId';
  const isUpdateJob = action.key === 'jobId';

  const getLineLayout = (layout, key) => {
    const isLineItemLayout = layout === InvoiceLineLayout.ITEM;
    const isUpdateItemId = key === 'itemId';

    if (isLineItemLayout) {
      return layout;
    }

    return isUpdateItemId ? InvoiceLineLayout.ITEM : InvoiceLineLayout.SERVICE;
  };

  return ({
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map((line, index) => {
        const lineLayout = calculateLineLayout(line.layout, action.key);
        if (index === action.index) {
          return {
            ...line,
            layout: getLineLayout(line.layout, action.key),
            id: lineLayout === line.layout ? line.id : '',
            taxCodeId: isUpdateAccountId
              ? getDefaultTaxCodeId({
                accountId: action.value,
                accountOptions: state.accountOptions,
              })
              : line.taxCodeId,
            jobId: isUpdateJob ? action.value : line.jobId,
            [action.key]: action.value,
          };
        }

        return line;
      }),
    },
  });
};

const addInvoiceLine = state => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: [
      ...state.invoice.lines,
      state.newLine,
    ],
  },
});

const removeInvoiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

const resetTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const setInvoiceItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

export const setRedirectRef = (state, { redirectRefJournalId, redirectRefJournalType }) => ({
  ...state,
  redirectRefJournalId,
  redirectRefJournalType,
});

const setUpgradeModalShowing = (state, { isUpgradeModalShowing, monthlyLimit }) => ({
  ...state,
  subscription: {
    ...state.subscription,
    isUpgradeModalShowing,
    monthlyLimit: monthlyLimit || state.subscription.monthlyLimit,
  },
});

const loadItemSellingDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
      if (index !== action.index) return line;
      const {
        unitOfMeasure,
        description,
        sellTaxCodeId,
        incomeAccountId,
        unitPrice,
      } = action.itemSellingDetails;

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

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
  [SET_MODAL_ALERT]: setModalAlert,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [LOAD_INVOICE_DETAIL]: loadInvoiceDetail,
  [RELOAD_INVOICE_DETAIL]: reloadInvoiceDetail,
  [LOAD_CONTACT_ADDRESS]: loadContactAddress,
  [LOAD_CONTACT_AFTER_CREATE]: loadContactAfterCreate,
  [LOAD_ITEM_OPTION]: loadItemOption,
  [SET_CONTACT_LOADING_STATE]: setContactLoadingState,
  [UPDATE_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,
  [UPDATE_INVOICE_DETAIL_HEADER_OPTIONS]: setInvoiceDetailHeaderOptions,
  [UPDATE_INVOICE_PAYMENT_AMOUNT]: updatePaymentAmount,
  [UPDATE_INVOICE_LAYOUT]: updateInvoiceLayout,

  [ADD_INVOICE_LINE]: addInvoiceLine,
  [REMOVE_INVOICE_LINE]: removeInvoiceLine,
  [UPDATE_INVOICE_LINE]: updateInvoiceLine,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,
  [RESET_TOTALS]: resetTotals,

  [LOAD_PAY_DIRECT]: loadPayDirect,
  [SET_PAY_DIRECT_LOADING_STATE]: setPayDirectLoadingState,

  [SAVE_EMAIL_SETTINGS]: saveEmailSettings,
  [UPDATE_EMAIL_INVOICE_DETAIL]: updateEmailInvoiceDetail,
  [RESET_EMAIL_INVOICE_DETAIL]: resetEmailInvoiceDetail,
  [ADD_EMAIL_ATTACHMENTS]: addAttachments,
  [UPLOAD_EMAIL_ATTACHMENT]: uploadEmailAttachment,
  [UPLOAD_EMAIL_ATTACHMENT_FAILED]: uploadEmailAttachmentFailed,
  [UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS]: uploadEmailAttachmentUploadProgress,
  [REMOVE_EMAIL_ATTACHMENT]: removeEmailAttachment,

  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,

  [SET_INVOICE_HISTORY_LOADING]: setInvoiceHistoryLoading,
  [SET_INVOICE_HISTORY_UNAVAILABLE]: setInvoiceHistoryUnavailable,
  [SET_INVOICE_HISTORY_CLOSED]: setInvoiceHistoryClosed,
  [SET_INVOICE_HISTORY_OPEN]: setInvoiceHistoryOpen,
  [SET_REDIRECT_REF]: setRedirectRef,
  [LOAD_INVOICE_HISTORY]: loadInvoiceHistory,

  [CALCULATE_LINE_TOTALS]: calculateLineTotals,
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [LOAD_ITEM_SELLING_DETAILS]: loadItemSellingDetails,
};

const invoiceDetailReducer = createReducer(getDefaultState(), handlers);

export default invoiceDetailReducer;
