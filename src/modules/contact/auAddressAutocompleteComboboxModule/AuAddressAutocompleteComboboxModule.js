import { Provider } from 'react-redux';
import React from 'react';

import {
  getKeywords,
  getSelectedAutocompleteAddress,
} from './auAddressAutocompleteComboboxSelectors';
import AutocompleteAddressComboboxView from './components/AuAddressAutocompleteComboboxView';
import Store from '../../../store/Store';
import auAddressAutocompleteComboboxReducer from './auAddressAutocompleteComboboxReducer';
import createAuAddressAutocompleteComboboxDispatcher from './createAuAddressAutocompleteComboboxDispatcher';
import createAuAddressAutocompleteComboboxIntegrator from './createAuAddressAutocompleteComboboxIntegrator';
import debounce from '../../../common/debounce/debounce';

export default class AuAddressAutocompleteComboboxModule {
  constructor({ integration, name, label = 'Address' }) {
    this.store = new Store(auAddressAutocompleteComboboxReducer);
    this.integrator = createAuAddressAutocompleteComboboxIntegrator({
      integration,
    });
    this.dispatcher = createAuAddressAutocompleteComboboxDispatcher({
      store: this.store,
    });
    this.label = label;
    this.name = name;
    this.LOAD_AUTOCOMPLETE_ADDRESSES_DELAY = 200;
  }

  getState = () => this.store.getState();

  getSelectedAddress = () => getSelectedAutocompleteAddress(this.getState());

  handleOnChange = (value) => {
    this.dispatcher.setSelectedAutocompleteAddress(value);
    this.onSelected(value);
  };

  handleOnBlur = () => {
    const selectedAddress = this.getSelectedAddress();
    const keywords = getKeywords(this.getState());
    if (keywords === selectedAddress?.address) return;

    this.dispatcher.setSelectedAutocompleteAddress({
      address: keywords,
      info: null,
    });
    this.onSelected({ address: keywords, info: null });
  };

  handleOnInputValueChange = (value) => {
    if (!value) return;
    this.dispatcher.setAutocompleteAddressKeywords(value);

    this.debounceLoadAutocompleteAddresses({ keywords: value });
  };

  debounceLoadAutocompleteAddresses = ({ keywords }) =>
    debounce(
      this.loadAutocompleteAddresses,
      this.LOAD_AUTOCOMPLETE_ADDRESSES_DELAY
    )({ keywords });

  loadAutocompleteAddresses = ({ keywords }) => {
    const onSuccess = (payload) =>
      this.dispatcher.setAutocompleteAddresses(payload);
    const onFailure = () => {};

    this.integrator.loadAutocompleteAddresses({
      keywords,
      onSuccess,
      onFailure,
    });
  };

  updateSelectedAddress = (street) =>
    street &&
    this.dispatcher.setSelectedAutocompleteAddress({
      address: street,
      info: null,
    });

  resetState = () => this.dispatcher.resetState();

  run = ({ onSelected, street = '' }) => {
    this.dispatcher.setInitialState();
    this.onSelected = onSelected;
    this.updateSelectedAddress(street);
  };

  render() {
    return (
      <Provider store={this.store}>
        <AutocompleteAddressComboboxView
          label={this.label}
          name={this.name}
          onChange={this.handleOnChange}
          onInputValueChange={this.handleOnInputValueChange}
          onBlur={this.handleOnBlur}
          width="lg"
        />
      </Provider>
    );
  }
}
