import { isBefore } from 'date-fns';
import Decimal from 'decimal.js';

import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINES,
  CALCULATE_LINE_AMOUNTS,
  CONVERT_TO_PRE_CONVERSION_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_JOB_AFTER_CREATE,
  LOAD_PAY_DIRECT,
  RELOAD_INVOICE_DETAIL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_CUSTOMER,
  RESET_EMAIL_INVOICE_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_CUSTOMER_LOADING_STATE,
  SET_DUPLICATE_ID,
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
  SET_REDIRECT_STATE,
  SET_SHOW_PRE_CONVERSION_ALERT,
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
  calculateTotals,
  getBusinessId,
  getInvoiceId,
  getRegion,
  getUpdatedCustomerOptions,
} from '../selectors/invoiceDetailSelectors';
import { calculateLineAmounts, calculateLines } from './calculationReducer';
import { getEmailDetailFromLoadInvoiceDetail } from '../selectors/emailSelectors';
import {
  getInvoiceHistory,
  getInvoiceHistoryAccordionStatus,
} from '../selectors/invoiceHistorySelectors';
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
import InvoiceLineType from '../types/InvoiceLineType';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
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

const setModalType = (state, { modalType }) => ({ ...state, modalType });

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({
  ...state,
  isModalSubmitting,
});

const setOriginalAmountDue = ({
  isTaxInclusive,
  lines,
  amountPaid,
  taxExclusiveFreightAmount = '0',
  freightTaxAmount = '0',
}) => {
  const totals = calculateTotals({
    isTaxInclusive,
    lines,
    taxExclusiveFreightAmount,
    freightTaxAmount,
  });

  return calculateAmountDue(totals.totalAmount, amountPaid);
};

const buildLineJobOptions = ({ action, jobId }) =>
  action.jobOptions
    ? action.jobOptions.filter((job) => job.isActive || job.id === jobId)
    : [];

const loadInvoiceDetail = (state, action) => {
  const defaultState = getDefaultState();

  const isPreConversion = isBefore(
    new Date(action.invoice.issueDate),
    new Date(action.conversionDate)
  );

  return {
    ...state,
    ...action,
    invoice: {
      ...state.invoice,
      ...action.invoice,
      status: action.invoice.status || defaultState.invoice.status,
      lines: action.invoice.lines.map((line) => {
        const lineJobOptions = buildLineJobOptions({
          action,
          jobId: line.jobId,
        });
        if (
          [
            InvoiceLineType.SERVICE,
            InvoiceLineType.ITEM,
            InvoiceLineType.SUB_TOTAL,
          ].includes(line.type)
        ) {
          const amount = action.invoice.isTaxInclusive
            ? new Decimal(line.taxExclusiveAmount).add(line.taxAmount).valueOf()
            : new Decimal(line.taxExclusiveAmount).valueOf();

          return { ...line, amount, lineJobOptions };
        }

        return { ...line, lineJobOptions };
      }),
    },
    originalAmountDue: setOriginalAmountDue(action.invoice),
    newLine: {
      ...state.newLine,
      ...action.newLine,
      lineJobOptions: buildLineJobOptions({ action }),
    },
    comments: action.comments || state.comments,
    serialNumber: action.serialNumber,
    customerOptions: action.customerOptions || state.customerOptions,
    expirationTermOptions:
      action.expirationTermOptions || state.expirationTermOptions,
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
      monthlyLimit:
        action.subscription.monthlyLimit ||
        defaultState.subscription.monthlyLimit,
      isUpgradeModalShowing: action.subscription.monthlyLimit
        ? !!action.subscription.monthlyLimit.hasHitLimit
        : defaultState.subscription.isUpgradeModalShowing,
    },
    isPreConversion,
    showPreConversionAlert: isPreConversion,
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

  const context = { businessId, region, invoiceId };

  const initialState = {
    ...defaultState,
    ...context,
    isInvoiceJobColumnEnabled: state.isInvoiceJobColumnEnabled,
  };

  const loadState = loadInvoiceDetail(initialState, action);

  return {
    ...loadState,
    payDirect,
    invoiceHistory,
    invoiceHistoryAccordionStatus,
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

const loadCustomer = (state, { address }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address,
  },
});

const loadCustomerAfterCreate = (state, { customerId, address, option }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    customerId,
    address,
  },
  customerOptions: getUpdatedCustomerOptions(state, option),
});

