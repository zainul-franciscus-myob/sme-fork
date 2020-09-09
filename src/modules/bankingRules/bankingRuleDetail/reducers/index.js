import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISPLAY_ALERT,
  LOAD_BANKING_RULE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BANKING_RULE,
  OPEN_MODAL,
  SET_CONTACT_TYPE,
  SET_IS_PAGE_EDITED,
  SET_IS_PAYMENT_REPORTABLE,
  SET_LOADING_STATE,
  START_LOAD_CONTACT,
  STOP_LOAD_CONTACT,
  UPDATE_FORM,
} from '../BankingRuleDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import allocationHandlers from './allocationHandlers';
import conditionHandlers from './conditionHandlers';
import createReducer from '../../../../store/createReducer';
import getDefaultState from './getDefaultState';

const resetState = () => getDefaultState();

const setInitalState = (state, action) => ({
  ...getDefaultState(),
  businessId: action.context.businessId,
  bankingRuleId: action.context.bankingRuleId,
  region: action.context.region,
  ruleType: action.context.ruleType ? action.context.ruleType : state.ruleType,
});

const buildLineJobOptions = ({ action, jobId }) =>
  action.bankingRule.jobs
    ? action.bankingRule.jobs.filter((job) => job.isActive || job.id === jobId)
    : [];

const loadBankingRuleDetail = (state, action) => ({
  ...state,
  ...action.bankingRule,
  allocations: action.bankingRule.allocations.map((allocation) => ({
    ...allocation,
    lineJobOptions: buildLineJobOptions({ action, jobId: allocation.jobId }),
  })),
  newAllocationLine: {
    ...state.newAllocationLine,
    ...action.bankingRule.newAllocationLine,
    lineJobOptions: buildLineJobOptions({ action }),
  },
});

const updateForm = (state, action) => {
  if (action.key === 'allocationType') {
    return {
      ...state,
      [action.key]: action.value,
      allocations: [],
    };
  }

  return {
    ...state,
    [action.key]: action.value,
  };
};

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const displayAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const dismissAlert = (state) => ({
  ...state,
  alert: undefined,
});

const setIsPagedEdited = (state) => ({
  ...state,
  isPageEdited: true,
});

const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  allocations: state.allocations.map((allocation) => ({
    ...allocation,
    lineJobOptions: [job, ...allocation.lineJobOptions],
  })),
  newAllocationLine: {
    ...state.newAllocationLine,
    lineJobOptions: [job, ...state.newAllocationLine.lineJobOptions],
  },
  isPageEdited: true,
});

const setContactType = (state, { contactType }) => {
  return {
    ...state,
    contactType,
  };
};

const setIsPaymentReportable = (state, { isPaymentReportable }) => {
  return {
    ...state,
    isPaymentReportable,
  };
};

const startLoadContact = (state) => {
  return {
    ...state,
    isContactLoading: true,
  };
};

const stopLoadContact = (state) => {
  return {
    ...state,
    isContactLoading: false,
  };
};

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitalState,
  [SET_LOADING_STATE]: setLoadingState,
  [CLOSE_MODAL]: closeModal,
  [OPEN_MODAL]: openModal,
  [DISPLAY_ALERT]: displayAlert,
  [DISMISS_ALERT]: dismissAlert,
  [SET_IS_PAGE_EDITED]: setIsPagedEdited,
  [UPDATE_FORM]: updateForm,
  [LOAD_NEW_BANKING_RULE]: loadBankingRuleDetail,
  [LOAD_BANKING_RULE]: loadBankingRuleDetail,
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_CONTACT_TYPE]: setContactType,
  [SET_IS_PAYMENT_REPORTABLE]: setIsPaymentReportable,
  [START_LOAD_CONTACT]: startLoadContact,
  [STOP_LOAD_CONTACT]: stopLoadContact,
  ...allocationHandlers,
  ...conditionHandlers,
};

const bankingRuleDetailReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleDetailReducer;
