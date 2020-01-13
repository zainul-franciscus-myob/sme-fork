import {
  LOAD_EMPLOYEE_PAY_MODAL,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_INITIAL_MODAL_STATE,
  SET_IS_MODAL_LOADING,
  SET_MODAL_IS_OPEN,
} from './EmployeePayModalIntents';
import { RESET_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  employeeName: '',
  transactionId: '',
  businessId: '',
  region: '',
  employeePay: {
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
  loadingState: LoadingState.LOADING,
  isOpen: false,
  deletePopoverIsOpen: false,
});

const resetState = () => ({
  ...getDefaultState(),
});

const loadEmployeePayDetails = (state, { response }) => ({
  ...state,
  employeePay: {
    ...state.employeePay,
    ...response,
  },
});

const setModalLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const setModalIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_EMPLOYEE_PAY_MODAL]: loadEmployeePayDetails,
  [SET_IS_MODAL_LOADING]: setModalLoadingState,
  [SET_DELETE_POPOVER_IS_OPEN]: setDeletePopoverIsOpen,
  [SET_INITIAL_MODAL_STATE]: setInitialState,
  [SET_MODAL_IS_OPEN]: setModalIsOpen,
};

const employeePayModalReducer = createReducer(getDefaultState(), handlers);

export default employeePayModalReducer;
