import {
  CLOSE_DISCARD_MODAL,
  CLOSE_PREVIOUS_STEP_MODAL,
  CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
  CREATE_DRAFT_PAY_RUN_FAILED,
  CREATE_DRAFT_PAY_RUN_SUCCESS,
  LOAD_PAYDAY_ONBOARDED_STATUS,
  LOAD_PAYROLL_VERIFICATION_REPORT,
  LOAD_PAYROLL_VERIFICATION_REPORT_FAILED,
  LOAD_PAYROLL_VERIFICATION_REPORT_SUCCESS,
  NEXT_STEP,
  OPEN_DISCARD_AND_REDIRECT_MODAL,
  OPEN_PREVIOUS_STEP_MODAL,
  OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
  PREVIOUS_STEP,
  RESTART_PAY_RUN,
  SET_ALERT,
  SET_DRAFT_PAY_RUN_ID,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
} from './PayRunIntents';
import { DRAFT_PAY_RUN, PAY_RUN_STEPS, START_PAY_RUN } from './payRunSteps';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  draftPayRunHandlers,
  getDraftPayRunDefaultState,
} from './draftPayRun/draftPayRunReducer';
import {
  getStartPayRunDefaultState,
  startPayRunHandlers,
} from './startPayRun/startPayRunReducer';
import AlertType from './types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import wrapHandlers from '../../../../store/wrapHandlers';

const getDefaultState = () => ({
  draftPayRunId: -1,
  loadingState: LoadingState.LOADING,
  step: START_PAY_RUN,
  isSubmitting: false,
  [START_PAY_RUN.key]: getStartPayRunDefaultState(),
  [DRAFT_PAY_RUN.key]: getDraftPayRunDefaultState(),
  previousStepModalIsOpen: false,
  totalTakeHomePay: undefined,
  alert: undefined,
  payDayOnboardedStatus: { isBusinessOnboarded: false, isUserOnboarded: false },
  recordPayRunIRFileModal: false,
});

const resetState = () => ({ ...getDefaultState() });

const restartPayRun = (state) => ({
  ...state,
  ...getDefaultState(),
});

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
  step: PAY_RUN_STEPS.find((step) => step.key === state.step.nextStepKey),
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

const setDraftPayRunId = (state, { createdDraftPayRun }) => ({
  ...state,
  draftPayRunId: createdDraftPayRun.draftPayRunId,
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const previousStep = (state) => ({
  ...state,
  step: PAY_RUN_STEPS.find((step) => step.key === state.step.previousStepKey),
});

const openDiscardModal = (state) => ({
  ...state,
  discardModalIsOpen: true,
});

const closeDiscardModal = (state) => ({
  ...state,
  discardModalIsOpen: false,
});

const openPreviousStepModal = (state) => ({
  ...state,
  previousStepModalIsOpen: true,
});

const closePreviousStepModal = (state) => ({
  ...state,
  previousStepModalIsOpen: false,
});

const loadPayrollVerificationReport = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING,
});

const loadPayrollVerificationReportSuccess = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
});

const loadPayrollVerificationReportFailed = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  alert: {
    type: AlertType.ERROR,
    message: 'Failed to load payroll verification report',
  },
});

const createDraftPayrunFailed = (state, { message }) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  alert: {
    type: AlertType.ERROR,
    message,
  },
});

const createDraftPayrunSuccess = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  alert: undefined,
});

const loadPayDayOnboardedStatus = (state, { payDayOnboardedStatus }) => ({
  ...state,
  payDayOnboardedStatus,
});

const openRecordPayRunIRFileModal = (state) => ({
  ...state,
  recordPayRunIRFileModal: true,
});

const closeRecordPayRunIRFileModal = (state) => ({
  ...state,
  recordPayRunIRFileModal: false,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TOTAL_TAKE_HOME_PAY]: setTotalTakeHomePay,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [NEXT_STEP]: nextStep,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_DRAFT_PAY_RUN_ID]: setDraftPayRunId,
  [PREVIOUS_STEP]: previousStep,
  [OPEN_DISCARD_AND_REDIRECT_MODAL]: openDiscardModal,
  [CLOSE_DISCARD_MODAL]: closeDiscardModal,
  [OPEN_PREVIOUS_STEP_MODAL]: openPreviousStepModal,
  [CLOSE_PREVIOUS_STEP_MODAL]: closePreviousStepModal,
  [RESTART_PAY_RUN]: restartPayRun,
  [LOAD_PAYROLL_VERIFICATION_REPORT]: loadPayrollVerificationReport,
  [LOAD_PAYROLL_VERIFICATION_REPORT_SUCCESS]: loadPayrollVerificationReportSuccess,
  [LOAD_PAYROLL_VERIFICATION_REPORT_FAILED]: loadPayrollVerificationReportFailed,
  [CREATE_DRAFT_PAY_RUN_SUCCESS]: createDraftPayrunSuccess,
  [CREATE_DRAFT_PAY_RUN_FAILED]: createDraftPayrunFailed,
  ...wrapHandlers(START_PAY_RUN.key, startPayRunHandlers),
  ...wrapHandlers(DRAFT_PAY_RUN.key, draftPayRunHandlers),
  [OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL]: openRecordPayRunIRFileModal,
  [CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL]: closeRecordPayRunIRFileModal,
  [LOAD_PAYDAY_ONBOARDED_STATUS]: loadPayDayOnboardedStatus,
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
