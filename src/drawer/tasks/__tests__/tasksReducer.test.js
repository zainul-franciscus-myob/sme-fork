import { OPEN_INTRO_MODAL } from '../TasksIntents';
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
});
