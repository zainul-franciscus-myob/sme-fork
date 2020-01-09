import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isModalOpen: false,
  businessContact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  businessConnection: {
    abn: '',
    softwareId: '',
  },
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

const setBusinessContact = (state, { key, value }) => ({
  ...state,
  businessContact: {
    ...state.businessContact,
    [key]: value,
  },
});

const setAtoSettings = (state, { response }) => ({
  ...state,
  ...response,
});

const handlers = ({
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setIsModalOpen,
  [SET_BUSINESS_CONTACT]: setBusinessContact,
  [SET_ATO_SETTINGS]: setAtoSettings,
});

const atoSettingsReducer = createReducer(getDefaultState(), handlers);

export default atoSettingsReducer;
