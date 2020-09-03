import {
  LOAD_CONTACT_COMBOBOX_OPTIONS,
  LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
  SET_CONTACT_COMBOBOX_LOADING_STATE,
  SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createContactComboboxDispatcher = ({ store }) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  loadContactComboboxOptions: (payload) => {
    store.dispatch({
      intent: LOAD_CONTACT_COMBOBOX_OPTIONS,
      ...payload,
    });
  },
  loadContactComboboxOptionById: (contact) => {
    store.dispatch({
      intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
      contact,
    });
  },
  setContactComboboxLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_CONTACT_COMBOBOX_LOADING_STATE,
      isLoading,
    });
  },
  setContactComboboxOptionsLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
      isLoading,
    });
  },
});

export default createContactComboboxDispatcher;
