import {
  getAutocompleteAddresses,
  getKeywords,
  getSelectedAutocompleteAddress,
} from '../auAddressAutocompleteComboboxSelectors';

describe('autocompleteAddressComboboxSelectors', () => {
  describe('getAutocompleteAddresses', () => {
    it('get the addresses', () => {
      const state = {
        addresses: [
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
          address:
            'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
          info: {
            suburb: 'QUEANBEYAN',
            state: 'NSW',
            postcode: '2620',
          },
        },
      ];
      const actual = getAutocompleteAddresses(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedAutocompleteAddress', () => {
    it('get selected address', () => {
      const state = {
        selected: {
          address:
            'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
          info: {
            suburb: 'PARADISE POINT',
            state: 'QLD',
            postcode: '4216',
          },
        },
      };
      const expected = {
        address:
          'QUEEN ANNE COURT RESERVE, 1 QUEEN ANNE CT, PARADISE POINT QLD 4216',
        info: {
          suburb: 'PARADISE POINT',
          state: 'QLD',
          postcode: '4216',
        },
      };
      const actual = getSelectedAutocompleteAddress(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getKeywords', () => {
    it('get the keywords', () => {
      const state = {
        keywords: 'queen',
      };
      const actual = getKeywords(state);
      expect(actual).toBe('queen');
    });
  });
});
