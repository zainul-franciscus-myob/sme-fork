import { format as dateFormat } from 'date-fns';

import {
  CLOSE_MODAL,
  FORMAT_AMOUNT_INPUT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERECE_ID,
  UPDATE_TABLE_INPUT_FIELD,
} from '../BillPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'YYYY-MM-DD');

const getDefaultState = () => ({
  region: '',
  businessId: '',
  billPaymentId: '',
  suppliers: [],
  supplierId: '',
  accounts: [],
  accountId: '',
  showPaidBills: false,
  referenceId: '',
  originalReferenceId: '',
  description: '',
  date: convertToDateString(Date.now()),
  entries: [],
  totalPaid: '',
  isLoading: true,
  isTableLoading: false,
  isSubmitting: false,
  isPageEdited: false,
  modalType: '',
  alertMessage: '',
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const loadNewBillPayment = (state, action) => ({
  ...state,
  suppliers: action.suppliers,
  accounts: action.accounts,
  accountId: action.accountId,
  showPaidBills: action.showPaidBills,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
});

const loadBillPayment = (state, action) => ({
  ...state,
  date: action.date,
  suppliers: action.suppliers,
  supplierId: action.supplierId,
  accounts: action.accounts,
  accountId: action.accountId,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
  entries: action.entries,
});

const loadBillList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const updateHeaderOption = (state, action) => ({
  ...state,
  ...pageEdited,
  [action.key]: action.value,
});

const updateTableInputField = (state, action) => ({
  ...state,
  ...pageEdited,
  entries: state.entries.map((entry, index) => (
    index === action.index
      ? {
        ...entry,
        [action.key]: action.value,
      }
      : entry
  )),
});

const updateReferenceId = (state, action) => ({
  ...state,
  ...pageEdited,
  referenceId: action.referenceId,
  originalReferenceId: action.referenceId,
});

const formatAmountInput = (state, action) => ({
  ...state,
  entries: state.entries.map((entry, index) => (
    index === action.index && action.value.length > 0
      ? {
        ...entry,
        [action.key]: Number(action.value).toFixed(2),
      }
      : entry
  )),
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_BILL_LIST]: loadBillList,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [UPDATE_TABLE_INPUT_FIELD]: updateTableInputField,
  [UPDATE_REFERECE_ID]: updateReferenceId,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [FORMAT_AMOUNT_INPUT]: formatAmountInput,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const billPaymentDetailReducer = createReducer(getDefaultState(), handlers);

export default billPaymentDetailReducer;