const setCustomerLoadingState = (state, { isCustomerLoading }) => ({
  ...state,
  isCustomerLoading,
});

const resetCustomer = (state) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address: '',
  },
  abn: undefined,
});

export const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line) => ({
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

const updateInvoiceIdAfterCreate = (state, { invoiceId }) => ({
  ...state,
  invoiceId,
});

const setInvoiceDetailHeaderOptions = (state, { key, value }) =>
  updateInvoiceState(state, { [key]: value });

const updatePaymentAmount = (state, { amountPaid }) =>
  updateInvoiceState(state, { amountPaid });

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [action.response, ...state.itemOptions],
});

const updateInvoiceLayout = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    layout: action.layout,
    lines: state.invoice.lines
      .filter((line) => line.type === InvoiceLineType.SERVICE)
      .map((line) => ({
        ...line,
        id: '',
      })),
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updateInvoiceLine = (state, action) => {
  const isUpdateAccountId = action.key === 'accountId';
  const isUpdateJob = action.key === 'jobId';

  const getLineType = (layout, key) => {
    if (layout === InvoiceLineType.ITEM) {
      return layout;
    }

    return key === 'itemId' ? InvoiceLineType.ITEM : InvoiceLineType.SERVICE;
  };

  return {
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map((line, index) => {
        if (index === action.index) {
          const type = getLineType(line.type, action.key);

          return {
            ...line,
            type,
            id: type === line.type ? line.id : '',
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
  };
};

const addInvoiceLine = (state) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: [...state.invoice.lines, state.newLine],
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

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const setInvoiceItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

export const setRedirectState = (state, { redirectUrl, isOpenInNewTab }) => ({
  ...state,
  redirectUrl,
  isOpenInNewTab,
});

const setUpgradeModalShowing = (
  state,
  { isUpgradeModalShowing, monthlyLimit }
) => ({
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

const convertToPreConversionInvoice = (state) => ({
  ...state,
  isPreConversion: true,
  invoice: {
    ...state.invoice,
    isTaxInclusive: true,
    layout: InvoiceLayout.SERVICE,
    lines: [
      {
        description: 'Historical sale',
        accountId: state.linkedAccountId,
        amount: '',
        jobId: '',
        taxCodeId: getDefaultTaxCodeId({
          accountId: state.linkedAccountId,
          accountOptions: state.accountOptions,
        }),
        lineTypeId: 17,
        type: InvoiceLineType.SERVICE,
      },
    ],
  },
});

const setShowPreConversionAlert = (state, { showPreConversionAlert }) => ({
  ...state,
  showPreConversionAlert,
});

const setDuplicateId = (state, action) => ({
  ...state,
  duplicateId: action.duplicateId,
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const loadAbnFromCustomer = (state, action) => ({
  ...state,
  abn: action.abn,
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

  [LOAD_CUSTOMER]: loadCustomer,
  [LOAD_CUSTOMER_AFTER_CREATE]: loadCustomerAfterCreate,
  [SET_CUSTOMER_LOADING_STATE]: setCustomerLoadingState,
  [RESET_CUSTOMER]: resetCustomer,

  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,

  [LOAD_ITEM_OPTION]: loadItemOption,
  [UPDATE_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [UPDATE_INVOICE_DETAIL_HEADER_OPTIONS]: setInvoiceDetailHeaderOptions,
  [UPDATE_INVOICE_PAYMENT_AMOUNT]: updatePaymentAmount,
  [UPDATE_INVOICE_LAYOUT]: updateInvoiceLayout,

  [ADD_INVOICE_LINE]: addInvoiceLine,
  [REMOVE_INVOICE_LINE]: removeInvoiceLine,
  [UPDATE_INVOICE_LINE]: updateInvoiceLine,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,

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
  [SET_REDIRECT_STATE]: setRedirectState,
  [LOAD_INVOICE_HISTORY]: loadInvoiceHistory,

  [CALCULATE_LINES]: calculateLines,
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [LOAD_ITEM_SELLING_DETAILS]: loadItemSellingDetails,

  [CONVERT_TO_PRE_CONVERSION_INVOICE]: convertToPreConversionInvoice,
  [SET_SHOW_PRE_CONVERSION_ALERT]: setShowPreConversionAlert,

  [LOAD_ABN_FROM_CUSTOMER]: loadAbnFromCustomer,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
};

const invoiceDetailReducer = createReducer(getDefaultState(), handlers);

export default invoiceDetailReducer;
