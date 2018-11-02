import BusinessIntents from './BusinessIntents';
import SystemIntents from '../SystemIntents';

const initialState = { businesses: [], isLoading: true };

const businessReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case BusinessIntents.LOAD_BUSINESS_LIST:
      return { ...state, businesses: action.businesses, isLoading: action.isLoading };
    case BusinessIntents.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default businessReducer;
