import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_ITEM_LINE,
  ADD_INVOICE_SERVICE_LINE,
  FORMAT_INVOICE_ITEM_LINE,
  FORMAT_INVOICE_SERVICE_LINE,
  GET_INVOICE_ITEM_CALCULATED_LINES,
  GET_INVOICE_SERVICE_CALCULATED_TOTALS,
  LOAD_CONTACT_ADDRESS,
  LOAD_INVOICE_DETAIL,
  LOAD_PAY_DIRECT,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_ITEM_LINE,
  REMOVE_INVOICE_SERVICE_LINE,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_INVOICE_ITEM_TOTALS,
  RESET_INVOICE_SERVICE_TOTALS,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_INVOICE_ITEM_SUBMITTING_STATE,
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
  UPDATE_INVOICE_ITEM_LINE,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPDATE_INVOICE_SERVICE_LINE,
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
  addInvoiceItemLine,
  formatInvoiceItemLine,
  getInvoiceItemCalculatedLines,
  removeInvoiceItemLine,
  resetInvoiceItemTotals,
  setInvoiceItemLineDirty,
  setInvoiceItemSubmittingState,
  updateInvoiceItemLine,
} from './ItemLayoutReducer';
import {
  addInvoiceServiceLine,
  formatInvoiceServiceLine,
  getInvoiceServiceCalculatedTotals,
  removeInvoiceServiceLine,
  resetInvoiceServiceTotals,
  updateInvoiceServiceLine,
} from './ServiceLayoutReducer';
import {
  getLoadInvoiceDetailEmailInvoice,
  getLoadInvoiceDetailModalAndPageAlert,
  getLoadInvoiceDetailModalType,
} from '../selectors/invoiceDetailSelectors';
import { loadPayDirect, setPayDirectLoadingState } from './PayDirectReducer';
import { updateExportPdfDetail } from './ExportPdfReducer';
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

const updateInvoiceIdAfterCreate = (state, { invoiceId }) => ({ ...state, invoiceId });

const setInvoiceDetailHeaderOptions = (state, { key, value }) => updateInvoiceState(
  state, { [key]: value },
);

const updatePaymentAmount = (state, { amountPaid }) => updateInvoiceState(state, { amountPaid });

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
  [UPDATE_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,
  [UPDATE_INVOICE_DETAIL_HEADER_OPTIONS]: setInvoiceDetailHeaderOptions,
  [UPDATE_INVOICE_PAYMENT_AMOUNT]: updatePaymentAmount,

  [ADD_INVOICE_SERVICE_LINE]: addInvoiceServiceLine,
  [REMOVE_INVOICE_SERVICE_LINE]: removeInvoiceServiceLine,
  [UPDATE_INVOICE_SERVICE_LINE]: updateInvoiceServiceLine,
  [FORMAT_INVOICE_SERVICE_LINE]: formatInvoiceServiceLine,
  [GET_INVOICE_SERVICE_CALCULATED_TOTALS]: getInvoiceServiceCalculatedTotals,
  [RESET_INVOICE_SERVICE_TOTALS]: resetInvoiceServiceTotals,

  [ADD_INVOICE_ITEM_LINE]: addInvoiceItemLine,
  [REMOVE_INVOICE_ITEM_LINE]: removeInvoiceItemLine,
  [UPDATE_INVOICE_ITEM_LINE]: updateInvoiceItemLine,
  [FORMAT_INVOICE_ITEM_LINE]: formatInvoiceItemLine,
  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,
  [SET_INVOICE_ITEM_SUBMITTING_STATE]: setInvoiceItemSubmittingState,
  [GET_INVOICE_ITEM_CALCULATED_LINES]: getInvoiceItemCalculatedLines,
  [RESET_INVOICE_ITEM_TOTALS]: resetInvoiceItemTotals,

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
