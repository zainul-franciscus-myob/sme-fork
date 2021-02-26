import {
  AUTOCOMPLETE_ADDRESS_SELECTED,
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
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

const loadAutocompleteAddresses = (state, { addresses }) => ({
  ...state,
  addresses,
});

const autocompleteAddressSelected = (
  state,
  { selectedAutocompleteAddress }
) => ({
  ...state,
  selected: selectedAutocompleteAddress.address
    ? selectedAutocompleteAddress
    : {
        ...state.selected,
        address: selectedAutocompleteAddress,
      },
});

const setAutocompleteAddressKeywords = (state, { keywords }) => ({
  ...state,
  keywords,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_AUTOCOMPLETE_ADDRESSES]: loadAutocompleteAddresses,
  [AUTOCOMPLETE_ADDRESS_SELECTED]: autocompleteAddressSelected,
  [SET_AUTOCOMPLETE_ADDRESS_KEYWORDS]: setAutocompleteAddressKeywords,
};

const auAddressAutocompleteComboboxReducer = createReducer(
  getDefaultState(),
  handlers
);
export default auAddressAutocompleteComboboxReducer;
