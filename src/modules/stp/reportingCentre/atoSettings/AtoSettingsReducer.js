import {
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';
import LoadingState from '../../../../components/PageView/LoadingState';

export const getAtoSettingsDefaultState = () => ({
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

export const atoSettingsHandlers = ({
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setIsModalOpen,
  [SET_BUSINESS_CONTACT]: setBusinessContact,
  [SET_ATO_SETTINGS]: setAtoSettings,
});
