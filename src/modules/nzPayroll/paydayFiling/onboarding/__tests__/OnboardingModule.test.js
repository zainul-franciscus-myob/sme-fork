import { mount } from 'enzyme';

import {
  GET_IRD_NUMBER,
  SET_ALERT,
  SET_CURRENT_STEP,
  SET_IRD_NUMBER,
  SET_LOADING_STATE,
  UPDATE_ONBOARD_USER,
} from '../OnboardingIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import OnboardingModule from '../OnboardingModule';
import Steps from '../OnboardingSteps';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import onboardingDispatchers from '../OnboardingDispatchers';
import onboardingReducer from '../OnboardingReducer';

describe('OnboardingModule', () => {
  let integration;
  let store;
  const replaceURLParams = jest.fn();

  const constructOnboardingModule = () => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new OnboardingModule({
      integration,
      setRootView,
      replaceURLParams,
    });

    module.store = store;
    module.dispatcher = onboardingDispatchers(store);
    module.run({});

    return {
      wrapper,
    };
  };

  beforeEach(() => {
    integration = new TestIntegration();
    store = new TestStore(onboardingReducer);
  });

  afterEach(jest.clearAllMocks);

  it('renders the payday filing onboarding view component', () => {
    const { wrapper } = constructOnboardingModule();
    const component = wrapper.find('OnboardingView');

    expect(component).toHaveLength(1);
  });

  it('should dispatch an action to set initial state ', () => {
    constructOnboardingModule();
    expect(store.actions).toContainEqual({
      intent: SET_INITIAL_STATE,
      context: {},
    });
  });

  it('should dispatch an action to set ird number state ', () => {
    integration.mapSuccess(GET_IRD_NUMBER, { irdNumber: '1234' });
    constructOnboardingModule();
    expect(store.actions).toEqual(
      expect.arrayContaining([
        {
          intent: SET_IRD_NUMBER,
          irdNumber: '1234',
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ])
    );

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: GET_IRD_NUMBER,
      }),
    ]);
  });

  it('should go to final step if it is an auth callback from ir', () => {
    // arrange
    const authorisation = 'complete#someIdentifierHere';
    store.setState({
      ...store.getState(),
      authorisation,
    });

    // act
    constructOnboardingModule();

    expect(store.actions).toEqual(
      expect.arrayContaining([
        {
          intent: SET_CURRENT_STEP,
          currentStep: Steps.DONE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ])
    );
  });

  it('should go to authorisation step when updating onboard user fails', () => {
    // arrange
    const authorisation = 'complete#1234';
    const message = 'this failed';
    integration.mapFailure(UPDATE_ONBOARD_USER, { message });
    store.setState({
      ...store.getState(),
      authorisation,
    });

    // act
    constructOnboardingModule();

    // assert
    expect(store.actions).toEqual(
      expect.arrayContaining([
        {
          intent: SET_ALERT,
          alert: { message, type: 'danger' },
        },
        {
          intent: SET_CURRENT_STEP,
          currentStep: Steps.AUTHORISE_MYOB,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ])
    );

    expect(replaceURLParams).toHaveBeenCalledWith({
      authorisation: undefined,
    });
  });

  it('should render error when cannot retrieve business ird number', () => {
    // arrange
    integration.mapFailure(GET_IRD_NUMBER);

    // act
    constructOnboardingModule();

    // assert
    expect(store.actions).toContainEqual({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_FAIL,
    });

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: GET_IRD_NUMBER,
      }),
    ]);
  });
});
