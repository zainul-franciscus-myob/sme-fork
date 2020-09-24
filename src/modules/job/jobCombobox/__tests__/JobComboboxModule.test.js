import {
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_JOB_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_JOB,
  SET_JOB_COMBOBOX_LOADING_STATE,
  SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../../JobIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AlertType from '../../../../common/types/AlertType';
import JobComboboxModule from '../JobComboboxModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createJobComboboxDispatcher from '../createJobComboboxDispatcher';
import createJobComboboxIntegrator from '../createJobComboboxIntegrator';
import jobComboboxReducer from '../jobComboboxReducer';

describe('JobComboboxModule', () => {
  const setUp = () => {
    const integration = new TestIntegration();
    const onAlert = jest.fn();

    const module = new JobComboboxModule({ integration, onAlert });

    const store = new TestStore(jobComboboxReducer);
    module.store = store;
    module.dispatcher = createJobComboboxDispatcher({ store });
    module.integrator = createJobComboboxIntegrator({
      store,
      integration,
    });

    return { module, store, integration };
  };

  const setUpWithRun = () => {
    const { module, store, integration } = setUp();

    module.run({
      businessId: 'businessId',
      region: 'au',
    });
    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('run', () => {
    it('successfully load job options', () => {
      const { module, store, integration } = setUp();
      const context = {
        businessId: 'businessId',
        region: 'au',
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('load', () => {
    const setUpWithJobOptions = (jobOptions) => {
      const { module, store, integration } = setUp();
      integration.mapSuccess(LOAD_JOB_COMBOBOX_OPTIONS, { jobOptions });
      module.run({
        businessId: 'businessId',
        region: 'au',
      });
      store.resetActions();
      integration.resetRequests();

      return { module, integration, store };
    };

    it('successfully load options by ids', () => {
      const { module, store, integration } = setUpWithJobOptions([{ id: '1' }]);

      const jobIds = ['2', '3'];
      module.load(jobIds);

      expect(store.getActions()).toEqual([
        { intent: SET_JOB_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_JOB_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
          content: jobIds,
        }),
      ]);
    });
  });

  describe('loadJobComboboxOptions', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();

      module.loadJobOptions();

      expect(store.getActions()).toEqual([
        { intent: SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('searchJobCombobox', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();
      const onSuccess = jest.fn();

      module.searchJob({
        keywords: 'keywords',
        onSuccess,
        onFailure: () => {},
      });

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SEARCH_COMBOBOX_JOB }),
      ]);
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('openJobModal', () => {
    it('open job modal', () => {
      const { module } = setUpWithRun();
      module.jobModalModule.run = jest.fn();

      module.openJobModal();

      expect(module.jobModalModule.run).toHaveBeenCalled();
    });
  });

  describe('loadJobComboboxOptionAfterCreate', () => {
    it('load newly created job and add option to the list', () => {
      const { module, store, integration } = setUpWithRun();
      integration.mapSuccess(LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS, [
        {
          id: '39',
          name: 'apple',
        },
      ]);
      module.onAlert = jest.fn();

      module.loadJobAfterCreate({
        jobId: '39',
        message: 'Success!',
      });

      expect(module.onAlert).toHaveBeenCalledWith({
        type: AlertType.SUCCESS,
        message: 'Success!',
      });
      expect(store.getActions()).toEqual([
        { intent: SET_JOB_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_JOB_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({
          intent: LOAD_JOB_COMBOBOX_OPTION_BY_ID,
          job: { id: '39', name: 'apple' },
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS }),
      ]);
    });
  });
});
