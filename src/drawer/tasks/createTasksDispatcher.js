import {
  CLOSE_INTRO_MODAL,
  CLOSE_REPORTING_MODAL,
  OPEN_INTRO_MODAL,
  OPEN_REPORTING_MODAL,
  SET_ACTIVE_STATE,
  SET_LOADING_STATE,
} from './TasksIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createTasksDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setActiveState: (isActive) => {
    store.dispatch({
      intent: SET_ACTIVE_STATE,
      isActive,
    });
  },
  openIntroModal: () => {
    store.dispatch({
      intent: OPEN_INTRO_MODAL,
      introModal: { isOpen: true },
    });
  },
  closeIntroModal: () => {
    store.dispatch({
      intent: CLOSE_INTRO_MODAL,
      introModal: { isOpen: false },
    });
  },
  openReportingModal: () => {
    store.dispatch({
      intent: OPEN_REPORTING_MODAL,
      reportingModal: { isOpen: true },
    });
  },
  closeReportingModal: () => {
    store.dispatch({
      intent: CLOSE_REPORTING_MODAL,
      reportingModal: { isOpen: false },
    });
  },
});

export default createTasksDispatcher;
