import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
} from '../SuperFundIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({

});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
  superFund: action.superFund,
  superProducts: action.superProducts,
  electronicServiceAddresses: action.electronicServiceAddresses,
});

const resetState = () => (getDefaultState());

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
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const superFundSelfManagedReducer = createReducer(getDefaultState(), handlers);

export default superFundSelfManagedReducer;
