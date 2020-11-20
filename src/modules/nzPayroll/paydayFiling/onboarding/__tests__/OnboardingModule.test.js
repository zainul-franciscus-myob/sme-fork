import { mount } from 'enzyme';

import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import OnboardingModule from '../OnboardingModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import onboardingDispatchers from '../OnboardingDispatchers';
import onboardingReducer from '../OnboardingReducer';

describe('OnboardingModule', () => {
  const constructOnboardingModule = () => {
    const integration = new TestIntegration();

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const onboardingModule = new OnboardingModule({
      integration,
      setRootView,
    });

    const store = new TestStore(onboardingReducer);
    onboardingModule.store = store;
    onboardingModule.dispatcher = onboardingDispatchers(store);
    onboardingModule.run({});

    wrapper.update();
    return {
      wrapper,
      store,
    };
  };

  it('renders the payday filing onboarding view component', () => {
    const { wrapper } = constructOnboardingModule();
    const component = wrapper.find('OnboardingView');

    expect(component).toHaveLength(1);
  });

  it('should dispatch an action to set initial state ', () => {
    const { store } = constructOnboardingModule();

    expect(store.actions).toContainEqual({
      intent: SET_INITIAL_STATE,
      context: {},
    });
  });
});
