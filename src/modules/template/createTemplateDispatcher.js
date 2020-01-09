import {
  LOAD_TEMPLATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_TEMPLATE_OPTION,
} from './TemplateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getImageKey } from './templateSelectors';

const createTemplateDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  updateTemplateOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_TEMPLATE_OPTION,
      key,
      value,
    });
  },

  selectFile: (file) => {
    const reader = new FileReader();
    const key = getImageKey(store.getState());
    reader.readAsDataURL(file);
    reader.onload = () => {
      store.dispatch({
        intent: UPDATE_TEMPLATE_OPTION,
        key,
        value: reader.result,
      });
    };
  },

  removeFile: () => {
    const key = getImageKey(store.getState());
    store.dispatch({
      intent: UPDATE_TEMPLATE_OPTION,
      key,
      value: undefined,
    });
  },

  loadTemplate: (template) => {
    store.dispatch({
      intent: LOAD_TEMPLATE,
      template,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },
});

export default createTemplateDispatcher;
