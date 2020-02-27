import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_ALERT,
  SET_EMPLOYEE_ETP,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID, SET_SELECTED_ETP, SET_SELECT_ALL_ETP,
} from './EtpIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: null,
  eventId: uuid(),
  employeeId: '',
  pays: [],
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

const setNewEventId = state => ({
  ...state,
  eventId: uuid(),
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setEmployee = (state, { response }) => ({
  ...state,
  ...response,
});

const setSelectedPay = (state, { pay, isSelected }) => ({
  ...state,
  pays: state.pays.map(p => (p.id === pay.id ? ({
    ...p,
    isSelected,
  }) : p)),
});

const setSelectAll = (state, { isSelected }) => ({
  ...state,
  pays: state.pays.map(p => ({
    ...p,
    isSelected,
  })),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_NEW_EVENT_ID]: setNewEventId,
  [SET_ALERT]: setAlert,
  [SET_EMPLOYEE_ETP]: setEmployee,
  [SET_SELECTED_ETP]: setSelectedPay,
  [SET_SELECT_ALL_ETP]: setSelectAll,
};

const etpReducer = createReducer(getDefaultState(), handlers);

export default etpReducer;
