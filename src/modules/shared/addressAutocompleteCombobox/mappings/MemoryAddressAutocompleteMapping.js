import { LOAD_AUTOCOMPLETE_ADDRESSES } from '../AddressAutocompleteIntents';
import loadAutoCompleteAddressesResponse from './data/loadAutoCompleteAddressesResponse.json';

const loadAutoCompleteAddresses = ({ onSuccess }) =>
  onSuccess(loadAutoCompleteAddressesResponse);

const AddressAutocompleteMapping = {
  [LOAD_AUTOCOMPLETE_ADDRESSES]: loadAutoCompleteAddresses,
};

export default AddressAutocompleteMapping;
