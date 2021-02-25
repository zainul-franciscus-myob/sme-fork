import {
  LOAD_ONBOARDING,
  SET_LOADING_STATE,
  SET_ONBOARDING_DETAILS,
} from '../OnboardingIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import OnboardingModule from '../OnboardingModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createOnboardingDispatcher from '../createOnboardingDispatcher';
import createOnboardingIntegrator from '../createOnboardingIntegrator';
import onboardingReducer from '../onboardingReducer';

describe('OnboardingModule', () => {
  const setup = () => {
    const setRootView = () => {};

    const store = new TestStore(onboardingReducer);
    const integration = new TestIntegration();

    const module = new OnboardingModule({
      integration,
      featureToggles: { isMoveToMyobEnabled: true },
      setRootView,
    });
    module.store = store;
    module.dispatcher = createOnboardingDispatcher(store);
    module.integrator = createOnboardingIntegrator(store, integration);

    return {
      store,
      module,
      integration,
    };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();
      const context = {
        businessId: '123456',
        region: 'au',
        isMoveToMyobEnabled: true,
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        expect.objectContaining({
          intent: SET_ONBOARDING_DETAILS,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ONBOARDING,
        }),
      ]);
    });

    it('fails to load and redirect to dashboard', () => {
      const { store, integration, module } = setup();
      const context = {
        businessId: '123456',
        region: 'au',
        isMoveToMyobEnabled: true,
      };
      integration.mapFailure(LOAD_ONBOARDING);
      module.navigateTo = jest.fn();

      module.run(context);

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
          context,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ONBOARDING,
        }),
      ]);

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/123456/dashboard');
    });
  });
});
