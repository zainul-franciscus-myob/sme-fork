import {
  CREATE_INVOICE_DETAIL,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  RELOAD_INVOICE_DETAIL,
  SET_ALERT,
  SET_INVOICE_HISTORY_LOADING,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_INVOICE_DETAIL,
  UPDATE_INVOICE_ID_AFTER_CREATE,
} from '../../InvoiceIntents';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceDetailModule from '../InvoiceDetailModule';
import Region from '../../../../common/types/Region';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoiceDetailDispatcher from '../createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from '../createInvoiceDetailIntegrator';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';
import loadInvoiceDetailResponse from '../../mappings/data/serviceLayout/invoiceServiceDetail';

export const setup = () => {
  const store = new TestStore(invoiceDetailReducer);
  const integration = new TestIntegration();
  const module = new InvoiceDetailModule({
    integration,
    setRootView: () => {},
    pushMessage: () => {},
    popMessages: () => [],
    replaceURLParams: () => {},
    reload: () => {},
    featureToggles: { isInvoiceJobColumnEnabled: true },
  });
  module.store = store;
  module.dispatcher = createInvoiceDetailDispatcher(store);
  module.integrator = createInvoiceDetailIntegrator(store, integration);

  return { store, module, integration };
};

export const setupWithRun = ({ isCreating = false, isPageEdited = false } = {}) => {
  const { store, integration, module } = setup();

  module.run({ businessId: 'businessId', region: Region.au, invoiceId: isCreating ? 'new' : 'invoiceId' });

  if (isPageEdited) {
    module.updateHeaderOptions({ key: 'note', value: 'random' });
  }

  store.resetActions();
  integration.resetRequests();

  return { store, integration, module };
};

describe('InvoiceDetailModule', () => {
  describe('createOrUpdateInvoice', () => {
    describe.each([
      ['create', true],
      ['update', false],
    ])('On %s', (type, isCreating) => {
      const intent = isCreating
        ? CREATE_INVOICE_DETAIL
        : UPDATE_INVOICE_DETAIL;

      it('successfully save invoice', () => {
        const { store, integration, module } = setupWithRun({ isCreating });

        module.createOrUpdateInvoice({ onSuccess: () => {} });

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent }),
        ]);
      });

      it('show upgrade modal when monthly limit reach', () => {
        const monthlyLimit = { hasHitLimit: true };

        const { store, integration, module } = setupWithRun({ isCreating });
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
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent }),
        ]);
      });
    });
  });

  describe('handleSaveInvoice', () => {
    const setUpWithClosedInvoiceEdited = () => {
      const { module, store, integration } = setup();
      integration.overrideMapping(LOAD_INVOICE_DETAIL, ({ onSuccess }) => {
        onSuccess({
          ...loadInvoiceDetailResponse,
          invoice: {
            ...loadInvoiceDetailResponse.invoice,
            status: 'Closed',
          },
        });
      });

      module.run({ invoiceId: 'invoiceId', businessId: 'bizId', region: 'au' });
      module.updateHeaderOptions({ key: 'option', value: 'A' });

      store.resetActions();
      integration.resetRequests();

      return { module, store, integration };
    };

    it('should open save amount due warning modal', () => {
      const { module, store } = setUpWithClosedInvoiceEdited();

      module.handleSaveInvoice();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: InvoiceDetailModalType.SAVE_AMOUNT_DUE_WARNING,
        },
      ]);
    });
  });

  describe('saveInvoice', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, load history, and show success alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        module.replaceURLParams = jest.fn();

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_ALERT, alert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('show danger alert when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('show danger alert when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice', () => {
      it('update invoice, reload invoice and show success alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        module.replaceURLParams = jest.fn();

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_ALERT, alert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('show danger alert when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('show danger alert when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });
  });

  describe('saveAndEmailInvoice', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, load history, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EMAIL_INVOICE },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open email modal when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has been edited', () => {
      it('update invoice, reload invoice, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EMAIL_INVOICE },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open email modal when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has not been edited', () => {
      const setUpWithEdited = () => {
        const { module, store, integration } = setupWithRun();
        module.updateHeaderOptions({ key: 'note', value: 'random' });
        store.resetActions();

        return { module, store, integration };
      };

      it('update invoice, reload invoice, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithEdited();
        module.replaceURLParams = jest.fn();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EMAIL_INVOICE },
          { intent: SET_MODAL_ALERT, modalAlert: { type: 'success', message: "Great Work! You've done it well!" } },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open email modal when update invoice failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open email modal when reload invoice failed', () => {
        const { module, store, integration } = setUpWithEdited();
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('does not have reply email address', () => {
      it('open email settings', () => {
        const { module, store, integration } = setup();
        integration.mapSuccess(LOAD_INVOICE_DETAIL, {
          ...loadInvoiceDetailResponse,
          emailInvoice: {
            ...loadInvoiceDetailResponse.emailInvoice,
            hasEmailReplyDetails: false,
          },
        });
        module.run({
          invoiceId: 'invoiceId', businessId: 'businessId', region: 'au',
        });
        store.resetActions();
        integration.resetRequests();

        module.saveAndEmailInvoice();

        expect(store.getActions()).toEqual(expect.arrayContaining([
          { intent: SET_MODAL_TYPE, modalType: '' },
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EMAIL_SETTINGS },
        ]));
      });
    });
  });

  describe('openExportPdfModalOrSaveAndExportPdf', () => {
    describe('new invoice', () => {
      it('create invoice, update invoice id, update url params, reload invoice, history, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_INVOICE_HISTORY_LOADING },
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_HISTORY }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open export pdf modal when create invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(CREATE_INVOICE_DETAIL, { message });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId: '1' },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has been edited', () => {
      it('update invoice, reload invoice, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          expect.objectContaining({ intent: RELOAD_INVOICE_DETAIL }),
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(UPDATE_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
        ]);
      });

      it('does not open export pdf modal when reload invoice failed', () => {
        const { module, store, integration } = setupWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(LOAD_INVOICE_DETAIL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
          { intent: SET_SUBMITTING_STATE, isSubmitting: false },
          { intent: SET_ALERT, alert: { type: 'danger', message } },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_INVOICE_DETAIL }),
          expect.objectContaining({ intent: LOAD_INVOICE_DETAIL }),
        ]);
      });
    });

    describe('existing invoice that has not been edited', () => {
      it('open export pdf modal', () => {
        const { module, store, integration } = setupWithRun();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });
  });
});
