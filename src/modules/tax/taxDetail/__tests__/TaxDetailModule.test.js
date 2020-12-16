import { LOAD_TAX_DETAIL, SET_LOADING_STATE } from '../../TaxIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import TaxDetailModule from '../TaxDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createTaxDetailDispatcher from '../createTaxDetailDispatcher';
import createTaxDetailIntegrator from '../createTaxDetailIntegrator';
import taxDetailReducer from '../taxDetailReducer';

describe('TaxDetailModule', () => {
  const setup = () => {
    const store = new TestStore(taxDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};

    const module = new TaxDetailModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createTaxDetailDispatcher(store);
    module.integrator = createTaxDetailIntegrator(store, integration);

    return { store, integration, module };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();
      module.contactComboboxModule = {
        resetState: jest.fn(),
        run: jest.fn(),
      };

      const taxCodeId = 7;
      const businessId = 123;

      module.run({ taxCodeId, businessId });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { taxCodeId, businessId },
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
          intent: LOAD_TAX_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({
          intent: LOAD_TAX_DETAIL,
          urlParams: {
            taxCodeId,
            businessId,
          },
        })
      );

      expect(module.contactComboboxModule.run).toHaveBeenCalled();
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_TAX_DETAIL);

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
          intent: LOAD_TAX_DETAIL,
        })
      );
    });
  });
});
