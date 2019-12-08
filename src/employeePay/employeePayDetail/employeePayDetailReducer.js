import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  businessId: '',
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
    parentBusinessEventId: 0,
    payPeriodStart: '',
    payPeriodEnd: '',
    paymentMethod: '',
    referenceNumber: '',
    totalNetPayment: '',
    transactionDesc: '',
  },
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
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
