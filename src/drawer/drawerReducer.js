import {
  CLOSE_DRAWER, TOGGLE_DRAWER,
} from './DrawerIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  showDrawer: false,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const toggleDrawer = state => ({
  ...state,
  showDrawer: !state.showDrawer,
});

const closeDrawer = state => ({
  ...state,
  showDrawer: false,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [TOGGLE_DRAWER]: toggleDrawer,
  [CLOSE_DRAWER]: closeDrawer,
};

const drawerReducer = createReducer(getDefaultState(), handlers);

export default drawerReducer;
