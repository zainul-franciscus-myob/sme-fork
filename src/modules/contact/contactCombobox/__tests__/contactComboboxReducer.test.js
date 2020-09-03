import { LOAD_CONTACT_COMBOBOX_OPTIONS } from '../../ContactIntents';
import contactComboboxReducer, {
  getUpdatedContactOptions,
} from '../contactComboboxReducer';

describe('contactComboboxReducer', () => {
  const reducer = contactComboboxReducer;

  describe('loadContactComboboxOptions', () => {
    it('add new options to the list', () => {
      const state = { contactOptions: [{ id: '1' }] };
      const action = {
        intent: LOAD_CONTACT_COMBOBOX_OPTIONS,
        contactOptions: [{ id: '2' }],
      };

      const actual = reducer(state, action);

      expect(actual.contactOptions).toEqual([{ id: '1' }, { id: '2' }]);
    });

    it('does not duplicate the option in the list', () => {
      const state = { contactOptions: [{ id: '1' }, { id: '2' }, { id: '3' }] };
      const action = {
        intent: LOAD_CONTACT_COMBOBOX_OPTIONS,
        contactOptions: [{ id: '2' }],
      };

      const actual = reducer(state, action);

      expect(actual.contactOptions).toEqual([
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ]);
    });
  });

  describe('getUpdatedContactOptions', () => {
    it('add contact at the top of the contact options', () => {
      const state = { contactOptions: [{ id: '1' }] };
      const updatedOption = { id: '2' };

      const actual = getUpdatedContactOptions(state, updatedOption);

      expect(actual).toEqual([{ id: '2' }, { id: '1' }]);
    });

    it('replace contact in the contact options when contact exists', () => {
      const state = { contactOptions: [{ id: '1' }, { id: '2' }] };
      const updatedOption = { id: '2' };

      const actual = getUpdatedContactOptions(state, updatedOption);

      expect(actual).toEqual([{ id: '1' }, { id: '2' }]);
    });
  });
});
