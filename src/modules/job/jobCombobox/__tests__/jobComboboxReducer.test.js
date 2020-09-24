import {
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_JOB_COMBOBOX_OPTION_BY_ID,
  UPDATE_JOB_COMBOBOX_OPTIONS,
} from '../../JobIntents';
import jobComboboxReducer from '../jobComboboxReducer';

describe('jobComboboxReducer', () => {
  describe('loadJobComboboxOptions', () => {
    it('adds new options to the bottom of the list and removes duplicates', () => {
      const state = {
        jobOptions: [{ id: '3' }, { id: '4' }],
      };

      const action = {
        intent: LOAD_JOB_COMBOBOX_OPTIONS,
        jobOptions: [{ id: '3' }, { id: '5' }],
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([
        { id: '3' },
        { id: '4' },
        { id: '5' },
      ]);
    });
  });

  describe('loadJobComboboxOptionsByIds', () => {
    it('adds new options to the top of the list and removes duplicates', () => {
      const state = {
        jobOptions: [
          { id: '1', description: 'apple' },
          { id: '2', description: 'pear' },
        ],
      };

      const action = {
        intent: LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
        jobs: [
          { id: '2', description: 'pear' },
          { id: '3', description: 'banana' },
        ],
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([
        { id: '2', description: 'pear' },
        { id: '3', description: 'banana' },
        { id: '1', description: 'apple' },
      ]);
    });
  });

  describe('loadJobComboboxOptionById', () => {
    it('adds the new option to top of the list', () => {
      const state = { jobOptions: [{ id: '1' }] };
      const action = {
        intent: LOAD_JOB_COMBOBOX_OPTION_BY_ID,
        job: { id: '2' },
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('updates the existing option with the new details the new option has the same id', () => {
      const state = {
        jobOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: LOAD_JOB_COMBOBOX_OPTION_BY_ID,
        job: { id: '2', name: 'pear' },
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });

  describe('updateJobComboboxOptions', () => {
    it('adds the new option to the top of the list', () => {
      const state = { jobOptions: [{ id: '1' }] };
      const action = {
        intent: UPDATE_JOB_COMBOBOX_OPTIONS,
        job: { id: '2' },
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('merges new options to the list and removes duplicates', () => {
      const state = {
        jobOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: UPDATE_JOB_COMBOBOX_OPTIONS,
        job: { id: '2', name: 'pear' },
      };

      const actual = jobComboboxReducer(state, action);
      expect(actual.jobOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });
});
