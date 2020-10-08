import * as views from './drawerViews';
import {
  CLOSE_DRAWER,
  TOGGLE_HELP,
  TOGGLE_HELP_ON,
  TOGGLE_TASKS,
} from './drawerIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createDrawerDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  closeDrawer: () => {
    const intent = CLOSE_DRAWER;
    store.dispatch({ intent, view: null });
  },
  toggleTasks: () => {
    const intent = TOGGLE_TASKS;
    store.dispatch({ intent, view: views.TASKS });
  },
  toggleHelp: () => {
    const intent = TOGGLE_HELP;
    store.dispatch({ intent, view: views.HELP });
  },
  toggleHelpOn: () => {
    const intent = TOGGLE_HELP_ON;
    store.dispatch({ intent });
  },
});

export default createDrawerDispatcher;
