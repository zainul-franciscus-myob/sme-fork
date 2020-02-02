
import {
  LOAD_NEW_TEMPLATE,
  LOAD_PAY_DIRECT,
  LOAD_TEMPLATE,
  REMOVE_TEMPLATE_IMAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_TEMP_FILE,
  UPDATE_PREVIEW_OPTION,
  UPDATE_TEMPLATE_IMAGE,
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

  updatePreviewOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_PREVIEW_OPTION,
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

  selectFileFromStore: () => {
    store.dispatch({
      intent: UPDATE_TEMPLATE_IMAGE,
    });
  },

  setTempFile: (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      store.dispatch({
        intent: SET_TEMP_FILE,
        file: reader.result,
      });
    };
  },

  removeFile: () => {
    store.dispatch({
      intent: REMOVE_TEMPLATE_IMAGE,
    });
  },

  loadTemplate: (payload) => {
    store.dispatch({
      intent: LOAD_TEMPLATE,
      payload,
    });
  },

  loadNewTemplate: (payload) => {
    store.dispatch({
      intent: LOAD_NEW_TEMPLATE,
      payload,
    });
  },

  loadPayDirect: (payload) => {
    store.dispatch({
      intent: LOAD_PAY_DIRECT,
      ...payload,
    });
  },

  setPayDirectLoadingState: isLoading => store.dispatch({
    intent: SET_PAY_DIRECT_LOADING_STATE, isLoading,
  }),

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
