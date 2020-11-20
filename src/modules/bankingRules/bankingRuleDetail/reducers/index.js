import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISPLAY_ALERT,
  LOAD_BANKING_RULE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BANKING_RULE,
  OPEN_MODAL,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  UPDATE_CONTACT,
  UPDATE_FORM,
} from '../BankingRuleDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  getIsCreating,
  getIsNoConditionRuleAllowed,
} from '../bankingRuleDetailSelectors';
import AutomatedRuleTypes from '../AutomatedRuleTypes';
import allocationHandlers from './allocationHandlers';
import conditionHandlers from './conditionHandlers';
import createReducer from '../../../../store/createReducer';
import getDefaultState from './getDefaultState';

const resetState = () => getDefaultState();

const setInitialState = (state, { context }) => {
  const {
    businessId,
    region,
    bankingRuleId,
    ruleType,
    isNoConditionRuleEnabled,
  } = context;

  return {
    ...getDefaultState(),
    businessId,
    bankingRuleId,
    region,
    ruleType: ruleType || state.ruleType,
    isNoConditionRuleEnabled,
  };
};

const buildLineJobOptions = ({ action, jobId }) =>
  action.bankingRule.jobs
    ? action.bankingRule.jobs.filter((job) => job.isActive || job.id === jobId)
    : [];

const getConditions = (isCreating, bankingRuleConditions) =>
  isCreating
    ? [
        {
          field: 'Description',
          predicates: [
            {
              matcher: 'Contains',
              value: '',
            },
          ],
        },
      ]
    : bankingRuleConditions;

const loadBankingRuleDetail = (state, action) => {
  const isCreating = getIsCreating(state);

  return {
    ...state,
    ...action.bankingRule,
    conditions: getConditions(isCreating, action.bankingRule.conditions),
    allocations: action.bankingRule.allocations.map((allocation) => ({
      ...allocation,
      lineJobOptions: buildLineJobOptions({ action, jobId: allocation.jobId }),
    })),
    newAllocationLine: {
      ...state.newAllocationLine,
      ...action.bankingRule.newAllocationLine,
      lineJobOptions: buildLineJobOptions({ action }),
    },
  };
};

const updateForm = (state, action) => {
  const updatedStated = {
    ...state,
    [action.key]: action.value,
  };

  if (action.key === 'allocationType') {
    return {
      ...updatedStated,
      allocations: [],
    };
  }

  if (action.key === 'ruleType') {
    return {
      ...updatedStated,
      automatedRuleType: getIsNoConditionRuleAllowed(updatedStated)
        ? state.automatedRuleType
        : AutomatedRuleTypes.AUTOMATED,
    };
  }

  return updatedStated;
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

const updateContact = (
  state,
  { key, value, contactType, isPaymentReportable }
) => {
  return {
    ...state,
    isPaymentReportable,
    contactType,
    [key]: value,
  };
};

const setViewedAccountToolTipState = (state, { viewedAccountToolTip }) => ({
  ...state,
  viewedAccountToolTip,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
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
  [UPDATE_CONTACT]: updateContact,
  [SET_VIEWED_ACCOUNT_TOOL_TIP_STATE]: setViewedAccountToolTipState,
  ...allocationHandlers,
  ...conditionHandlers,
};

const bankingRuleDetailReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleDetailReducer;
