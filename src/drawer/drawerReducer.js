import * as views from './drawerViews';
import {
  CLOSE_DRAWER,
  TOGGLE_HELP,
  TOGGLE_HELP_ON,
  TOGGLE_TASKS,
} from './drawerIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  drawerView: null,
});

const setInitialState = (state, action) => ({
  ...getDefaultState(),
  ...action.context,
});

const resetState = getDefaultState;

const toggleDrawer = (state, action) => {
  const drawerView = action.view;
  if (drawerView == null || (state.isOpen && state.drawerView === drawerView)) {
    return {
      ...state,
      isOpen: false,
    };
  }
  return {
    ...state,
    drawerView,
    isOpen: true,
  };
};

const toggleHelpOn = (state) => ({
  ...state,
  isOpen: true,
  drawerView: views.HELP,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [CLOSE_DRAWER]: toggleDrawer,
  [TOGGLE_TASKS]: toggleDrawer,
  [TOGGLE_HELP]: toggleDrawer,
  [TOGGLE_HELP_ON]: toggleHelpOn,
};

const drawerReducer = createReducer(getDefaultState(), handlers);

export default drawerReducer;
