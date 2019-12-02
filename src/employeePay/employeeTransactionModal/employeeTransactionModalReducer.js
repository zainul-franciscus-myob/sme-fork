import {
  LOAD_EMPLOYEE_PAY_DETAIL,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_INITIAL_MODAL_STATE,
  SET_IS_MODAL_LOADING,
  SET_MODAL_IS_OPEN,
} from './EmployeeTransactionModalIntents';
import createReducer from '../../store/createReducer';

const getTransactionModalDefaultState = () => ({
  employeeName: '',
  transactionId: '',
  businessId: '',
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
  isOpen: false,
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
  ...getTransactionModalDefaultState(),
  ...action.context,
});

const setDeletePopoverIsOpen = (state, { deletePopoverIsOpen }) => ({
  ...state,
  deletePopoverIsOpen,
});

const setModalIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const employeeTransactionModalHandlers = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: loadEmployeePayDetails,
  [SET_IS_MODAL_LOADING]: setModalLoadingState,
  [SET_DELETE_POPOVER_IS_OPEN]: setDeletePopoverIsOpen,
  [SET_INITIAL_MODAL_STATE]: setInitialState,
  [SET_MODAL_IS_OPEN]: setModalIsOpen,
};

const employeeTransactionModalReducer = createReducer(
  getTransactionModalDefaultState(),
  employeeTransactionModalHandlers,
);

export default employeeTransactionModalReducer;
