import { LOAD_TAX_COMBINE, SET_LOADING_STATE } from '../../TaxIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import TaxCombineModule from '../TaxCombineModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createTaxCombineDispatcher from '../createTaxCombineDispatcher';
import createTaxCombineIntegrator from '../createTaxCombineIntegrator';
import taxCombineReducer from '../taxCombineReducer';

describe('TaxCombineModule', () => {
  const setup = () => {
    const store = new TestStore(taxCombineReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};

    const module = new TaxCombineModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createTaxCombineDispatcher(store);
    module.integrator = createTaxCombineIntegrator(store, integration);

    return { store, integration, module };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();
      const businessId = 123;

      module.run({ businessId });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { businessId },
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
          intent: LOAD_TAX_COMBINE,
        }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: LOAD_TAX_COMBINE,
          urlParams: {
            businessId,
          },
        })
      );
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_TAX_COMBINE);

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
      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: LOAD_TAX_COMBINE,
        })
      );
    });
  });
});
