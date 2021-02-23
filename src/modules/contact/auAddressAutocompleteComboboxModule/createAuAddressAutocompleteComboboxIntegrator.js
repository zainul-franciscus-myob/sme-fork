import { LOAD_AUTOCOMPLETE_ADDRESSES } from '../ContactIntents';

const createAuAddressAutocompleteComboboxIntegrator = ({ integration }) => ({
  loadAutocompleteAddresses: ({
    onSuccess,
    onFailure,
    keywords,
    country = 'au',
    limit = 10,
  }) => {
    const urlParams = {
      country,
      keywords,
    };
    const params = {
      limit,
    };
    integration.read({
      intent: LOAD_AUTOCOMPLETE_ADDRESSES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createAuAddressAutocompleteComboboxIntegrator;
