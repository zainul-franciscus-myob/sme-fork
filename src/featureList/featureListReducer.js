import FeatureListIntents from './FeatureListIntents';
import SystemIntents from '../SystemIntents';

const initialState = {
  alertMessage: '',
};

const featureListReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case FeatureListIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    default:
      return state;
  }
};

export default featureListReducer;
