import uuid from 'uuid/v4';

import {
  CLOSE_MODAL,
  NEXT_STEP,
  OPEN_MODAL,
  PREVIOUS_STEP,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_NET_PAY,
} from './PayRunIntents';
import {
  EMPLOYEE_PAY_LIST,
  START_PAY_RUN,
} from './payRunSteps';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  employeePayListHandlers,
  getEmployeePayListDefaultState,
} from './employeePayList/employeePayListReducer';
import { getStartPayRunDefaultState, startPayRunHandlers } from './startPayRun/startPayRunReducer';
import createReducer from '../../store/createReducer';
import wrapHandlers from '../../store/wrapHandlers';

const getDefaultState = () => ({
  payRunId: uuid(),
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  step: 0,
  modal: undefined,
  [START_PAY_RUN]: getStartPayRunDefaultState(),
  [EMPLOYEE_PAY_LIST]: getEmployeePayListDefaultState(),
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

const openModal = (state, { type }) => ({
  ...state,
  modal: {
    type,
  },
});

const closeModal = state => ({
  ...state,
  modal: undefined,
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [NEXT_STEP]: nextStep,
  [PREVIOUS_STEP]: previousStep,
  [SET_TOTAL_NET_PAY]: setTotalNetPay,
  ...wrapHandlers(START_PAY_RUN, startPayRunHandlers),
  ...wrapHandlers(EMPLOYEE_PAY_LIST, employeePayListHandlers),
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
