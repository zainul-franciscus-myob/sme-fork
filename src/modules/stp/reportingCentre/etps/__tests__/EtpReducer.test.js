import { SET_SELECTED_ETP, SET_SELECT_ALL_ETP } from '../EtpIntents';
import EtpReducer from '../EtpReducer';

describe('EtpReducer', () => {
  describe('setSelectedPay', () => {
    it('should set the pay to be isSelected', () => {
      const state = {
        pays: [
          {
            id: '123',
          },
        ],
      };

      const action = {
        intent: SET_SELECTED_ETP,
        pay: {
          id: '123',
        },
        isSelected: true,
      };

      const result = EtpReducer(state, action);

      const expected = {
        pays: [
          {
            id: '123',
            isSelected: true,
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('setSelectAll', () => {
    it('should set all the pays to be isSelected', () => {
      const state = {
        pays: [
          {
            id: '123',
          },
          {
            id: '321',
          },
        ],
      };

      const action = {
        intent: SET_SELECT_ALL_ETP,
        isSelected: true,
      };

      const result = EtpReducer(state, action);

      const expected = {
        pays: [
          {
            id: '123',
            isSelected: true,
          },
          {
            id: '321',
            isSelected: true,
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });
});
