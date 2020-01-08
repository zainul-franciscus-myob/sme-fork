import {
  GET_BUSINESS_SID,
  LOAD_CONTEXT,
  SET_ALERT,
  SET_IS_LOADING,
} from './stpNotifyAtoIntents';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  businessSid: '',
});


const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const loadContext = (state, { context }) => ({
  ...state,
  businessId: context.businessId,
});

const getBusinessSid = (state, { businessSid }) => ({
  ...state,
  businessSid,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const handlers = {
  [LOAD_CONTEXT]: loadContext,
  [GET_BUSINESS_SID]: getBusinessSid,
  [SET_ALERT]: setAlert,
  [SET_IS_LOADING]: setIsLoading,
};

const stpNotifyAtoModuleReducer = createReducer(getDefaultState(), handlers);

export default stpNotifyAtoModuleReducer;
