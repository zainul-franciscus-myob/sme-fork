import {
  CLOSE_MODAL,
  CREATE_JOB,
  DELETE_JOB,
  LOAD_JOB_DETAIL,
  LOAD_NEW_JOB,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB,
} from '../../JobIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import JobDetailModule from '../JobDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createJobDetailDispatcher from '../createJobDetailDispatcher';
import createJobDetailIntegrator from '../createJobDetailIntegrator';
import jobDetailReducer from '../jobDetailReducer';

describe('JobDetailModule', () => {
  const setup = () => {
    const store = new TestStore(jobDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};

    const module = new JobDetailModule({
      integration,
      setRootView,
      pushMessage,
    });
    module.store = store;
    module.dispatcher = createJobDetailDispatcher(store);
    module.integrator = createJobDetailIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ jobId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('create job', () => {
    it('successfully load new job', () => {
      const { store, integration, module } = setupWithNew();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_NEW_JOB,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_NEW_JOB,
        }),
      ]);
    });

    it('fails to create job', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(LOAD_NEW_JOB);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_NEW_JOB,
        }),
      ]);
    });

    it('successfully save new job', () => {
      const { store, integration, module } = setupWithNew();

      module.updateOrCreateJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_JOB,
        }),
      ]);
    });

    it('fails to save new job', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_JOB);

      module.updateOrCreateJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_JOB,
        }),
      ]);
    });
  });

  describe('update job', () => {
    it('successfully load job', () => {
      const { store, integration, module } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_JOB_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_JOB_DETAIL,
        }),
      ]);
    });

    it('fails to load job', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_JOB_DETAIL);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_JOB_DETAIL,
        }),
      ]);
    });

    it('successfully save job', () => {
      const { store, integration, module } = setup();

      module.updateOrCreateJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_JOB,
        }),
      ]);
    });

    it('fails to save job', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(UPDATE_JOB);

      module.updateOrCreateJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_JOB,
        }),
      ]);
    });
  });

  describe('delete job', () => {
    it('successfully delete job', () => {
      const { store, integration, module } = setup();

      module.deleteJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_JOB,
        }),
      ]);
    });

    it('fail to delete job', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(DELETE_JOB);

      module.deleteJob();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_JOB,
        }),
      ]);
    });
  });
});
