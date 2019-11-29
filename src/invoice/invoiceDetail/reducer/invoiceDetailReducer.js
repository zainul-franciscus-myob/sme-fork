import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINE_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_ITEM_OPTION,
  LOAD_PAY_DIRECT,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_TOTALS,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_SUBMITTING_STATE,
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
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
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
import {
  getLoadInvoiceDetailEmailInvoice,
  getLoadInvoiceDetailModalAndPageAlert,
  getLoadInvoiceDetailModalType,
  getUpdatedContactOptions,
} from '../selectors/invoiceDetailSelectors';
import { loadPayDirect, setPayDirectLoadingState } from './PayDirectReducer';
import { updateExportPdfDetail } from './ExportPdfReducer';
import InvoiceLayout from '../InvoiceLayout';
import createReducer from '../../../store/createReducer';
import getDefaultState from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const setModalType = (state, { modalType }) => ({ ...state, modalType });

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({ ...state, isModalSubmitting });

const loadInvoiceDetail = (state, action) => {
  const modalType = getLoadInvoiceDetailModalType(state, action.emailInvoice);

  const { modalAlert, pageAlert } = action.message
    ? getLoadInvoiceDetailModalAndPageAlert(state, action.message)
    : {};

  return ({
    ...state,
    ...action,
    invoice: {
      ...state.invoice,
      ...action.invoice,
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
  });
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
    lines: state.invoice.lines.filter(line => line.layout === InvoiceLayout.SERVICE),
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const updateInvoiceLine = (state, action) => {
  const isUpdateDiscount = action.key === 'discount';
  const isUpdateAmount = action.key === 'amount';
  const isUpdateAccountId = action.key === 'accountId';

  return ({
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map((line, index) => (index === action.index
        ? {
          ...line,
          taxCodeId: isUpdateAccountId
            ? getDefaultTaxCodeId({ accountId: action.value, accountOptions: state.accountOptions })
            : line.taxCodeId,
          displayDiscount: isUpdateDiscount ? action.value : line.displayDiscount,
          displayAmount: isUpdateAmount ? action.value : line.displayAmount,
          [action.key]: action.value,
        }
        : line)),
    },
  });
};

export const addInvoiceLine = (state, action) => {
  const { accountId, description, itemId } = action.line;

  return ({
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: [
        ...state.invoice.lines,
        {
          ...state.newLine,
          accountId: accountId || state.newLine.accountId,
          description: description || state.newLine.description,
          itemId: itemId || state.newLine.itemId,
          taxCodeId: accountId ? getDefaultTaxCodeId({
            accountOptions: state.accountOptions,
            accountId: action.line.accountId,
          }) : state.newLine.taxCodeId,
        },
      ],
    },
  });
};

export const removeInvoiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

export const resetTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});

export const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

export const setInvoiceItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

export const calculateLineTotals = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    isTaxInclusive: action.invoice.isTaxInclusive,
    lines: action.invoice.lines,
  },
  totals: {
    ...state.totals,
    ...action.totals,
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
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,
  [CALCULATE_LINE_TOTALS]: calculateLineTotals,
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
};

const invoiceDetailReducer = createReducer(getDefaultState(), handlers);

export default invoiceDetailReducer;
