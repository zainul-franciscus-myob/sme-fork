import {
  CLOSE_MODAL, FORMAT_AMOUNT_INPUT, LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL, LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  OPEN_MODAL, SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE, SET_TABLE_LOADING_STATE, UPDATE_CUSTOMER,
  UPDATE_INVOICE_PAYMENT_DETAILS,
  UPDATE_INVOICE_PAYMENT_ENTRIES,
  UPDATE_SHOW_PAID_INVOICES,
} from '../InvoicePaymentIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  alertMessage: '',
  customers: [],
  accounts: [],
  accountId: '',
  customerId: '',
  referenceId: '',
  description: '',
  date: formatIsoDate(new Date()),
  entries: [],
  showPaidInvoices: false,
  isLoading: false,
  isTableLoading: false,
  isSubmitting: false,
  isPageEdited: false,
  modalType: '',
  paymentAmount: '',
  applyPaymentToInvoiceId: '',
});

const resetState = () => (getDefaultState());

const pageEdited = { isPageEdited: true };

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const loadInvoicePaymentDetail = (state, { intent, ...detail }) => ({
  ...state,
  ...detail,
  originalReferenceId: detail.referenceId,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const updateInvoicePaymentDetails = (state, action) => ({
  ...state,
  ...pageEdited,
  [action.name]: action.value,
});

const updateInvoicePaymentEntries = (state, action) => ({
  ...state,
  ...pageEdited,
  entries: state.entries.map((entry, i) => {
    if (i === action.index) {
      return {
        ...entry,
        [action.name]: action.value,
      };
    }

    return entry;
  }),
});

const updateShowPaidInvoices = (state, action) => ({
  ...state,
  showPaidInvoices: action.value,
});

const updateCustomer = (state, action) => ({
  ...state,
  customerId: action.value,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: undefined,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const loadInvoiceList = (state, { entries }) => ({
  ...state,
  entries: entries.map(entry => ({
    ...entry,
    paidAmount: state.applyPaymentToInvoiceId === entry.id ? state.paymentAmount : '',
  })),
});

const formatAmountInput = (state, action) => ({
  ...state,
  entries: state.entries.map((entry, index) => (
    index === action.index && action.value.length > 0
      ? {
        ...entry,
        [action.name]: Number(action.value) ? Number(action.value).toFixed(2) : '',
      }
      : entry
  )),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_INVOICE_PAYMENT_DETAIL]: loadInvoicePaymentDetail,
  [LOAD_NEW_INVOICE_PAYMENT_DETAIL]: loadInvoicePaymentDetail,
  [UPDATE_INVOICE_PAYMENT_DETAILS]: updateInvoicePaymentDetails,
  [UPDATE_INVOICE_PAYMENT_ENTRIES]: updateInvoicePaymentEntries,
  [UPDATE_SHOW_PAID_INVOICES]: updateShowPaidInvoices,
  [UPDATE_CUSTOMER]: updateCustomer,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [LOAD_INVOICE_LIST]: loadInvoiceList,
  [FORMAT_AMOUNT_INPUT]: formatAmountInput,
};

const invoicePaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default invoicePaymentDetailReducer;
