import {
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_SELECTED_AUTOCOMPLETE_ADDRESS,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createAuAddressAutocompleteComboboxDispatcher = ({ store }) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: () => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context: {},
    });
  },
  setAutocompleteAddresses: (payload) => {
    store.dispatch({
      intent: LOAD_AUTOCOMPLETE_ADDRESSES,
      payload,
    });
  },
  setSelectedAutocompleteAddress: (payload) => {
    store.dispatch({
      intent: SET_SELECTED_AUTOCOMPLETE_ADDRESS,
      payload,
    });
  },
  setAutocompleteAddressKeywords: (payload) => {
    store.dispatch({
      intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
      payload,
    });
  },
});

export default createAuAddressAutocompleteComboboxDispatcher;
