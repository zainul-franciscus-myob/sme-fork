import {
  AUTOCOMPLETE_ADDRESS_SELECTED,
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
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
  loadAutocompleteAddresses: (addresses) => {
    store.dispatch({
      intent: LOAD_AUTOCOMPLETE_ADDRESSES,
      addresses,
    });
  },
  autocompleteAddressSelected: (selectedAutocompleteAddress) => {
    store.dispatch({
      intent: AUTOCOMPLETE_ADDRESS_SELECTED,
      selectedAutocompleteAddress,
    });
  },
  setAutocompleteAddressKeywords: (keywords) => {
    store.dispatch({
      intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
      keywords,
    });
  },
});

export default createAuAddressAutocompleteComboboxDispatcher;
