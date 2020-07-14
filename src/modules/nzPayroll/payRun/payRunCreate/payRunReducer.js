import {
  EMPLOYEE_PAY_LIST,
  PREPARE_PAYSLIPS,
  START_PAY_RUN,
} from './payRunSteps';
import {
  NEXT_STEP,
  SET_ALERT,
  SET_EMPLOYEE_PAYMENTS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  employeePayListHandlers,
  getEmployeePayListDefaultState,
} from './employeePayList/employeePayListReducer';
import {
  getStartPayRunDefaultState,
  startPayRunHandlers,
} from './startPayRun/startPayRunReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';
import wrapHandlers from '../../../../store/wrapHandlers';

const getDefaultState = () => ({
  payRunId: uuid(),
  loadingState: LoadingState.LOADING,
  step: START_PAY_RUN,
  isSubmitting: false,
  [START_PAY_RUN.key]: getStartPayRunDefaultState(),
  [EMPLOYEE_PAY_LIST.key]: getEmployeePayListDefaultState(),
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const nextStep = (state) => ({
  ...state,
  step: state.step.nextStep,
});

const setTotalTakeHomePay = (state, { totalTakeHomePay }) => ({
  ...state,
  totalTakeHomePay,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setEmployeePayments = (state, { response }) => ({
  ...state,
  [PREPARE_PAYSLIPS.key]: {
    ...state[PREPARE_PAYSLIPS.key],
    printPaySlipEmployees: response.printPaySlipEmployees,
  },
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_EMPLOYEE_PAYMENTS]: setEmployeePayments,
  [SET_TOTAL_TAKE_HOME_PAY]: setTotalTakeHomePay,
  [NEXT_STEP]: nextStep,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  ...wrapHandlers(START_PAY_RUN.key, startPayRunHandlers),
  ...wrapHandlers(EMPLOYEE_PAY_LIST.key, employeePayListHandlers),
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
