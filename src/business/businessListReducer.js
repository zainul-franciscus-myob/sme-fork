import { LOAD_BUSINESS_LIST } from './businessIntents';

export default (state = { businesses: [] }, action) => {
  switch (action.intent) {
    case LOAD_BUSINESS_LIST:
      return { ...state, businesses: action.businesses };
    default:
      return state;
  }
};
