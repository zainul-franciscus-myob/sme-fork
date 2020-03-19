import {
  CLOSE_MODAL,
  LOAD_JOB_DETAIL,
  LOAD_NEW_JOB,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB_DETAILS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  job: {
    id: '',
    name: '',
    number: '',
    isInactive: false,
    customerId: '',
    isHeader: false,
    description: '',
  },
  customerOptions: [],
  isCreating: false,
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  modalType: '',
  alertMessage: '',
  isPageEdited: false,
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());
const pageEdited = { isPageEdited: true };

const loadJobDetail = (state, action) => ({
  ...state,
  job: {
    ...state.job,
    ...action.job,
  },
  customerOptions: action.customerOptions,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const updateJobDetails = (state, action) => ({
  ...state,
  job: {
    ...state.job,
    [action.key]: action.value,
  },
  ...pageEdited,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});


const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_NEW_JOB]: loadJobDetail,
  [LOAD_JOB_DETAIL]: loadJobDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_JOB_DETAILS]: updateJobDetails,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_INITIAL_STATE]: setInitialState,
};

const jobDetailReducer = createReducer(getDefaultState(), handlers);

export default jobDetailReducer;
