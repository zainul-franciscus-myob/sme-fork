import {
  LOAD_EMPLOYEE_PAY_DETAIL,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_IS_MODAL_LOADING,
} from './EmployeeTransactionModalIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const getDefaultState = () => ({
  employeeName: '',
  transactionId: '',
  businessId: '',
  payRunId: '',
  employeeDetails: {
    employeeName: '',
    paymentMethod: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    dateOfPayment: '',
    referenceNumber: '',
    account: '',
    balance: '',
    employeeBankStatementDesc: '',
    transactionDesc: '',
  },
  isLoading: true,
  deletePopoverIsOpen: false,
});

const loadEmployeePayDetails = (state, action) => ({
  ...state,
  employeeDetails: {
    ...state.employeeDetails,
    ...action.employeeDetails,
  },
});

const setModalLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...getDefaultState(),
  ...action.context,
});

const setDeletePopoverIsOpen = (state, { deletePopoverIsOpen }) => ({
  ...state,
  deletePopoverIsOpen,
});

export default {
  [LOAD_EMPLOYEE_PAY_DETAIL]: loadEmployeePayDetails,
  [SET_IS_MODAL_LOADING]: setModalLoadingState,
  [SET_DELETE_POPOVER_IS_OPEN]: setDeletePopoverIsOpen,
  [SET_INITIAL_STATE]: setInitialState,
};
