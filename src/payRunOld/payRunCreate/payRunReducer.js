import uuid from 'uuid/v4';

import {
  CLOSE_PREVIOUS_STEP_MODAL,
  NEXT_STEP,
  OPEN_PREVIOUS_STEP_MODAL,
  PREVIOUS_STEP,
  SET_ALERT,
  SET_EMPLOYEE_PAYMENTS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_NET_PAY,
} from './PayRunIntents';
import {
  EMPLOYEE_PAY_LIST,
  PREPARE_PAY_SLIPS,
  RECORD_PAY_RUN,
  START_PAY_RUN,
} from './payRunSteps';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  employeePayListHandlers,
  getEmployeePayListDefaultState,
} from './employeePayList/employeePayListReducer';
import {
  getPreparePaySlipsDefaultState,
  preparePaySlipsHandlers,
} from './preparePaySlips/preparePaySlipsReducer';
import {
  getRecordPayRunDefaultState,
  recordPayRunHandlers,
} from './recordPayRun/recordPayRunReducer';
import {
  getStartPayRunDefaultState,
  startPayRunHandlers,
} from './startPayRun/startPayRunReducer';
import createReducer from '../../store/createReducer';
import wrapHandlers from '../../store/wrapHandlers';

const getDefaultState = () => ({
  payRunId: uuid(),
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  step: 0,
  previousStepModalIsOpen: false,
  recordedPayments: {
    printPaySlipEmployees: [],
    emailPaySlipEmployees: [],
  },
  [START_PAY_RUN]: getStartPayRunDefaultState(),
  [EMPLOYEE_PAY_LIST]: getEmployeePayListDefaultState(),
  [RECORD_PAY_RUN]: getRecordPayRunDefaultState(),
  [PREPARE_PAY_SLIPS]: getPreparePaySlipsDefaultState(),
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openPreviousStepModal = state => ({
  ...state,
  previousStepModalIsOpen: true,
});

const closePreviousStepModal = state => ({
  ...state,
  previousStepModalIsOpen: false,
});

const nextStep = state => ({
  ...state,
  step: state.step + 1,
});

const previousStep = state => ({
  ...state,
  step: state.step - 1,
});

const setTotalNetPay = (state, { totalNetPay }) => ({
  ...state,
  totalNetPay,
});

const setEmployeePayments = (state, { response }) => ({
  ...state,
  [PREPARE_PAY_SLIPS]: {
    ...state[PREPARE_PAY_SLIPS],
    printPaySlipEmployees: response.printPaySlipEmployees,
    emailPaySlipEmployees: response.emailPaySlipEmployees.map(employee => (
      { ...employee, isSelected: true }
    )),
    emailSettings: response.emailSettings,
  },
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_PREVIOUS_STEP_MODAL]: openPreviousStepModal,
  [CLOSE_PREVIOUS_STEP_MODAL]: closePreviousStepModal,
  [NEXT_STEP]: nextStep,
  [PREVIOUS_STEP]: previousStep,
  [SET_TOTAL_NET_PAY]: setTotalNetPay,
  [SET_EMPLOYEE_PAYMENTS]: setEmployeePayments,
  ...wrapHandlers(START_PAY_RUN, startPayRunHandlers),
  ...wrapHandlers(EMPLOYEE_PAY_LIST, employeePayListHandlers),
  ...wrapHandlers(RECORD_PAY_RUN, recordPayRunHandlers),
  ...wrapHandlers(PREPARE_PAY_SLIPS, preparePaySlipsHandlers),
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;