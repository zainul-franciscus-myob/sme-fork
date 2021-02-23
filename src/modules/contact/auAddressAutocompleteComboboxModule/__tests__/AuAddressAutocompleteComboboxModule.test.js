import {
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_SELECTED_AUTOCOMPLETE_ADDRESS,
} from '../../ContactIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AuAddressAutocompleteComboboxModule from '../AuAddressAutocompleteComboboxModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
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

    const onSelected = () => {};
    const street =
      'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216';

    return { store, integration, module, onSelected, street };
  };

  describe('run', () => {
    it('successfully run autocomplete addressCombobox with `street`', () => {
      const { store, module, onSelected, street } = setup();
      module.run({
        onSelected,
        street,
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        expect.objectContaining({
          intent: SET_SELECTED_AUTOCOMPLETE_ADDRESS,
        }),
      ]);
    });

    it('successfully run autocomplete addressCombobox without `street`', () => {
      const { store, module, onSelected } = setup();
      module.run({
        onSelected,
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
      const { store, module, onSelected } = setup();
      module.run({
        onSelected,
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
        { intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS, payload: 'queen' },
      ]);
    });
  });

  describe('handleOnChange', () => {
    it('successfully update selected address', () => {
      const { store, module, onSelected } = setup();
      module.run({
        onSelected,
      });
      module.onSelected = jest.fn();
      const selectedAddress = {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        info: {
          suburb: 'QUEANBEYAN',
          state: 'NSW',
          postcode: '2620',
        },
      };

      module.handleOnChange(selectedAddress);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_SELECTED_AUTOCOMPLETE_ADDRESS,
          payload: selectedAddress,
        },
      ]);
      expect(module.onSelected).toBeCalledWith(selectedAddress);
    });
  });

  describe('handleOnBlur', () => {
    it('set keywords as selected address if has no valid autocomplete addresses', () => {
      const { store, module, onSelected } = setup();
      module.run({
        onSelected,
      });
      module.onSelected = jest.fn();
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
          payload: 'abcdefg',
        },
        {
          intent: SET_SELECTED_AUTOCOMPLETE_ADDRESS,
          payload: {
            address: 'abcdefg',
            info: null,
          },
        },
      ]);

      expect(module.onSelected).toBeCalledWith({
        address: 'abcdefg',
        info: null,
      });
    });

    it('does nothing if has selected address', () => {
      const { store, module, onSelected } = setup();
      module.run({
        onSelected,
      });
      module.onSelected = jest.fn();

      module.handleOnBlur();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
      ]);
      expect(module.onSelected).not.toBeCalled();
    });
  });
});
