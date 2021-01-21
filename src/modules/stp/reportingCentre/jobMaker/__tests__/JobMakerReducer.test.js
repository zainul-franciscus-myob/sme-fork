import { SET_LOADING_STATE } from '../JobMakerIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import jobMakerReducer from '../JobMakerReducer';

describe('JobMakerReducer', () => {
  it('sets the loading state', () => {
    const action = {
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    };

    const result = jobMakerReducer({}, action);

    expect(result.loadingState).toEqual(LoadingState.LOADING_SUCCESS);
  });
});
