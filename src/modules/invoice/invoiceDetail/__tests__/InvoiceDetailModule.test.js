import {
  CREATE_INVOICE_DETAIL,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_INVOICE_DETAIL,
} from '../../InvoiceIntents';
import InvoiceDetailModule from '../InvoiceDetailModule';
import Region from '../../../../common/types/Region';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoiceDetailDispatcher from '../createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from '../createInvoiceDetailIntegrator';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';


describe('InvoiceDetailModule', () => {
  const setup = () => {
    const store = new TestStore(invoiceDetailReducer);
    const integration = new TestIntegration();
    const module = new InvoiceDetailModule({
      integration,
      setRootView: () => {},
      pushMessage: () => {},
      popMessages: () => [],
      replaceURLParams: () => {},
      reload: () => {},
    });
    module.store = store;
    module.dispatcher = createInvoiceDetailDispatcher(store);
    module.integrator = createInvoiceDetailIntegrator(store, integration);

    return { store, module, integration };
  };

  const setupWithRun = (isCreating = false) => {
    const { store, integration, module } = setup();

    module.run({ businessId: 'businessId', region: Region.au, invoiceId: isCreating ? 'new' : 'invoiceId' });
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('createOrUpdateInvoice', () => {
    describe.each([
      ['create', true],
      ['update', false],
    ])('On %s', (type, isCreating) => {
      const intent = isCreating
        ? CREATE_INVOICE_DETAIL
        : UPDATE_INVOICE_DETAIL;

      it('successfully save invoice', () => {
        const { store, integration, module } = setupWithRun(isCreating);

        module.createOrUpdateInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([{ intent }]);
      });

      it('show upgrade modal when monthly limit reach', () => {
        const monthlyLimit = { hasHitLimit: true };

        const { store, integration, module } = setupWithRun(isCreating);
        integration.overrideMapping(intent, ({ onSuccess }) => {
          onSuccess({
            message: 'You’ve reached your monthly limit of invoices.',
            monthlyLimit,
          });
        });

        module.createOrUpdateInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_UPGRADE_MODAL_SHOWING, isUpgradeModalShowing: true, monthlyLimit },
        ]);
        expect(integration.getRequests()).toEqual([{ intent }]);
      });
    });
  });
});
