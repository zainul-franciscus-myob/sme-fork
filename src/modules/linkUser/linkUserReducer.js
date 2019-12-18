import {
  DISMISS_ALERT,
  LOAD_BUSINESS_INFORMATION,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_USER_INFORMATION,
} from './LinkUserIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  businessName: '',
  userEmail: '',
  userId: '',
  password: '',
  isLoading: false,
  alertMessage: '',
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const loadBusinessInformation = (state, action) => ({
  ...state,
  ...action.businessInformation,
});

const updateUserInformation = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const setAlert = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const dismissAlert = state => ({
  ...state,
  alertMessage: '',
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,
  [DISMISS_ALERT]: dismissAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_BUSINESS_INFORMATION]: loadBusinessInformation,
  [UPDATE_USER_INFORMATION]: updateUserInformation,
};

const linkUserReducer = createReducer(getDefaultState(), handlers);

export default linkUserReducer;
