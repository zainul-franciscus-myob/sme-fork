import {
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';

export const getAtoSettingsDefaultState = () => ({
  isLoading: false,
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

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
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
  [SET_LOADING_STATE]: setIsLoading,
  [SET_MODAL_STATE]: setIsModalOpen,
  [SET_BUSINESS_CONTACT]: setBusinessContact,
  [SET_ATO_SETTINGS]: setAtoSettings,
});
