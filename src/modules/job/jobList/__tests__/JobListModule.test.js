import {
  FILTER_JOB_LIST,
  LOAD_JOB_LIST,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
} from '../../JobIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import JobListModule from '../JobListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createJobListDispatcher from '../createJobListDispatcher';
import createJobListIntegrator from '../createJobListIntegrator';
import jobListReducer from '../jobListReducer';

describe('JobListModule', () => {
  const businessId = 'businessId';
  const setup = () => {
    const store = new TestStore(jobListReducer);
    const integration = new TestIntegration();
    const module = new JobListModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
      isToggleOn: () => true,
    });
    module.store = store;
    module.dispatcher = createJobListDispatcher(store);
    module.integrator = createJobListIntegrator(store, integration);

    return { store, module, integration };
  };

  const setupWithRun = () => {
    const { store, integration, module } = setup();

    module.run({ businessId });
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('run', () => {
    const context = { isJobEnabled: true, businessId };

    it('successfully load', () => {
      const { store, integration, module } = setup();

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_JOB_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_JOB_LIST }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_JOB_LIST);

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_FAIL },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_JOB_LIST }),
      ]);
    });

    it('display alert from inbox', () => {
      const message = 'Message';
      const { store, module } = setup();
      module.popMessages = jest.fn().mockReturnValue([{ content: message }]);

      module.run(context);

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: { type: 'success', message },
      });
    });
  });

  describe('filterJobList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.filterJobList();

      expect(store.getActions()).toEqual([
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: FILTER_JOB_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: FILTER_JOB_LIST }),
      ]);
    });

    it('fails to apply filter', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(FILTER_JOB_LIST, { message });

      module.filterJobList();

      expect(store.getActions()).toEqual([
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: FILTER_JOB_LIST }),
      ]);
    });
  });

  describe('resetFilterOptions', () => {
    it('successfully resets filter', () => {
      const { store, integration, module } = setupWithRun();
      const defaultFilterOptions = store.getState().filterOptions;

      store.setState({
        ...store.getState(),
        filterOptions: {
          keywords: 'test',
          showInactive: true,
        },
      });
      module.resetFilterOptions();

      expect(store.getActions()).toEqual([
        { intent: RESET_FILTER_OPTIONS },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({
          intent: FILTER_JOB_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: FILTER_JOB_LIST,
          params: expect.objectContaining(defaultFilterOptions),
          urlParams: { businessId },
        },
      ]);
    });
  });
});
