import * as views from './drawerViews';
import {
  CLOSE_DRAWER, TOGGLE_ACTIVITIES, TOGGLE_HELP,
} from './drawerIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createDrawerDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  closeDrawer: () => {
    const intent = CLOSE_DRAWER;
    store.dispatch({ intent, view: null });
  },
  toggleActivities: () => {
    const intent = TOGGLE_ACTIVITIES;
    store.dispatch({ intent, view: views.ACTIVITIES });
  },
  toggleHelp: () => {
    const intent = TOGGLE_HELP;
    store.dispatch({ intent, view: views.HELP });
  },
});

export default createDrawerDispatcher;
