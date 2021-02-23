import {
  LOAD_AUTOCOMPLETE_ADDRESSES,
  SET_AUTOCOMPLETE_ADDRESS_KEYWORDS,
  SET_SELECTED_AUTOCOMPLETE_ADDRESS,
} from '../../ContactIntents';
import auAddressAutocompleteComboboxReducer from '../auAddressAutocompleteComboboxReducer';

describe('AutocompleteAddressComboboxReducer', () => {
  describe('loadAutocompleteAddresses', () => {
    const state = {
      addresses: [],
    };
    const action = {
      intent: LOAD_AUTOCOMPLETE_ADDRESSES,
      payload: [
        {
          address:
            'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
          info: {
            suburb: 'PARADISE POINT',
            state: 'QLD',
            postcode: '4216',
          },
        },
        {
          address:
            'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
          info: {
            suburb: 'QUEANBEYAN',
            state: 'NSW',
            postcode: '2620',
          },
        },
      ],
    };
    const actual = auAddressAutocompleteComboboxReducer(state, action);
    const expected = [
      {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        info: {
          suburb: 'PARADISE POINT',
          state: 'QLD',
          postcode: '4216',
        },
      },
      {
        address: 'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
        info: {
          suburb: 'QUEANBEYAN',
          state: 'NSW',
          postcode: '2620',
        },
      },
    ];
    expect(actual.addresses).toEqual(expected);
  });

  describe('updateSelectedAddress', () => {
    it('update selected address', () => {
      const state = {
        selected: {
          address: '',
          info: {
            state: '',
            suburb: '',
            postcode: '',
          },
        },
      };
      const action = {
        intent: SET_SELECTED_AUTOCOMPLETE_ADDRESS,
        payload: {
          address:
            'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
          info: {
            suburb: 'PARADISE POINT',
            state: 'QLD',
            postcode: '4216',
          },
        },
      };

      const actual = auAddressAutocompleteComboboxReducer(state, action);
      const expected = {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        info: {
          suburb: 'PARADISE POINT',
          state: 'QLD',
          postcode: '4216',
        },
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
        payload: 'queen',
      };

      const actual = auAddressAutocompleteComboboxReducer(state, action);
      expect(actual.keywords).toEqual('queen');
    });
  });
});
