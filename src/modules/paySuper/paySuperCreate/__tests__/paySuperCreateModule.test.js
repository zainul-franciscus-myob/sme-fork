
import Adapter from 'enzyme-adapter-react-16/build';
import Enzyme, { mount } from 'enzyme/build';

import {
  SET_ALERT,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPER_PAYMENTS,
  UPDATE_FILTER_OPTIONS,
} from '../paySuperCreateIntents';
import AuthoriseModal from '../components/AuthoriseModal';
import PaySuperCreateModule from '../PaySuperCreateModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createPaySuperCreateDispatcher from '../createPaySuperCreateDispatcher';
import createPaySuperCreateIntegrator from '../createPaySuperCreateIntegrator';
import loadAccountsAndSuperPaymentsResponse from '../mappings/data/loadAccountsAndSuperPayments';
import paySuperCreateReducer from '../paySuperCreateReducer';

Enzyme.configure({ adapter: new Adapter() });

describe('paySuperCreateModule', () => {
  const constructPaySuperCreateModule = () => {
    const context = {};
    const popMessages = () => (['']);
    const replaceURLParams = url => (url);

    const integration = {
      read: ({ onSuccess }) => {
        onSuccess(
          loadAccountsAndSuperPaymentsResponse,
        );
      },
      write: ({ onSuccess }) => { onSuccess({}); },
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new PaySuperCreateModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });


    module.run(context);
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };

  const setUpModuleWithRunForSortFilterTests = () => {
    const store = new TestStore(paySuperCreateReducer);
    const integration = new TestIntegration();
    const module = new PaySuperCreateModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
    });
    module.store = store;
    module.dispatcher = createPaySuperCreateDispatcher(store);
    module.integrator = createPaySuperCreateIntegrator(store, integration);

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return { store, module, integration };
  };

  describe('authorization modal', () => {
    it('does renders the authorise modal when recordPaySuper is called', () => {
      const { wrapper, module } = constructPaySuperCreateModule();

      module.recordPaySuper();
      wrapper.update();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(1);
    });

    it('does not render the modal on page load', () => {
      const { wrapper } = constructPaySuperCreateModule();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(0);
    });
  });

  describe('authorization code modal', () => {
    it('closes the authorise modal when openAuthoriseModal is called', () => {
      const { wrapper, module } = constructPaySuperCreateModule();

      module.recordPaySuper();
      module.openAuthoriseModal();
      wrapper.update();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(0);
    });
  });

  describe('updateFilterBarOptions', () => {
    it('successfully applies filter', () => {
      const { store, integration, module } = setUpModuleWithRunForSortFilterTests();

      module.updateFilterBarOptions({ filterName: 'dateTo', value: 'dateTo' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_OPTIONS, filterName: 'dateTo', value: 'dateTo' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
    });

    it('fails to apply filter', () => {
      const message = 'ERROR';
      const { store, integration, module } = setUpModuleWithRunForSortFilterTests();
      integration.mapFailure(SORT_AND_FILTER_SUPER_PAYMENTS, { message });

      module.updateFilterBarOptions({ filterName: 'dateFrom', value: 'dateFrom' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_OPTIONS, filterName: 'dateFrom', value: 'dateFrom' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
    });
  });

  describe('sortSuperPayments', () => {
    it('successfully sorts', () => {
      const orderBy = 'amount';
      const { store, integration, module } = setUpModuleWithRunForSortFilterTests();

      module.sortSuperPayments(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
    });

    it('fails to sort', () => {
      const message = 'ERROR';
      const orderBy = 'amount';
      const { store, integration, module } = setUpModuleWithRunForSortFilterTests();
      integration.mapFailure(SORT_AND_FILTER_SUPER_PAYMENTS, { message });

      module.sortSuperPayments(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_PAYMENTS }),
      ]);
    });

    it('flips the sorting order when ordering by the same key', () => {
      const orderBy = 'DateOccurred';
      const { store, module } = setUpModuleWithRunForSortFilterTests();

      module.sortSuperPayments(orderBy);
      module.sortSuperPayments(orderBy);

      expect(store.getActions()).toContainEqual(
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_SORT_ORDER, sortOrder: 'desc', orderBy },
      );
    });
  });
});
