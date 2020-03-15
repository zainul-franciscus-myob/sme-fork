import {
  LOAD_JOB_MODAL,
  SET_ALERT,
  SET_JOB_MODAL_DETAILS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  alert: undefined,
  isOpen: false,
  isLoading: true,
  isSubmitting: false,
  job: {
    id: '',
    name: '',
    displayId: '',
    isActive: true,
    customerId: '',
    isHeader: false,
    description: '',
  },
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();

  return ({
    ...defaultState,
    businessId: context.businessId,
    region: context.region,
    isOpen: true,
    job: {
      ...defaultState.job,
    },
  });
};

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const loadJobModal = (state, action) => ({
  ...state,
  job: {
    ...state.job,
    ...action.job,
  },
});

const setJobModalDetails = (state, { key, value }) => ({
  ...state,
  job: {
    ...state.job,
    [key]: value,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [LOAD_JOB_MODAL]: loadJobModal,
  [SET_JOB_MODAL_DETAILS]: setJobModalDetails,
};

export default createReducer(getDefaultState(), handlers);
