import {
  LOAD_JOB_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB_DETAILS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  customerOptions: [],
  detail: {
    number: '',
    name: '',
    customerId: '',
    isInactive: false,
    description: '',
  },
  isOpen: false,
  isLoading: false,
  isSubmitting: false,
  alertMessage: '',
  businessId: '',
  region: '',
});

const setInitialState = (state, action) => ({
  ...getDefaultState(),
  ...action.context,
  isOpen: true,
});

const resetState = () => getDefaultState();

const loadNewJobModal = (state, action) => ({
  ...state,
  detail: {
    ...state.detail,
    ...action.detail,
  },
  customerOptions: action.customerOptions,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const updateJobDetails = (state, action) => ({
  ...state,
  detail: {
    ...state.detail,
    [action.key]: action.value,
  },
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_JOB_MODAL]: loadNewJobModal,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_JOB_DETAILS]: updateJobDetails,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlertMessage,
  [SET_INITIAL_STATE]: setInitialState,
};

const jobModalReducer = createReducer(getDefaultState(), handlers);

export default jobModalReducer;
