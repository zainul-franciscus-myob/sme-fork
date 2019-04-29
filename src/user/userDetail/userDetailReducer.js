import {
  CLOSE_MODAL,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  OPEN_MODAL, SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
  UPDATE_USER_DETAILS,
  UPDATE_USER_ROLES,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  modalType: '',
  businessId: '',
  userId: '',
  region: '',
  isPageEdited: false,
  user: {
    userName: '',
    email: '',
    roles: [],
    isOnlineAdministrator: false,
    isAdmin: false,
    isAdvisor: false,
    isReadOnly: false,
    isInactive: false,
  },
  isLoading: true,
  isSubmitting: false,
});

const resetState = () => (getDefaultState());

const pageEdited = { isPageEdited: true };

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const updateUserDetails = (state, action) => ({
  ...state,
  user: {
    ...state.user,
    [action.key]: action.value,
  },
  ...pageEdited,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const loadUserDetail = (state, action) => ({
  ...state,
  user: {
    ...state.user,
    ...action.user,
  },
  isLoading: false,
});

const updateUserRoles = (state, action) => ({
  ...state,
  user: {
    ...state.user,
    roles: state.user.roles.map(role => (
      role.id === action.key
        ? { ...role, selected: action.value }
        : role
    )),
  },
  isPageEdited: true,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [UPDATE_USER_DETAILS]: updateUserDetails,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [LOAD_NEW_USER_DETAIL]: loadUserDetail,
  [LOAD_NEW_ADVISOR_DETAIL]: loadUserDetail,
  [UPDATE_USER_ROLES]: updateUserRoles,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_USER_DETAIL]: loadUserDetail,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const userDetailReducer = createReducer(getDefaultState(), handlers);

export default userDetailReducer;
