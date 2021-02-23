import {
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_SELECTED_AUTOCOMPLETE_ADDRESS,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  keywords: '',
  selected: {
    address: '',
    info: {
      state: '',
      suburb: '',
      postcode: '',
    },
  },
  addresses: [],
});

const setInitialState = (state) => ({
  ...state,
});

const resetState = () => getDefaultState();

const loadAutocompleteAddresses = (state, { payload }) => ({
  ...state,
  addresses: [...payload],
});

const setSelectedAutocompleteAddress = (state, { payload }) => ({
  ...state,
  selected: payload,
});

const setAutocompleteAddressKeywords = (state, { payload }) => ({
  ...state,
  keywords: payload,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_AUTOCOMPLETE_ADDRESSES]: loadAutocompleteAddresses,
  [SET_SELECTED_AUTOCOMPLETE_ADDRESS]: setSelectedAutocompleteAddress,
  [SET_AUTOCOMPLETE_ADDRESS_KEYWORDS]: setAutocompleteAddressKeywords,
};

const auAddressAutocompleteComboboxReducer = createReducer(
  getDefaultState(),
  handlers
);
export default auAddressAutocompleteComboboxReducer;
