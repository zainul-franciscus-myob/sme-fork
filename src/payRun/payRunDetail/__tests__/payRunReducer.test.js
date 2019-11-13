import { SET_TAB } from '../payRunDetailIntents';
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
});
