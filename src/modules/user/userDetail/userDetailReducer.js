import {
  CLOSE_MODAL,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_USER_DETAILS,
  UPDATE_USER_ROLES,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import RoleTypes from '../../../common/types/RoleTypes';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  modal: undefined,
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
    userType: '',
    newUserType: 'FileUser',
    inviteeFirstName: '',
    inviteeLastName: '',
  },
  currentUser: {
    userType: '',
    onlineUserId: '',
    identityGuid: '',
  },
  isCurrentUserOnlineAdmin: false,
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  alertMessage: '',
  serialNumber: '',
  showAccessMessage: false,
});

const resetState = () => getDefaultState();

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
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const loadUserDetail = (
  state,
  {
    user,
    currentUser,
    isCurrentUserOnlineAdmin,
    serialNumber,
    showAccessMessage,
  }
) => ({
  ...state,
  user: {
    ...state.user,
    ...user,
  },
  currentUser: {
    ...state.currentUser,
    ...currentUser,
  },
  isCurrentUserOnlineAdmin,
  serialNumber,
  showAccessMessage,
});

const updateUserRoles = (state, action) => {
  const { type } = state.user.roles.find(({ id }) => id === action.key) || {
    type: RoleTypes.CUSTOM,
  };

  const isReadOnly =
    type === RoleTypes.ADMINISTRATOR && action.value === true
      ? false
      : state.user.isReadOnly;

  return {
    ...state,
    user: {
      ...state.user,
      roles: state.user.roles.map((role) =>
        role.id === action.key ? { ...role, selected: action.value } : role
      ),
      isReadOnly,
    },
    isPageEdited: true,
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
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
