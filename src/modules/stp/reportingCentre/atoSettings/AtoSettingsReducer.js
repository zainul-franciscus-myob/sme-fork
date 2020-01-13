import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_AGENT_CONTACT,
  SET_AGENT_DETAILS,
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_BUSINESS_DETAILS,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import States from '../../common/States';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isModalOpen: false,
  businessDetails: {
    abn: '',
    address1: '',
    address2: '',
    branch: '',
    city: '',
    country: '',
    businessName: '',
    postcode: '',
    state: '',
  },
  businessContact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  agentContact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  businessConnection: {
    abn: '',
    softwareId: '',
  },
  agentDetails: null,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsModalOpen = (state, { isModalOpen }) => ({
  ...state,
  isModalOpen,
});

const setBusinessDetails = (state, { key, value }) => ({
  ...state,
  businessDetails: {
    ...state.businessDetails,
    // If the user selects OTH state, the postcode should default to 9999.
    postcode: key === 'state' && value === States.OTH ? '9999' : state.businessDetails.postcode,
    [key]: value,
  },
});

const setBusinessContact = (state, { key, value }) => ({
  ...state,
  businessContact: {
    ...state.businessContact,
    [key]: value,
  },
});

const setAgentContact = (state, { key, value }) => ({
  ...state,
  agentContact: {
    ...state.agentContact,
    [key]: value,
  },
});

const setAtoSettings = (state, { response }) => ({
  ...state,
  ...response,
});

const setAgentDetails = (state, { agentDetails }) => ({
  ...state,
  ...agentDetails,
});

const handlers = ({
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setIsModalOpen,
  [SET_BUSINESS_DETAILS]: setBusinessDetails,
  [SET_BUSINESS_CONTACT]: setBusinessContact,
  [SET_AGENT_CONTACT]: setAgentContact,
  [SET_ATO_SETTINGS]: setAtoSettings,
  [SET_AGENT_DETAILS]: setAgentDetails,
});

const atoSettingsReducer = createReducer(getDefaultState(), handlers);

export default atoSettingsReducer;
