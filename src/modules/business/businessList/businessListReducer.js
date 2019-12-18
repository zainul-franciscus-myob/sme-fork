import {
  LOAD_BUSINESS_LIST,
  SET_LOADING_STATE,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../../SystemIntents';

const getDefaultState = () => ({ businesses: [], isLoading: true });

const businessReducer = (state = getDefaultState(), action) => {
  switch (action.intent) {
    case RESET_STATE:
      return {
        ...getDefaultState(),
      };
    case LOAD_BUSINESS_LIST:
      return { ...state, businesses: action.businesses, isLoading: action.isLoading };
    case SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default businessReducer;
