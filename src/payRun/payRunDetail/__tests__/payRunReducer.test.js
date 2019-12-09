import { SET_PDF_LOADING_STATE, SET_TAB } from '../payRunDetailIntents';
import payRunDetailReducer from '../payRunDetailReducer';

describe('payRunDetailReducer', () => {
  it('sets the selected tab', () => {
    const newSelectedTab = 'new-selected-tab';
    const expected = {
      selectedTab: newSelectedTab,
    };

    const action = {
      intent: SET_TAB,
      selectedTab: newSelectedTab,
    };

    const actual = payRunDetailReducer({}, action);

    expect(actual).toEqual(expected);
  });

  describe('setPdfIsLoading', () => {
    it('should set the employee objects in both the email and print tabs to isLoading', () => {
      const state = {
        emailPaySlipEmployees: [
          {
            transactionId: 2,
            isLoading: false,
          },
          {
            transactionId: 3,
            isLoading: false,
          },
        ],
        printPaySlipEmployees: [
          {
            transactionId: 2,
            isLoading: false,
          },
          {
            transactionId: 4,
            isLoading: false,
          },
        ],
      };

      const action = {
        intent: SET_PDF_LOADING_STATE,
        transactionId: 2,
        isLoading: true,
      };

      const expected = {
        emailPaySlipEmployees: [
          {
            transactionId: 2,
            isLoading: true,
          },
          {
            transactionId: 3,
            isLoading: false,
          },
        ],
        printPaySlipEmployees: [
          {
            transactionId: 2,
            isLoading: true,
          },
          {
            transactionId: 4,
            isLoading: false,
          },
        ],
      };

      const actual = payRunDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
