import {
  CLOSE_DRAWER,
  TOGGLE_DRAWER,
} from './DrawerIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createDrawerDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  toggleDrawer: () => {
    store.dispatch({
      intent: TOGGLE_DRAWER,
    });
  },
  closeDrawer: () => {
    store.dispatch({
      intent: CLOSE_DRAWER,
    });
  },
});
export default createDrawerDispatcher;
