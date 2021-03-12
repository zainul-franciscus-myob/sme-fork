import {
  SELECT_ALL_REMITTANCE_ADVICE_LIST,
  SELECT_REMITTANCE_ADVICE,
} from '../RemittanceAdviceIntents';
import remittanceAdviceListReducer from '../remittanceAdviceListReducer';

describe('remittanceAdviceListReducer', () => {
  describe('selectRemittanceAdvice', () => {
    it('should select a remittance advice', () => {
      const state = {
        remittanceAdviceList: [
          {
            id: 0,
            isSelected: false,
          },
          {
            id: 1,
            isSelected: false,
          },
        ],
      };

      const action = {
        intent: SELECT_REMITTANCE_ADVICE,
        id: 0,
      };

      const actual = remittanceAdviceListReducer(state, action);

      expect(actual.remittanceAdviceList[0].isSelected).toEqual(true);
      expect(actual.remittanceAdviceList[1].isSelected).toEqual(false);
    });

    it('should deselect a remittance advice', () => {
      const state = {
        remittanceAdviceList: [
          {
            id: 0,
            isSelected: true,
          },
          {
            id: 1,
            isSelected: true,
          },
        ],
      };

      const action = {
        intent: SELECT_REMITTANCE_ADVICE,
        id: 0,
      };

      const actual = remittanceAdviceListReducer(state, action);

      expect(actual.remittanceAdviceList[0].isSelected).toEqual(false);
      expect(actual.remittanceAdviceList[1].isSelected).toEqual(true);
    });
  });

  describe('selectAllRemittanceAdvices', () => {
    it(`should deselect all remittance advices if they're already all selected`, () => {
      const state = {
        remittanceAdviceList: [
          {
            id: 0,
            isSelected: false,
          },
          {
            id: 1,
            isSelected: false,
          },
        ],
      };

      const action = {
        intent: SELECT_ALL_REMITTANCE_ADVICE_LIST,
      };

      const actual = remittanceAdviceListReducer(state, action);

      expect(actual.remittanceAdviceList[0].isSelected).toBe(true);
      expect(actual.remittanceAdviceList[1].isSelected).toBe(true);
    });

    it('should select all remittance advices if only some are selected', () => {
      const state = {
        remittanceAdviceList: [
          {
            id: 0,
            isSelected: true,
          },
          {
            id: 1,
            isSelected: true,
          },
        ],
      };

      const action = {
        intent: SELECT_ALL_REMITTANCE_ADVICE_LIST,
      };

      const actual = remittanceAdviceListReducer(state, action);

      expect(actual.remittanceAdviceList[0].isSelected).toBe(false);
      expect(actual.remittanceAdviceList[1].isSelected).toBe(false);
    });
  });
});
