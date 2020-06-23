import {
  CLOSE_MODAL,
  LOAD_RECEIVE_REFUND,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_RECEIVE_REFUND_DETAIL,
  SET_SUBMITTING_STATE,
} from '../ReceiveRefundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  supplierReturnId: '',
  refundId: '',
  refund: {
    referenceId: '',
    date: formatIsoDate(new Date()),
    contactId: '',
    accountId: '',
    amount: '',
    description: '',
    supplierReturnId: '',
  },
  originalReferenceId: '',
  contactOptions: [],
  accountOptions: [],
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isSubmitting: false,
  modalType: '',
  alert: undefined,
  startOfFinancialYearDate: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const loadRefund = (state, action) => {
  const defaultState = getDefaultState();
  return {
    ...state,
    refund: {
      ...state.refund,
      ...action.refund,
    },
    contactOptions: action.contactOptions,
    accountOptions: action.accountOptions,
    originalReferenceId: action.refund.referenceId || defaultState.originalReferenceId,
    startOfFinancialYearDate: action.startOfFinancialYearDate,
  };
};

const setRefundDetail = (state, action) => ({
  ...state,
  refund: {
    ...state.refund,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_RECEIVE_REFUND]: loadRefund,
  [SET_RECEIVE_REFUND_DETAIL]: setRefundDetail,
};

const receiveRefundReducer = createReducer(getDefaultState(), handlers);

export default receiveRefundReducer;
