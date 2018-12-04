import FeatureListIntents from './FeatureListIntents';
import SystemIntents from '../SystemIntents';
import createReducer from '../store/createReducer';


const initialState = {
  alertMessage: '',
};

const resetState = () => (initialState);

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [FeatureListIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [SystemIntents.RESET_STATE]: resetState,
};

const featureListReducer = createReducer(initialState, handlers);
export default featureListReducer;
