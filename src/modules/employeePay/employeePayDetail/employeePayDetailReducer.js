import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT,
  SET_DELETE_MODAL_OPEN_STATE,
  SET_EMPLOYEE_PAY_DETAIL,
  SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import uuid from '../../../common/uuid/uuid';

const getDefaultState = () => ({
  payrunId: uuid(),
  loadingState: LoadingState.LOADING,
  businessId: '',
  region: '',
  transactionId: '',
  employeePay: {
    accountName: '',
    balance: '',
    dateOfPayment: '',
    employeeBankStatementDesc: '',
    employeeId: 0,
    employeeFirstName: '',
    employeeLastName: '',
    isDeletable: true,
    lines: [],
    parentBusinessEventId: undefined,
    payPeriodStart: '',
    payPeriodEnd: '',
    paymentMethod: '',
    referenceNumber: '',
    totalNetPayment: '',
    transactionDesc: '',
    isReversible: false,
    isReversalPreview: false,
    isPending: false,
    isRejected: false,
  },
  alert: '',
  isDeleteModalOpen: false,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlertMessage = (store, { message }) => ({
  ...store,
  alert: message,
});

const setEmployeePayDetails = (state, { response }) => ({
  ...state,
  employeePay: {
    ...state.employeePay,
    ...response,
  },
});

const setEmployeePayReversalPreviewDetails = (state, { response }) => ({
  ...state,
  employeePay: {
    ...response,
    isReversalPreview: true,
  },
});

const setDeleteModalOpenState = (store, { isOpen }) => ({
  ...store,
  isDeleteModalOpen: isOpen,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_DELETE_MODAL_OPEN_STATE]: setDeleteModalOpenState,
  [SET_ALERT]: setAlertMessage,
  [SET_EMPLOYEE_PAY_DETAIL]: setEmployeePayDetails,
  [SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL]: setEmployeePayReversalPreviewDetails,
};

const employeePayDetailReducer = createReducer(getDefaultState(), handlers);

export default employeePayDetailReducer;
