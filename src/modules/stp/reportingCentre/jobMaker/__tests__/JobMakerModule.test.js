import { Card } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { SET_LOADING_STATE } from '../JobMakerIntents';
import JobMakerModule from '../JobMakerModule';
import JobMakerReducer from '../JobMakerReducer';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestStore from '../../../../../store/TestStore';
import createJobMakerDispatcher from '../createJobMakerDispatcher';

describe('JobMakerModule', () => {
  const setupModule = (featureToggles) => {
    const module = new JobMakerModule({
      featureToggles,
    });
    const store = new TestStore(JobMakerReducer);
    module.store = store;
    module.dispatcher = createJobMakerDispatcher(store);

    module.run({});
    const wrapper = mount(module.getView());
    wrapper.update();
    return { store, wrapper };
  };

  describe('run', () => {
    it('renders landing page when isJobMakerDeclarationEnabled toggle is off', () => {
      const { store, wrapper } = setupModule({
        isJobMakerDeclarationEnabled: false,
      });

      const result = wrapper.find({ testid: 'jobMaker-landing' });

      expect(result.find(Card)).toHaveLength(1);
      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);
    });

    it('hides landing page when isJobMakerDeclarationEnabled toggle is on', () => {
      const { store, wrapper } = setupModule({
        isJobMakerDeclarationEnabled: true,
      });

      const result = wrapper.find({ testid: 'jobMaker-landing' });

      expect(result.find(Card)).toHaveLength(0);
      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);
    });
  });
});
