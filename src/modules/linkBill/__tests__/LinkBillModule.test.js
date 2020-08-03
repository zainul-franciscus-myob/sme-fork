import {
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../LinkBillIntents';
import LinkBillModule from '../LinkBillModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createLinkBillDispatcher from '../createLinkBillDispatcher';
import createLinkBillIntegrator from '../createLinkBillIntegrator';
import linkBillReducer from '../linkBillReducer';

const setup = () => {
  const setRootView = () => {};
  const pushMessage = () => {};
  const store = new TestStore(linkBillReducer);
  const integration = new TestIntegration();

  const module = new LinkBillModule({ integration, setRootView, pushMessage });
  module.store = store;
  module.dispatcher = createLinkBillDispatcher(store);
  module.integrator = createLinkBillIntegrator(store, integration);

  return { store, module, integration };
};

describe('LinkBillModule', () => {
  const businessId = 'businessId';

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('updateFilterOptions', () => {
    it('successfully applies the filter', () => {
      const { module, store, integration } = setupWithRun();

      module.updateFilterOptions({ key: 'showPaidBills', value: true });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_FILTER_OPTIONS,
          key: 'showPaidBills',
          value: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
          params: expect.objectContaining({
            showPaidBills: true,
          }),
        }),
      ]);
    });
  });

  describe('resetFilterOptions', () => {
    it('successfully resets the filter', () => {
      const { module, store, integration } = setupWithRun();
      const defaultFilterOptions = store.getState().filterOptions;

      store.setState({
        ...store.getState(),
        filterOptions: {
          supplierId: 'Any',
          showPaidBills: true,
        },
      });
      module.resetFilterOptions();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_FILTER_OPTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_BILL_LIST,
          params: expect.objectContaining(defaultFilterOptions),
          urlParams: { businessId },
        },
      ]);
    });
  });

  describe('updateSortOption', () => {
    it('successfuly applies sorting', () => {
      const { module, store, integration } = setupWithRun();

      const orderBy = 'SupplierName';
      module.updateSortOption(orderBy);

      const expectedSortOrder = 'asc';

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          orderBy,
          sortOrder: expectedSortOrder,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
          params: expect.objectContaining({
            orderBy,
            sortOrder: expectedSortOrder,
          }),
        }),
      ]);
    });

    it('fails to apply the sort', () => {
      const { module, store, integration } = setupWithRun();

      const message = 'ERROR';
      integration.mapFailure(SORT_AND_FILTER_BILL_LIST, { message });

      const orderBy = 'SupplierName';
      module.updateSortOption(orderBy);

      const expectedSortOrder = 'asc';

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          orderBy,
          sortOrder: expectedSortOrder,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message,
          },
        },
      ]);
    });
  });
});
