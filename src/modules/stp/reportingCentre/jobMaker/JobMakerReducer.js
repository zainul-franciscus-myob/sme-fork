import {
  SET_DROPDOWN_ACTION,
  SET_DROPDOWN_ACTION_EMPLOYEE,
  SET_INITIAL_STATE,
  SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL,
  SET_JOB_MAKER_INITIAL,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
} from './JobMakerIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isDirty: false,
  employees: [],
  currentPayrollYearLabel: '',
  currentPeriodDetails: {
    period: '',
    periodStart: '',
    periodEnd: '',
    claimStart: '',
    claimBestBefore: '',
    claimEnd: '',
  },
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsShowingJobMakerActionModal = (
  state,
  { isShowingJobMakerActionModal }
) => ({ ...state, isShowingJobMakerActionModal });

const setJobMakerInitial = (state, { response }) => ({
  ...state,
  ...response,
});
const setNewEventId = (state) => ({
  ...state,
  eventId: uuid(),
});
const setDropdownActionEmployee = (state, { employee }) => ({
  ...state,
  dropDownActionEmployee: { ...employee },
});
const setDropdownAction = (state, { action }) => ({
  ...state,
  dropDownAction: action,
});
const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_JOB_MAKER_INITIAL]: setJobMakerInitial,
  [SET_NEW_EVENT_ID]: setNewEventId,
  [SET_DROPDOWN_ACTION_EMPLOYEE]: setDropdownActionEmployee,
  [SET_DROPDOWN_ACTION]: setDropdownAction,
  [SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL]: setIsShowingJobMakerActionModal,
};

const jobMakerReducer = createReducer(getDefaultState(), handlers);

export default jobMakerReducer;
