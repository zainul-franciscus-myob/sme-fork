import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../../TaxIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { isToggleOn } from '../../../../splitToggle';
import LoadingState from '../../../../components/PageView/LoadingState';
import TaxListModule from '../TaxListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createTaxListDispatcher from '../createTaxListDispatcher';
import createTaxListIntegrator from '../createTaxListIntegrator';
import taxListReducer from '../taxListReducer';

jest.mock('../../../../splitToggle', () => ({
  isToggleOn: jest.fn(),
}));

describe('TaxListModule', () => {
  const setup = (isTaxDetailEnabled = true) => {
    const store = new TestStore(taxListReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const module = new TaxListModule({ integration, setRootView });

    isToggleOn.mockReturnValue(isTaxDetailEnabled);

    module.store = store;
    module.dispatcher = createTaxListDispatcher(store);
    module.integrator = createTaxListIntegrator(store, integration);

    return { store, integration, module };
  };

  describe('run', () => {
    it('successfully load', () => {
      const isTaxDetailEnabled = true;
      const { store, integration, module } = setup(isTaxDetailEnabled);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { isTaxDetailEnabled },
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
          intent: LOAD_TAX_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_TAX_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const isTaxDetailEnabled = true;
      const { store, integration, module } = setup(isTaxDetailEnabled);
      integration.mapFailure(LOAD_TAX_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { isTaxDetailEnabled },
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
          intent: LOAD_TAX_LIST,
        }),
      ]);
    });
  });
});
