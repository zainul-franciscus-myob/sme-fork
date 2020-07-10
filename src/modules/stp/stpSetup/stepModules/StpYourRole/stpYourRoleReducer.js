import {
  LOAD_AGENT_CONTACT_INFO,
  SET_ERROR_MESSAGE,
  SET_FIELD,
  SET_LOADING_STATE,
} from './stpYourRoleIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import Role from '../../Role';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  isLoading: false,
  role: Role.SOMEONE_FROM_THE_BUSINESS,
  agentAbn: '',
  agentNumber: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  showContactDetails: false,
  showAlert: false,
  errorMessage: '',
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setField = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const setErrorMessage = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
});

const loadAgentContactInfo = (state, { contactInfo }) => ({
  ...state,
  firstName: contactInfo.firstName,
  lastName: contactInfo.lastName,
  phone: contactInfo.phone,
  email: contactInfo.email,
  showContactDetails: true,
  showAlert: contactInfo.contactFound,
  errorMessage: '',
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const handlers = {
  [SET_FIELD]: setField,
  [LOAD_AGENT_CONTACT_INFO]: loadAgentContactInfo,
  [SET_ERROR_MESSAGE]: setErrorMessage,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
};

const stpYourRoleReducer = createReducer(getDefaultState(), handlers);

export default stpYourRoleReducer;
