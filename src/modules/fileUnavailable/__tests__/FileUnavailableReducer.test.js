import {
  LOAD_FILE_UNAVAILABLE,
  SET_IS_POLLING,
  SET_UPDATE_FILE_SUCCESS,
} from '../FileUnavailableIntents';
import fileUnavailableReducer from '../fileUnavailableReducer';

describe('fileUnavailableReducer', () => {
  describe('loadFileUnavailable', () => {
    it('should set isOnlineOnly', () => {
      const state = {
        isOnlineOnly: false,
      };
      const action = {
        intent: LOAD_FILE_UNAVAILABLE,
        context: {
          isOnlineOnly: true,
        },
      };

      const expected = {
        isOnlineOnly: true,
      };

      const actual = fileUnavailableReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('setIsPolling', () => {
    it('should set isPolling', () => {
      const state = {
        isPolling: false,
      };
      const action = {
        intent: SET_IS_POLLING,
        isPolling: true,
      };

      const expected = {
        isPolling: true,
      };

      const actual = fileUnavailableReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('setUpdateFileSuccess', () => {
    it('should set updateFileSuccess', () => {
      const state = {
        updateFileSuccess: false,
      };
      const action = {
        intent: SET_UPDATE_FILE_SUCCESS,
        updateFileSuccess: true,
      };

      const expected = {
        updateFileSuccess: true,
      };

      const actual = fileUnavailableReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
