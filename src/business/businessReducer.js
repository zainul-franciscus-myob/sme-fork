import BusinessIntents from './BusinessIntents';

const businessReducer = (state = { businesses: [], isLoading: true }, action) => {
  switch (action.intent) {
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
