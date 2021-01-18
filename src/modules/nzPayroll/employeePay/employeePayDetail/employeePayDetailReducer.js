import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

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
    isDeletable: false,
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_EMPLOYEE_PAY_DETAIL]: setEmployeePayDetails,
};

const employeePayDetailReducer = createReducer(getDefaultState(), handlers);

export default employeePayDetailReducer;
