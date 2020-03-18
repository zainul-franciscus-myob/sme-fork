import {
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../../ContactIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import ContactListModule from '../ContactListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import contactListReducer from '../contactListReducer';
import createContactListDispatcher from '../createContactListDispatcher';
import createContactListIntegrator from '../createContactListIntegrator';

describe('ContactListModule', () => {
  const setup = () => {
    const store = new TestStore(contactListReducer);
    const integration = new TestIntegration();
    const module = new ContactListModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
    });
    module.store = store;
    module.dispatcher = createContactListDispatcher(store);
    module.integrator = createContactListIntegrator(store, integration);

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
        expect.objectContaining({ intent: LOAD_CONTACT_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_LIST }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_CONTACT_LIST);

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_FAIL },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_LIST }),
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

  describe('sortAndFilterContactList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.sortAndFilterContactList();

      expect(store.getActions()).toEqual([
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
    });

    it('fails to apply filter', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_CONTACT_LIST, { message });

      module.sortAndFilterContactList();

      expect(store.getActions()).toEqual([
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
    });
  });

  describe('updateSortOrder', () => {
    it('successfully sort', () => {
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();

      module.updateSortOrder(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
    });

    it('fails to sort', () => {
      const message = 'ERROR';
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_CONTACT_LIST, { message });

      module.updateSortOrder(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
    });

    it('flips the sorting order when ordering by the same key', () => {
      const orderBy = 'Overdue';
      const { store, module } = setupWithRun();

      module.updateSortOrder(orderBy);
      module.updateSortOrder(orderBy);

      expect(store.getActions()).toContainEqual(
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_SORT_ORDER, sortOrder: 'desc', orderBy },
      );
    });
  });

  describe('loadContactListNextPage', () => {
    it('successfully load next', () => {
      const { store, integration, module } = setupWithRun();

      module.loadContactListNextPage();

      expect(store.getActions()).toEqual([
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: true },
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: false },
        expect.objectContaining({ intent: LOAD_CONTACT_LIST_NEXT_PAGE }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_LIST_NEXT_PAGE }),
      ]);
    });

    it('fails to load next', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(LOAD_CONTACT_LIST_NEXT_PAGE, { message });

      module.loadContactListNextPage();

      expect(store.getActions()).toEqual([
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: true },
        { intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_LIST_NEXT_PAGE }),
      ]);
    });
  });

  describe('updateFilterOptions', () => {
    it('updates filter options and triggers filtering', () => {
      const { store, integration, module } = setupWithRun();
      module.updateFilterOptions({ filterName: '🔑', value: '🐼' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_OPTIONS, filterName: '🔑', value: '🐼' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_CONTACT_LIST }),
      ]);
    });
  });
});
