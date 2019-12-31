import { LOAD_AGENT_CONTACT_INFO, SET_ERROR_MESSAGE, SET_FIELD } from './stpYourRoleIntents';
import Role from './Role';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
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

const handlers = {
  [SET_FIELD]: setField,
  [LOAD_AGENT_CONTACT_INFO]: loadAgentContactInfo,
  [SET_ERROR_MESSAGE]: setErrorMessage,
};

const stpYourRoleReducer = createReducer(getDefaultState(), handlers);

export default stpYourRoleReducer;
