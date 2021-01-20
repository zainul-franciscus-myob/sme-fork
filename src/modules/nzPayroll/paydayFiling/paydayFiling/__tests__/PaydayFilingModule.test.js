import { mount } from 'enzyme';

import { LOAD_BUSINESS_ONBOARDED_STATUS } from '../PaydayFilingIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import PaydayFilingModule from '../PaydayFilingModule';
import RouteName from '../../../../../router/RouteName';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import paydayFilingDispatchers from '../createPaydayFilingDispatcher';
import paydayFilingReducer from '../PaydayFilingReducer';

describe('PaydayFilingModule', () => {
  const constructPaydayFilingModule = (
    featureToggles = { isPaydayFilingEnabled: true },
    auth = ''
  ) => {
    const integration = new TestIntegration();

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const paydayFilingModule = new PaydayFilingModule({
      integration,
      setRootView,
      featureToggles,
      navigateToName: jest.fn(),
    });

    const store = new TestStore(paydayFilingReducer);
    paydayFilingModule.store = store;

    store.setState({
      ...store.getState(),
      authorisation: auth,
      region: 'nz',
      businessId: '123',
    });

    paydayFilingModule.dispatcher = paydayFilingDispatchers(store);
    paydayFilingModule.run({});

    if (featureToggles.isPaydayFilingEnabled) wrapper.update();
    return {
      wrapper,
      store,
      integration,
      module: paydayFilingModule,
    };
  };

  it('renders the payday filing view component when payday filing is enabled', () => {
    const { wrapper } = constructPaydayFilingModule();
    const component = wrapper.find('PaydayFilingView');

    expect(component).toHaveLength(1);
  });

  it('redirects to business list if payday filing is not enabled', () => {
    const featureToggles = {
      isPaydayFilingEnabled: false,
    };
    const { module } = constructPaydayFilingModule(featureToggles);

    expect(module.navigateToName).toBeCalledWith(RouteName.BUSINESS_LIST);
  });

  it('should dispatch an action to set initial state ', () => {
    const { store } = constructPaydayFilingModule();

    expect(store.actions).toContainEqual({
      intent: SET_INITIAL_STATE,
      context: {},
    });
  });

  describe('Business onboarded status check', () => {
    it('should load payday filing if business is onboarded', () => {
      const { wrapper, integration, module } = constructPaydayFilingModule();
      integration.mapSuccess(LOAD_BUSINESS_ONBOARDED_STATUS, {
        isBusinessOnboarded: true,
      });
      module.run({});

      const component = wrapper.find('PaydayFilingView');
      expect(component).toHaveLength(1);
      expect(window.location.href).toEqual('http://localhost/');
    });

    it('should redirect to onboarding page if business is not onboarded', () => {
      const { integration, module } = constructPaydayFilingModule();
      integration.mapSuccess(LOAD_BUSINESS_ONBOARDED_STATUS, {
        isBusinessOnboarded: false,
      });
      module.run({});

      expect(window.location.href).toEqual(
        'http://localhost/#/nz/123/paydayFiling/onboarding'
      );
    });
  });
});
