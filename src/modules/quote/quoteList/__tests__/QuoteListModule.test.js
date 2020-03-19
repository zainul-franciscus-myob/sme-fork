import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../../QuoteIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import QuoteListModule from '../QuoteListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createQuoteListDispatcher from '../createQuoteListDispatcher';
import createQuoteListIntegrator from '../createQuoteListIntegrator';
import quoteListReducer from '../quoteListReducer';

describe('QuoteListModule', () => {
  const setup = () => {
    // Mock loadSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => { };

    const store = new TestStore(quoteListReducer);
    const integration = new TestIntegration();
    const module = new QuoteListModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
    });
    module.store = store;
    module.dispatcher = createQuoteListDispatcher(store);
    module.integrator = createQuoteListIntegrator(store, integration);

    return { store, module, integration };
  };

  const setupWithRun = () => {
    const { store, integration, module } = setup();

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('run', () => {
    const context = {};

    it('successfully load', () => {
      const { store, integration, module } = setup();

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_SUCCESS },
        expect.objectContaining({ intent: LOAD_QUOTE_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_QUOTE_LIST }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_QUOTE_LIST);

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_FAIL },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_QUOTE_LIST }),
      ]);
    });

    it('display alert from inbox', () => {
      const message = 'Message';
      const { store, module } = setup();
      module.popMessages = jest.fn().mockReturnValue([{ content: message }]);

      module.run(context);

      expect(store.getActions()).toContainEqual(
        { intent: SET_ALERT, alert: { type: 'success', message } },
      );
    });
  });

  describe('updateFilterOptions', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.updateFilterOptions({ filterName: 'customerId', value: '1' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_OPTIONS, filterName: 'customerId', value: '1' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
    });

    it('fails to apply filter', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_QUOTE_LIST, { message });

      module.updateFilterOptions({ filterName: 'customerId', value: '1' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_OPTIONS, filterName: 'customerId', value: '1' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
    });
  });

  describe('sortQuoteList', () => {
    it('successfully sort', () => {
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();

      module.sortQuoteList(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
    });

    it('fails to sort', () => {
      const message = 'ERROR';
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_QUOTE_LIST, { message });

      module.sortQuoteList(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_QUOTE_LIST }),
      ]);
    });

    it('flips the sorting order when ordering by the same key', () => {
      const orderBy = 'Overdue';
      const { store, module } = setupWithRun();

      module.sortQuoteList(orderBy);
      module.sortQuoteList(orderBy);

      expect(store.getActions()).toContainEqual(
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_SORT_ORDER, sortOrder: 'desc', orderBy },
      );
    });
  });

  describe('loadQuoteListNextPage', () => {
    it('successfully load next', () => {
      const { store, integration, module } = setupWithRun();

      module.loadQuoteListNextPage();

      expect(store.getActions()).toEqual([
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: true },
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: false },
        expect.objectContaining({ intent: LOAD_QUOTE_LIST_NEXT_PAGE }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_QUOTE_LIST_NEXT_PAGE }),
      ]);
    });

    it('fails to load next', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(LOAD_QUOTE_LIST_NEXT_PAGE, { message });

      module.loadQuoteListNextPage();

      expect(store.getActions()).toEqual([
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: true },
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_QUOTE_LIST_NEXT_PAGE }),
      ]);
    });
  });
});
