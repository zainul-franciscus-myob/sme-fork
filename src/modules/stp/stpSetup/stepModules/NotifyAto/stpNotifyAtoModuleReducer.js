import {
  CLOSE_CONFIRMATION_MODAL,
  GET_BUSINESS_SID,
  LOAD_CONTEXT,
  OPEN_CONFIRMATION_MODAL,
  SET_ALERT,
  SET_IS_LOADING,
} from './stpNotifyAtoIntents';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  sid: '',
});


const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const loadContext = (state, { context }) => ({
  ...state,
  businessId: context.businessId,
});

const getBusinessSid = (state, { sid }) => ({
  ...state,
  sid,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setShowConfirmationModalToOpen = state => ({
  ...state,
  showConfirmation: true,
});

const setShowConfirmationModalToClose = state => ({
  ...state,
  showConfirmation: false,
});

const handlers = {
  [LOAD_CONTEXT]: loadContext,
  [GET_BUSINESS_SID]: getBusinessSid,
  [SET_ALERT]: setAlert,
  [SET_IS_LOADING]: setIsLoading,
  [OPEN_CONFIRMATION_MODAL]: setShowConfirmationModalToOpen,
  [CLOSE_CONFIRMATION_MODAL]: setShowConfirmationModalToClose,
};

const stpNotifyAtoModuleReducer = createReducer(getDefaultState(), handlers);

export default stpNotifyAtoModuleReducer;
