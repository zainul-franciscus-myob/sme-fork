import {
  LOAD_EMPLOYEE_PAY_MODAL,
  SET_ALERT,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
  SET_INITIAL_MODAL_STATE,
  SET_IS_MODAL_LOADING,
  SET_MODAL_IS_OPEN,
} from './EmployeePayModalIntents';
import { RESET_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import uuid from '../../../common/uuid/uuid';

const getDefaultState = () => ({
  payrunId: uuid(),
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
    lines: [],
    isDeletable: false,
    isReversible: false,
    isReversalPreview: false,
    isPending: false,
    isRejected: false,
  },
  alert: '',
  loadingState: LoadingState.LOADING,
  isOpen: false,
  deletePopoverIsOpen: false,
  readonly: true,
  isUserStpRegistered: false,
});

const resetState = () => ({
  ...getDefaultState(),
});

const loadEmployeePayDetails = (state, { response }) => ({
  ...state,
  isUserStpRegistered: response.isUserStpRegistered,
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

const setAlertMessage = (state, { message }) => ({
  ...state,
  alert: message,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_EMPLOYEE_PAY_MODAL]: loadEmployeePayDetails,
  [SET_IS_MODAL_LOADING]: setModalLoadingState,
  [SET_DELETE_POPOVER_IS_OPEN]: setDeletePopoverIsOpen,
  [SET_INITIAL_MODAL_STATE]: setInitialState,
  [SET_MODAL_IS_OPEN]: setModalIsOpen,
  [SET_ALERT]: setAlertMessage,
  [SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL]: setEmployeePayReversalPreviewDetails,
};

const employeePayModalReducer = createReducer(getDefaultState(), handlers);

export default employeePayModalReducer;
