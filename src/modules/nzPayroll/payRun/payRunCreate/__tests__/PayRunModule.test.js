import { mount } from 'enzyme';

import {
  DELETE_DRAFT_PAY_RUN,
  LOAD_BUSINESS_ONBOARDED_STATUS,
  RESTART_PAY_RUN,
  SET_IS_BUSINESS_ONBOARDED,
  SET_LOADING_STATE,
  START_NEW_PAY_RUN,
} from '../PayRunIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import DiscardDraftModal from '../components/DiscardDraftModal';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../components/PageView/LoadingState';
import PayRunModule from '../PayRunModule';
import PayRunView from '../components/PayRunView';
import StartPayrunView from '../startPayRun/components/StartPayRunView';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createPayRunDispatchers from '../createPayRunDispatchers';
import createPayRunIntegrator from '../createPayRunIntegrator';
import loadBusinessOnboardedStatus from '../../mappings/data/payRun/loadBusinessOnboardedResponse';
import payRunReducer from '../payRunReducer';
import startNewPayRunResponse from '../../mappings/data/payRun/startNewPayRun';

describe('PayRunModule', () => {
  describe('UI tests', () => {
    const constructPayRunModule = (successResponse) => {
      const integration = {
        read: ({ intent, onSuccess }) => {
          if (intent === START_NEW_PAY_RUN) {
            onSuccess(successResponse || startNewPayRunResponse);
          }
        },
        write: () => {},
      };

      let wrapper;
      const setRootView = (component) => {
        wrapper = mount(component);
      };

      const payRunModule = new PayRunModule({
        integration,
        setRootView,
        pushMessage: [],
        featureToggles: {},
      });
      payRunModule.run();
      payRunModule.startNewPayRun();

      wrapper.update();
      return wrapper;
    };

    it('renders the title of the start pay run', () => {
      const wrapper = constructPayRunModule();
      const header = wrapper.find({ testid: 'startPayRunViewPageHead' });

      expect(header).toHaveLength(1);
    });

    it('renders the pay cycle', () => {
      const wrapper = constructPayRunModule();
      const payCycleDropDown = wrapper.find({ testid: 'payCycleDropDown' });

      expect(payCycleDropDown).toHaveLength(1);
    });
  });

  describe('Integration test', () => {
    const context = { businessId: '1' };
    afterEach(jest.clearAllMocks);

    const setup = (featureToggles = { isPaydayFilingEnabled: false }) => {
      const store = new TestStore(payRunReducer);
      const integration = new TestIntegration();

      let wrapper;
      const setRootView = (component) => {
        wrapper = mount(component);
      };

      const module = new PayRunModule({
        integration,
        setRootView,
        featureToggles,
      });
      module.store = store;
      module.dispatcher = createPayRunDispatchers(store);
      module.integrator = createPayRunIntegrator(store, integration);

      module.run({});
      store.resetActions();
      integration.resetRequests();

      return {
        store,
        integration,
        module,
        wrapper,
      };
    };

    it('should display LoadingFailPageState when integration call fails', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapFailure(START_NEW_PAY_RUN);

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
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(PayRunView).exists()).toBe(true);
      expect(wrapper.find(StartPayrunView).exists()).toBe(false);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });

    it('should display LoadingSuccessPageState when integration call succeeds', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapSuccess(START_NEW_PAY_RUN, startNewPayRunResponse);

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
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_IS_BUSINESS_ONBOARDED,
          isBusinessOnboarded: false,
        },
        {
          intent: START_NEW_PAY_RUN,
          newPayRunDetails: startNewPayRunResponse.newPayRunDetails,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(StartPayrunView).exists()).toBe(true);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(false);
    });

    it('should display LoadingSuccessPageState when integration call succeeds with paydayfilling enabled', () => {
      const { store, integration, module, wrapper } = setup({
        isPaydayFilingEnabled: true,
      });

      integration.mapSuccess(START_NEW_PAY_RUN, startNewPayRunResponse);
      integration.mapSuccess(
        LOAD_BUSINESS_ONBOARDED_STATUS,
        loadBusinessOnboardedStatus
      );

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
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_IS_BUSINESS_ONBOARDED,
          isBusinessOnboarded: true,
        },
        {
          intent: START_NEW_PAY_RUN,
          newPayRunDetails: startNewPayRunResponse.newPayRunDetails,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_ONBOARDED_STATUS,
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(StartPayrunView).exists()).toBe(true);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(false);
    });

    it('should delete draft pay run and start new pay run when draft pay run is discarded', () => {
      const { store, integration, module, wrapper } = setup();

      // Arrange
      integration.mapSuccess(DELETE_DRAFT_PAY_RUN);
      integration.mapSuccess(START_NEW_PAY_RUN, startNewPayRunResponse);
      store.setState({
        ...store.getState(),
        previousStepModalIsOpen: true,
        draftPayRunId: 7,
      });
      module.run(context);
      wrapper.update();
      const discardButton = wrapper
        .find(DiscardDraftModal)
        .find({ name: 'discard' })
        .find('button');

      // Act
      discardButton.simulate('click');

      // Assert
      expect(store.getActions()).toContainEqual(
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: RESTART_PAY_RUN,
        },
        {
          intent: START_NEW_PAY_RUN,
          newPayRunDetails: startNewPayRunResponse.newPayRunDetails,
        }
      );

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
        expect.objectContaining({
          intent: DELETE_DRAFT_PAY_RUN,
          urlParams: { ...context, draftPayRunId: 7 },
        }),
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
      ]);
    });

    it('should display LoadingFailPageState when LOAD_BUSINESS_ONBOARDED_STATUS call failed  with paydayfilling enabled', () => {
      const { store, integration, module, wrapper } = setup({
        isPaydayFilingEnabled: true,
      });

      integration.mapSuccess(START_NEW_PAY_RUN, startNewPayRunResponse);
      integration.mapFailure(LOAD_BUSINESS_ONBOARDED_STATUS);

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
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_PAY_RUN,
          urlParams: { ...context },
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_ONBOARDED_STATUS,
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(PayRunView).exists()).toBe(true);
      expect(wrapper.find(StartPayrunView).exists()).toBe(false);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });
  });
});
