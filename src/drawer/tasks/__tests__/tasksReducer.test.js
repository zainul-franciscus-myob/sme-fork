import {
  CLOSE_REPORTING_MODAL,
  OPEN_INTRO_MODAL,
  OPEN_REPORTING_MODAL,
} from '../TasksIntents';
import tasksReducer from '../tasksReducer';

describe('taskReducer', () => {
  describe('OPEN_INTRO_MODAL', () => {
    it('sets introModal.isOpen to true', () => {
      const state = {
        introModal: {
          isOpen: false,
        },
      };

      const action = {
        intent: OPEN_INTRO_MODAL,
        introModal: {
          isOpen: true,
        },
      };
      const actual = tasksReducer(state, action);

      expect(actual.introModal.isOpen).toBe(true);
    });
  });

  describe('OPEN_REPORTING_MODAL', () => {
    it('sets reportingModal.isOpen to true', () => {
      const state = {
        reportingModal: {
          isOpen: false,
        },
      };

      const action = {
        intent: OPEN_REPORTING_MODAL,
        reportingModal: {
          isOpen: true,
        },
      };
      const actual = tasksReducer(state, action);

      expect(actual.reportingModal.isOpen).toBe(true);
    });
  });

  describe('CLOSE_REPORTING_MODAL', () => {
    it('sets reportingModal.isOpen to false', () => {
      const state = {
        reportingModal: {
          isOpen: true,
        },
      };

      const action = {
        intent: CLOSE_REPORTING_MODAL,
        reportingModal: {
          isOpen: false,
        },
      };
      const actual = tasksReducer(state, action);

      expect(actual.reportingModal.isOpen).toBe(false);
    });
  });
});
