import {
  CHANGE_STP_DECLARATION_NAME,
  CLOSE_STP_DECLARATION_MODAL,
  OPEN_STP_DECLARATION_MODAL,
  SET_STP_DECLARATION_ALERT_MESSAGE,
  SET_STP_DECLARATION_LOADING_STATE,
} from '../PayRunIntents';

export const getRecordPayRunDefaultState = () => ({
  stp: {
    name: '',
    isOpen: false,
    isLoading: false,
    alertMessage: '',
  },
});

const openStpDeclarationModal = state => ({
  ...state,
  stp: {
    ...state.stp,
    isOpen: true,
  },
});

const closeStpDeclarationModal = state => ({
  ...state,
  stp: {
    ...state.stp,
    isOpen: false,
  },
});

const setStpDeclarationModalLoadingState = (state, { isLoading }) => ({
  ...state,
  stp: {
    ...state.stp,
    isLoading,
  },
});

const changeStpDeclarationName = (state, { name }) => ({
  ...state,
  stp: {
    ...state.stp,
    name,
  },
});

const setStpDeclarationModalAlertMessage = (state, { alertMessage }) => ({
  ...state,
  stp: {
    ...state.stp,
    alertMessage,
  },
});

export const recordPayRunHandlers = {
  [OPEN_STP_DECLARATION_MODAL]: openStpDeclarationModal,
  [CLOSE_STP_DECLARATION_MODAL]: closeStpDeclarationModal,
  [SET_STP_DECLARATION_LOADING_STATE]: setStpDeclarationModalLoadingState,
  [CHANGE_STP_DECLARATION_NAME]: changeStpDeclarationName,
  [SET_STP_DECLARATION_ALERT_MESSAGE]: setStpDeclarationModalAlertMessage,
};
