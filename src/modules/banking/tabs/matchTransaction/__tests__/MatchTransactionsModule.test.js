import {
  RESET_MATCH_TRANSACTION_OPTIONS,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
} from '../MatchTransactionIntents';
import MatchTransactionShowType from '../../../types/MatchTransactionShowType';
import MatchTransactionsModule from '../MatchTransactionsModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createMatchTransactionDispatcher from '../createMatchTransactionDispatcher';
import createMatchTransactionIntegrator from '../createMatchTransactionIntegrator';
import reducer, {
  getMatchTransactionsDefaultState,
} from '../matchTransactionReducer';

const defaultContext = {
  businessId: 'some-business',
  region: 'au',
  contactId: 'contact-id',
  taxCodes: [{ id: 'tax-code' }],
  jobs: [{ id: 'jobs' }],
  accounts: [{ id: 'accounts' }],
  bankAccountId: '123',
  showType: MatchTransactionShowType.CLOSE_MATCHES,
  transaction: {
    id: '1',
    amount: 100,
    date: '20/12/2020',
    isWithdrawal: true,
    description: 'some-description',
    note: '',
  },
};

describe('MatchTransactionsModule', () => {
  const setUpWithRun = (context = undefined) => {
    const integration = new TestIntegration();

    const store = new TestStore(reducer);
    const module = new MatchTransactionsModule({
      integration,
      setAlert: jest.fn(),
    });

    module.store = store;
    module.dispatcher = createMatchTransactionDispatcher(store);
    module.integrator = createMatchTransactionIntegrator(store, integration);

    module.run(context || defaultContext);
    store.setState({
      ...store.getState(),
      isOpen: true, // Banking module sets this for submodule
    });
    store.resetActions();

    return {
      module,
      store,
      integration,
    };
  };

  describe('updateMatchTransactionOptions', () => {
    it('successfully sorts and filters', () => {
      const { module, integration, store } = setUpWithRun();

      module.updateMatchTransactionOptions({ key: 'contactId', value: '🙅‍♀️' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
          key: 'contactId',
          value: '🙅‍♀️',
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
          params: expect.objectContaining({
            contactId: '🙅‍♀️',
          }),
        }),
      ]);
    });

    it('fails to sorts and filters', () => {
      const { module, integration, store } = setUpWithRun();
      integration.mapFailure(SORT_AND_FILTER_MATCH_TRANSACTIONS);

      module.updateMatchTransactionOptions({ key: 'contactId', value: '🙅‍♀️' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
          key: 'contactId',
          value: '🙅‍♀️',
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: false,
        },
      ]);

      expect(module.setAlert).toHaveBeenCalled();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
          params: expect.objectContaining({
            contactId: '🙅‍♀️',
          }),
        }),
      ]);
    });
  });

  describe('resetMatchTransactionOptions', () => {
    it('successfully resets filters', () => {
      const { module, integration, store } = setUpWithRun();

      const defaultFilterOptions = getMatchTransactionsDefaultState()
        .filterOptions;

      module.resetMatchTransactionOptions();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_MATCH_TRANSACTION_OPTIONS,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
          params: expect.objectContaining(defaultFilterOptions),
        }),
      ]);
    });
  });
});
