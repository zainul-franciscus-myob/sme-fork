import {
  AUTOCOMPLETE_ADDRESS_SELECTED,
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
} from '../../AddressAutocompleteIntents';
import auAddressAutocompleteComboboxReducer from '../auAddressAutocompleteComboboxReducer';

describe('AutocompleteAddressComboboxReducer', () => {
  describe('loadAutocompleteAddresses', () => {
    const state = {
      addresses: [],
    };
    const action = {
      intent: LOAD_AUTOCOMPLETE_ADDRESSES,
      addresses: [
        {
          address:
            'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
          streetLine: 'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT',
          suburb: 'PARADISE POINT',
          state: 'QLD',
          postcode: '4216',
        },
        {
          address:
            'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
          streetLine: 'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST',
          suburb: 'QUEANBEYAN',
          state: 'NSW',
          postcode: '2620',
        },
      ],
    };
    const actual = auAddressAutocompleteComboboxReducer(state, action);
    const expected = [
      {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        streetLine: 'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT',
        suburb: 'PARADISE POINT',
        state: 'QLD',
        postcode: '4216',
      },
      {
        address: 'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
        streetLine: 'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST',
        suburb: 'QUEANBEYAN',
        state: 'NSW',
        postcode: '2620',
      },
    ];
    expect(actual.addresses).toEqual(expected);
  });

  describe('updateSelectedAddress', () => {
    it('update selected address', () => {
      const state = {
        selected: {
          address: '',
          streetLine: '',
          state: '',
          suburb: '',
          postcode: '',
        },
      };
      const action = {
        intent: AUTOCOMPLETE_ADDRESS_SELECTED,
        selected: {
          address:
            'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
          streetLine: 'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT',
          suburb: 'PARADISE POINT',
          state: 'QLD',
          postcode: '4216',
        },
      };

      const actual = auAddressAutocompleteComboboxReducer(state, action);
      const expected = {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        streetLine: 'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT',
        suburb: 'PARADISE POINT',
        state: 'QLD',
        postcode: '4216',
      };
      expect(actual.selected).toEqual(expected);
    });
  });

  describe('updateKeyword', () => {
    it('update keywords', () => {
      const state = {
        keywords: '',
      };
      const action = {
        intent: SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
        keywords: 'queen',
      };

      const actual = auAddressAutocompleteComboboxReducer(state, action);
      expect(actual.keywords).toEqual('queen');
    });
  });
});
