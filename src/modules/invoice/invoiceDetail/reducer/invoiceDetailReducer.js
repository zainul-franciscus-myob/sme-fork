import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINE_AMOUNTS,
  CALCULATE_LINE_TOTALS,
  FORMAT_INVOICE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_PAY_DIRECT,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_TOTALS,
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
  resetOpenSendEmailParam,
  updateEmailInvoiceDetail,
  uploadEmailAttachment,
  uploadEmailAttachmentFailed,
  uploadEmailAttachmentUploadProgress,
} from './EmailReducer';
import { calculateLineAmounts, calculateLineTotals } from './calculationReducer';
import {
  getLoadInvoiceDetailEmailInvoice,
  getLoadInvoiceDetailModalAndPageAlert,
  getLoadInvoiceDetailModalType,
  getUpdatedContactOptions,
} from '../selectors/invoiceDetailSelectors';
import {
  loadInvoiceHistory,
  setInvoiceHistoryClosed,
  setInvoiceHistoryLoading,
  setInvoiceHistoryOpen,
  setInvoiceHistoryUnavailable,
} from './InvoiceHistoryReducer';
import { loadPayDirect, setPayDirectLoadingState } from './PayDirectReducer';
import { updateExportPdfDetail } from './ExportPdfReducer';
import InvoiceLayout from '../InvoiceLayout';
import InvoiceLineLayout from '../InvoiceLineLayout';
import createReducer from '../../../../store/createReducer';
import formatDisplayAmount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';
import formatUnits from '../../../../common/valueFormatters/formatTaxCalculation/formatUnits';
import getDefaultState, { DEFAULT_DISCOUNT, DEFAULT_UNITS } from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const setLoadingState = (state, { loadingState }) => ({ ...state, loadingState });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const setModalType = (state, { modalType }) => ({ ...state, modalType });

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({ ...state, isModalSubmitting });

const loadInvoiceDetail = (state, action) => {
  const defaultState = getDefaultState();
  const modalType = getLoadInvoiceDetailModalType(state, action.emailInvoice);

  const { modalAlert, pageAlert } = action.message
    ? getLoadInvoiceDetailModalAndPageAlert(state, action.message)
    : {};

  return {
    ...state,
    ...action,
    invoice: {
      ...state.invoice,
      ...action.invoice,
      lines: action.invoice.lines.map(line => ({
        ...line,
        displayAmount: formatDisplayAmount(line.amount),
        displayDiscount: line.discount ? formatDisplayDiscount(line.discount) : '',
        displayUnitPrice: line.unitPrice ? formatDisplayUnitPrice(line.unitPrice) : '',
      })),
    },
    newLine: action.newLine || state.newLine,
    totals: action.totals || state.totals,
    comments: action.comments || state.comments,
    serialNumber: action.serialNumber,
    contactOptions: action.contactOptions || state.contactOptions,
    expirationTermOptions: action.expirationTermOptions || state.expirationTermOptions,
    itemOptions: action.itemOptions || state.itemOptions,
    taxCodeOptions: action.taxCodeOptions || state.taxCodeOptions,
    emailInvoice: {
      ...state.emailInvoice,
      ...getLoadInvoiceDetailEmailInvoice(action.emailInvoice, action.invoice.invoiceNumber),
    },
    emailInvoiceDefaultState: {
      ...state.emailInvoiceDefaultState,
      ...getLoadInvoiceDetailEmailInvoice(action.emailInvoice, action.invoice.invoiceNumber),
    },
    exportPdf: {
      ...state.exportPdf,
      ...action.exportPdf,
    },
    modalType,
    modalAlert,
    alert: pageAlert,
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
  const isUpdateDiscount = action.key === 'discount';
  const isUpdateAmount = action.key === 'amount';
  const isUpdateAccountId = action.key === 'accountId';
  const isUpdateUnitPrice = action.key === 'unitPrice';

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
            displayDiscount: isUpdateDiscount ? action.value : line.displayDiscount,
            displayAmount: isUpdateAmount ? action.value : line.displayAmount,
            displayUnitPrice: isUpdateUnitPrice ? action.value : line.displayUnitPrice,
            [action.key]: action.value,
          };
        }

        return line;
      }),
    },
  });
};

const formatDisplayField = (line, key) => {
  const fieldMap = {
    unitPrice: { displayField: 'displayUnitPrice', formatter: formatDisplayUnitPrice },
    amount: { displayField: 'displayAmount', formatter: formatDisplayAmount },
    discount: { displayField: 'displayDiscount', formatter: formatDisplayDiscount },
    units: { displayField: 'units', formatter: formatUnits },
  };
  const { displayField, formatter } = fieldMap[key] || {};

  return formatter ? {
    [displayField]: line[key] && formatter(line[key]),
  } : {};
};

const formatInvoiceLine = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => (
      index === action.index ? {
        ...line,
        ...formatDisplayField(line, action.key),
      } : line
    )),
  },
});

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
        displayDiscount: formatDisplayDiscount(DEFAULT_DISCOUNT),
        description,
        taxCodeId: sellTaxCodeId,
        accountId: incomeAccountId,
        unitPrice,
        displayUnitPrice: formatDisplayUnitPrice(unitPrice),
        amount: unitPrice,
        displayAmount: formatDisplayAmount(unitPrice),
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
  [FORMAT_INVOICE_LINE]: formatInvoiceLine,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,
  [RESET_TOTALS]: resetTotals,

  [LOAD_PAY_DIRECT]: loadPayDirect,
  [SET_PAY_DIRECT_LOADING_STATE]: setPayDirectLoadingState,

  [UPDATE_EMAIL_INVOICE_DETAIL]: updateEmailInvoiceDetail,
  [RESET_EMAIL_INVOICE_DETAIL]: resetEmailInvoiceDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
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
