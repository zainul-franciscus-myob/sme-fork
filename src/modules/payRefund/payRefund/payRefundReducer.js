import {
  CLOSE_MODAL,
  LOAD_PAY_REFUND,
  LOAD_REFERENCE_ID,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_REFUND_DETAIL,
  SET_SUBMITTING_STATE,
} from '../PayRefundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  customerReturnId: '',
  refundId: '',
  refund: {
    referenceId: '',
    originalReferenceId: '',
    date: formatIsoDate(new Date()),
    contactId: '',
    accountId: '',
    amount: '',
    description: '',
    customerReturnId: '',
  },
  contactOptions: [],
  accountOptions: [],
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isSubmitting: false,
  modalType: '',
  alert: undefined,
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

const loadRefund = (state, action) => ({
  ...state,
  refund: {
    ...state.refund,
    ...action.refund,
    originalReferenceId: action.refund.referenceId,
  },
  contactOptions: action.contactOptions,
  accountOptions: action.accountOptions,
});

const loadReferenceId = (state, action) => ({
  ...state,
  refund: {
    ...state.refund,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
  },
  isPageEdited: true,
});

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
  [LOAD_PAY_REFUND]: loadRefund,
  [SET_PAY_REFUND_DETAIL]: setRefundDetail,
  [LOAD_REFERENCE_ID]: loadReferenceId,
};

const payRefundReducer = createReducer(getDefaultState(), handlers);

export default payRefundReducer;
