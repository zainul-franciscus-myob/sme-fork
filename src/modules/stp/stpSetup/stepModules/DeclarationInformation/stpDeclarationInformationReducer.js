import {
  LOAD_BUSINESS_CONTACT_INFORMATION, LOAD_CONTEXT, SET_ALERT, SET_FIELD, SET_IS_LOADING,
} from './StpDeclarationInformationIntents';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  isLoading: false,
  businessContactInformationWasFound: false,
  payerAbn: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  alert: null,
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const loadBusinessContactInformation = (state, { businessContactInformation }) => ({
  ...state,
  ...businessContactInformation,
});

const setFieldValue = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const loadContext = (state, { context }) => ({
  ...state,
  ...context,
});

const handlers = {
  [SET_IS_LOADING]: setIsLoading,
  [SET_FIELD]: setFieldValue,
  [LOAD_BUSINESS_CONTACT_INFORMATION]: loadBusinessContactInformation,
  [SET_ALERT]: setAlert,
  [LOAD_CONTEXT]: loadContext,
};

const stpDeclarationInformationReducer = createReducer(getDefaultState(), handlers);

export default stpDeclarationInformationReducer;
