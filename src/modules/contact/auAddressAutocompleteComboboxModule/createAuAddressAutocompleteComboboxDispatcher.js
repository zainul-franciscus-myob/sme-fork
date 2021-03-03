import {
  AUTOCOMPLETE_ADDRESS_SELECTED,
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_KEYWORDS_TO_SELECTED,
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
  autocompleteAddressSelected: (selected) => {
    store.dispatch({
      intent: AUTOCOMPLETE_ADDRESS_SELECTED,
      selected,
    });
  },
  setAutocompleteAddressKeywords: (keywords) => {
    store.dispatch({
      intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
      keywords,
    });
  },
  setKeywordsToSelected: (street) => {
    store.dispatch({
      intent: SET_KEYWORDS_TO_SELECTED,
      street,
    });
  },
});

export default createAuAddressAutocompleteComboboxDispatcher;
