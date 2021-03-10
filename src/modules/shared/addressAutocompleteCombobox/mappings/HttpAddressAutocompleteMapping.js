import { LOAD_AUTOCOMPLETE_ADDRESSES } from '../AddressAutocompleteIntents';

const AddressAutocompleteMapping = {
  [LOAD_AUTOCOMPLETE_ADDRESSES]: {
    method: 'GET',
    getPath: ({ country, keywords }) =>
      `/address-autocomplete/${country}/${keywords}`,
  },
};

export default AddressAutocompleteMapping;
