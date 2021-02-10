import { mount } from 'enzyme';

import {
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_PAYDAY_USER_SESSION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TAB,
  UPDATE_ONBOARD_USER,
} from '../PaydayFilingIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import InlandRevenueSettingsActions from '../inlandRevenueSettings/components/InlandRevenueSettingsActions';
import InlandRevenueSettingsView from '../inlandRevenueSettings/components/InlandRevenueSettingsView';
import LoadingState from '../../../../../components/PageView/LoadingState';
import PaydayFilingModule from '../PaydayFilingModule';
import RemoveAuthorisationModal from '../components/RemoveAuthorisationModal';
import RouteName from '../../../../../router/RouteName';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createPaydayFilingIntegrator from '../createPaydayFilingIntegrator';
import paydayFilingDispatchers from '../createPaydayFilingDispatcher';
import paydayFilingReducer from '../PaydayFilingReducer';
import paydayUserSession from '../mappings/data/paydayUserSession.json';

describe('PaydayFilingModule', () => {
  const replaceURLParams = jest.fn();

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
      replaceURLParams,
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
    paydayFilingModule.integrator = createPaydayFilingIntegrator(
      store,
      integration
    );
    paydayFilingModule.run({});
    integration.resetRequests();

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
      integration.mapSuccess(LOAD_BUSINESS_ONBOARDED_DETAILS, {
        isBusinessOnboarded: true,
      });
      module.run({});

      const component = wrapper.find('PaydayFilingView');
      expect(component).toHaveLength(1);
      expect(window.location.href).toEqual('http://localhost/');
    });

    it('should redirect to onboarding page if business is not onboarded', () => {
      const { integration, module } = constructPaydayFilingModule();
      integration.mapSuccess(LOAD_BUSINESS_ONBOARDED_DETAILS, {
        isBusinessOnboarded: false,
      });
      module.run({});

      expect(module.navigateToName).toBeCalledWith(
        RouteName.PAYDAY_FILING_ONBOARDING
      );
    });
  });

  describe('InlandRevenueSettings tab selected', () => {
    it('should display InlandRevenueSettingsView', () => {
      const { wrapper, integration, module } = constructPaydayFilingModule();

      integration.mapSuccess(LOAD_BUSINESS_ONBOARDED_DETAILS, {
        isBusinessOnboarded: true,
      });

      integration.mapSuccess(LOAD_PAYDAY_USER_SESSION, {
        userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
        onboarded: true,
        validEhSession: false,
      });

      module.run({});
      wrapper
        .find('TabItem')
        .findWhere((c) => c.prop('item')?.id === 'irdSettings')
        .find('a')
        .simulate('click');

      const component = wrapper.find(InlandRevenueSettingsView);
      const componentActions = wrapper.find(InlandRevenueSettingsActions);
      expect(component).toHaveLength(1);
      expect(componentActions).toHaveLength(1);
    });
  });

  describe('Update onboard user', () => {
    const authorisation = 'complete#1234';

    it('should display a success alert if it is an auth callback from ir', () => {
      const message = 'success';
      const { store, integration, module } = constructPaydayFilingModule(
        { isPaydayFilingEnabled: true },
        authorisation
      );

      integration.mapSuccess(UPDATE_ONBOARD_USER, { message });

      module.run({});

      expect(store.actions).toEqual(
        expect.arrayContaining([
          {
            intent: SET_ALERT,
            alert: { message, type: 'success' },
          },
          {
            intent: SET_TAB,
            tab: 'irdSettings',
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
        ])
      );
    });

    it('should display an error alert and clear url params when updating onboard user fails', () => {
      const message = 'this failed';
      const { store, integration, module } = constructPaydayFilingModule(
        { isPaydayFilingEnabled: true },
        authorisation
      );

      integration.mapFailure(UPDATE_ONBOARD_USER, { message });

      module.run({});

      expect(store.actions).toEqual(
        expect.arrayContaining([
          {
            intent: SET_ALERT,
            alert: { message, type: 'danger' },
          },
          {
            intent: SET_TAB,
            tab: 'irdSettings',
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
  });

  describe('Integration tests', () => {
    const context = { businessId: '1' };
    afterEach(jest.clearAllMocks);
    it('should delete onboarded user when user clicks remove authorisation', () => {
      const {
        store,
        integration,
        module,
        wrapper,
      } = constructPaydayFilingModule();

      integration.mapSuccess(DELETE_ONBOARD_USER);
      store.setState({
        ...store.getState(),
        removeAuthorisationModalIsOpen: true,
        userSession: paydayUserSession,
      });
      module.run(context);
      wrapper.update();
      const removeAuthButton = wrapper
        .find(RemoveAuthorisationModal)
        .find({ name: 'removeAuth' })
        .find('button');

      removeAuthButton.simulate('click');

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: DELETE_ONBOARD_USER,
          urlParams: {
            ...context,
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
          },
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_ONBOARDED_DETAILS,
          urlParams: {
            ...context,
          },
        })
      );
    });
  });
});
