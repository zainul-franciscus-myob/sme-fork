import BusinessIntents from './BusinessIntents';

const businessReducer = (state = { businesses: [] }, action) => {
  switch (action.intent) {
    case BusinessIntents.LOAD_BUSINESS_LIST:
      return { ...state, businesses: action.businesses };
    default:
      return state;
  }
};

export default businessReducer;
