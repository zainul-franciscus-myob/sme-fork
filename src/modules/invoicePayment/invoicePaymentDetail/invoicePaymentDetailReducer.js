import {
  CLOSE_MODAL,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_CUSTOMER,
  UPDATE_INVOICE_PAYMENT_DETAILS,
  UPDATE_INVOICE_PAYMENT_ENTRIES,
  UPDATE_SHOW_PAID_INVOICES,
} from '../InvoicePaymentIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  alertMessage: '',
  accounts: [],
  accountId: '',
  customerId: '',
  referenceId: '',
  description: '',
  date: formatIsoDate(new Date()),
  entries: [],
  showPaidInvoices: false,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isSubmitting: false,
  isPageEdited: false,
  modal: undefined,
  paymentAmount: '',
  applyPaymentToInvoiceId: '',
  startOfFinancialYearDate: '',
});

const resetState = () => getDefaultState();

const pageEdited = { isPageEdited: true };

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const updateInvoicePaymentDetails = (state, { key, value }) => ({
  ...state,
  ...pageEdited,
  [key]: value,
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

const updateCustomer = (state, action) => {
  return {
    ...state,
    customerId: action.value,
    entries: state.customerId !== action.value ? [] : state.entries,
  };
};

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, { modal }) => ({
  ...state,
  modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const loadInvoiceList = (state, { entries }) => ({
  ...state,
  entries: entries.map((entry) => ({
    ...entry,
    paidAmount:
      state.applyPaymentToInvoiceId === entry.id ? state.paymentAmount : '',
  })),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_INVOICE_PAYMENT_DETAIL]: loadInvoicePaymentDetail,
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
};

const invoicePaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default invoicePaymentDetailReducer;
