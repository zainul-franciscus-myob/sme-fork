import {
  LOAD_BUSINESS_LIST,
  RESET_KEYWORD,
  SET_LOADING_STATE,
  UPDATE_KEYWORD,
  UPDATE_SORT_ORDER,
} from '../BusinessIntents';
import { RESET_STATE } from '../../../SystemIntents';

const getDefaultState = () => ({
  businesses: [],
  isLoading: true,
  keyword: '',
  sortOrder: 'asc',
});

const businessReducer = (state = getDefaultState(), action) => {
  switch (action.intent) {
    case RESET_STATE:
      return {
        ...getDefaultState(),
      };
    case LOAD_BUSINESS_LIST:
      return {
        ...state,
        businesses: action.businesses,
        isLoading: action.isLoading,
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        loadingState: action.loadingState,
      };
    case UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case RESET_KEYWORD:
      return {
        ...state,
        keyword: getDefaultState().keyword,
      };
    case UPDATE_SORT_ORDER:
      return {
        ...state,
        sortOrder: state.sortOrder === 'desc' ? 'asc' : 'desc',
      };
    default:
      return state;
  }
};

export default businessReducer;
