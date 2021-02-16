import {
  SET_DROPDOWN_ACTION,
  SET_DROPDOWN_ACTION_EMPLOYEE,
  SET_INITIAL_STATE,
  SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL,
  SET_JOB_MAKER_INITIAL,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
} from './JobMakerIntents';

const createJobMakerDispatcher = (store) => ({
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

  setInitialJobMaker: (response) => {
    store.dispatch({
      intent: SET_JOB_MAKER_INITIAL,
      response,
    });
  },
  setNewEventId: () => {
    store.dispatch({
      intent: SET_NEW_EVENT_ID,
    });
  },
  setDropdownAction: (action) => {
    store.dispatch({
      intent: SET_DROPDOWN_ACTION,
      action,
    });
  },
  setDropdownActionEmployee: (employee) => {
    store.dispatch({
      intent: SET_DROPDOWN_ACTION_EMPLOYEE,
      employee,
    });
  },
  setIsShowingJobMakerActionModal: (isShowingJobMakerActionModal) => {
    store.dispatch({
      intent: SET_IS_SHOWING_JOB_MAKER_ACTION_MODAL,
      isShowingJobMakerActionModal,
    });
  },
});

export default createJobMakerDispatcher;
