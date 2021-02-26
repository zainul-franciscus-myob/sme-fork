import {
  CLOSE_DELETE_MODAL,
  DELETE_EMPLOYEE_PAY_DETAIL_FAILED,
  DISMISS_ALERT,
  OPEN_DELETE_MODAL,
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

const getDefaultState = () => ({
  payrunId: uuid(),
  loadingState: LoadingState.LOADING,
  businessId: '',
  region: '',
  transactionId: '',
  displayDeleteConfirmation: false,
  alert: undefined,
  employeePay: {
    accountName: '',
    balance: '',
    dateOfPayment: '',
    employeeBankStatementDesc: '',
    employeeId: 0,
    employeeFirstName: '',
    employeeLastName: '',
    isDeletable: false,
    lines: [],
    parentBusinessEventId: undefined,
    payPeriodStart: '',
    payPeriodEnd: '',
    paymentMethod: '',
    payRunId: '',
    referenceNumber: '',
    totalNetPayment: '',
    transactionDesc: '',
    isReversible: false,
    isReversalPreview: false,
    isPending: false,
    isRejected: false,
  },
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

const setEmployeePayDetails = (state, { response }) => ({
  ...state,
  employeePay: {
    ...state.employeePay,
    ...response,
  },
});

const closeDeleteModal = (state) => ({
  ...state,
  displayDeleteConfirmation: false,
});

const openDeleteModal = (state) => ({
  ...state,
  displayDeleteConfirmation: true,
});

const deleteEmployeeFailed = (state, action) => ({
  ...state,
  displayDeleteConfirmation: false,
  alert: { type: 'danger', message: action.message },
});

const dismissAlert = (state) => ({
  ...state,
  alert: undefined,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_EMPLOYEE_PAY_DETAIL]: setEmployeePayDetails,
  [OPEN_DELETE_MODAL]: openDeleteModal,
  [CLOSE_DELETE_MODAL]: closeDeleteModal,
  [DELETE_EMPLOYEE_PAY_DETAIL_FAILED]: deleteEmployeeFailed,
  [DISMISS_ALERT]: dismissAlert,
};

const employeePayDetailReducer = createReducer(getDefaultState(), handlers);

export default employeePayDetailReducer;
