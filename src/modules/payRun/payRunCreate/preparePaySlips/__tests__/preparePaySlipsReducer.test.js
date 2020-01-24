import { SET_PDF_LOADING_STATE, SET_TAB } from '../PreparePaySlipsIntents';
import payRunReducer from '../../payRunReducer';

describe('preparePaySlipsReducer', () => {
  it('sets the selected tab', () => {
    const newSelectedTab = 'new-selected-tab';
    const expected = {
      preparePaySlips: {
        selectedTab: newSelectedTab,
      },
    };

    const action = {
      intent: SET_TAB,
      selectedTab: newSelectedTab,
    };

    const actual = payRunReducer({}, action);

    expect(actual).toEqual(expected);
  });

  describe('setPdfIsLoading', () => {
    it('should set the employee objects in both the email and print tabs to isLoading', () => {
      const state = {
        preparePaySlips: {
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
        },
      };

      const action = {
        intent: SET_PDF_LOADING_STATE,
        transactionId: 2,
        isLoading: true,
      };

      const expected = {
        preparePaySlips: {
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
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
