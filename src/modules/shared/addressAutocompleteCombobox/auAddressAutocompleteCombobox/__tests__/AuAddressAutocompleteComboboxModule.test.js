import {
  AUTOCOMPLETE_ADDRESS_SELECTED,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_KEYWORDS_TO_SELECTED,
} from '../../AddressAutocompleteIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import AuAddressAutocompleteComboboxModule from '../AuAddressAutocompleteComboboxModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import auAddressAutocompleteComboboxReducer from '../auAddressAutocompleteComboboxReducer';
import createAuAddressAutocompleteComboboxDispatcher from '../createAuAddressAutocompleteComboboxDispatcher';
import createAuAddressAutocompleteComboboxIntegrator from '../createAuAddressAutocompleteComboboxIntegrator';

describe('AuAddressAutocompleteComboboxModule', () => {
  const setup = () => {
    const store = new TestStore(auAddressAutocompleteComboboxReducer);
    const integration = new TestIntegration();

    const module = new AuAddressAutocompleteComboboxModule({
      integration,
      name: 'street',
      label: 'AutocompleteAddress',
    });
    module.store = store;
    module.dispatcher = createAuAddressAutocompleteComboboxDispatcher({
      store,
    });
    module.integrator = createAuAddressAutocompleteComboboxIntegrator({
      integration,
    });

    const onAutoCompleteAddressSelect = () => {};
    const onAddressChange = () => {};
    const street =
      'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216';

    return {
      store,
      integration,
      module,
      onAutoCompleteAddressSelect,
      onAddressChange,
      street,
    };
  };

  describe('run', () => {
    it('successfully run autocomplete addressCombobox with `street`', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
        street,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
        street,
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        expect.objectContaining({
          intent: SET_KEYWORDS_TO_SELECTED,
        }),
      ]);
    });

    it('successfully run autocomplete addressCombobox without `street`', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
      ]);
    });
  });

  describe('handleOnInputValueChange', () => {
    it('successfully load autocomplete addresses', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
      });

      module.debounceLoadAutocompleteAddresses = jest.fn();

      module.handleOnInputValueChange('queen');

      expect(module.debounceLoadAutocompleteAddresses).toBeCalledWith({
        keywords: 'queen',
      });
      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
          keywords: 'queen',
        },
      ]);
    });
  });

  describe('handleOnChange', () => {
    it('successfully update selected address', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
      });
      module.onAutoCompleteAddressSelect = jest.fn();
      const selectedAddress = {
        address: 'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT',
        suburb: 'QUEANBEYAN',
        state: 'NSW',
        postcode: '2620',
      };

      module.handleOnChange(selectedAddress);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: AUTOCOMPLETE_ADDRESS_SELECTED,
          selected: selectedAddress,
        },
      ]);
      expect(module.onAutoCompleteAddressSelect).toBeCalledWith(
        selectedAddress
      );
    });
  });

  describe('handleOnBlur', () => {
    it('set keywords as selected address if has no valid autocomplete addresses', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
      });
      module.onAddressChange = jest.fn();
      module.debounceLoadAutocompleteAddresses = jest.fn();

      module.handleOnInputValueChange('abcdefg');
      module.handleOnBlur();

      expect(module.debounceLoadAutocompleteAddresses).toBeCalledWith({
        keywords: 'abcdefg',
      });
      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
          keywords: 'abcdefg',
        },
        {
          intent: SET_KEYWORDS_TO_SELECTED,
          street: 'abcdefg',
        },
      ]);

      expect(module.onAddressChange).toBeCalledWith('abcdefg');
    });

    it('does nothing if has selected address', () => {
      const {
        store,
        module,
        onAutoCompleteAddressSelect,
        onAddressChange,
      } = setup();
      module.run({
        onAutoCompleteAddressSelect,
        onAddressChange,
      });
      module.onAddressChange = jest.fn();

      module.handleOnBlur();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
      ]);
      expect(module.onAddressChange).not.toBeCalled();
    });
  });
});
