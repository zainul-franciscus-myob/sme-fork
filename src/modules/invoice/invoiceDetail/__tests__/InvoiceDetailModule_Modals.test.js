import {
  LOAD_INVOICE_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_MODAL_TYPE,
} from '../../InvoiceIntents';
import { setup } from './InvoiceDetailModule.test';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import loadInvoiceDetailResponse from '../../mappings/data/serviceLayout/invoiceServiceDetail';

describe('InvoiceDetailModule_Modals', () => {
  describe('emailSettings modal', () => {
    describe('handleSaveEmailSettings', () => {
      const invoiceDetailWithNoEmailDetails = {
        ...loadInvoiceDetailResponse,
        emailInvoice: {
          ...loadInvoiceDetailResponse.emailInvoice,
          hasEmailReplyDetails: false,
        },
      };

      it('should show an alert if any of the required fields is empty', () => {
        const { module, store, integration } = setup();
        integration.mapSuccess(LOAD_INVOICE_DETAIL, {
          ...invoiceDetailWithNoEmailDetails,
          emailInvoice: {
            ...invoiceDetailWithNoEmailDetails.emailInvoice,
            fromEmail: '',
          },
        });

        module.run({ invoiceId: 'invoiceId', businessId: 'businessId', region: 'au' });
        module.saveAndEmailInvoice(); // open email settings modal and not fill out Reply-to email
        store.resetActions();
        integration.resetRequests();

        module.handleSaveEmailSettings();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'danger',
              message: 'Reply-to email address is required',
            },
          },
        ]);
      });

      it('successfully saves email settings and open the email invoice modal', () => {
        const { module, store, integration } = setup();
        integration.mapSuccess(LOAD_INVOICE_DETAIL, invoiceDetailWithNoEmailDetails);

        module.run({ invoiceId: 'invoiceId', businessId: 'businessId', region: 'au' });
        module.saveAndEmailInvoice(); // open email settings modal
        module.updateEmailInvoiceDetail({ key: 'fromEmail', value: 'romeo@meow.com' }); // fill out fromEmail
        store.resetActions();
        integration.resetRequests();

        module.handleSaveEmailSettings();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_SUBMITTING_STATE,
            isModalSubmitting: true,
          },
          expect.objectContaining({
            intent: SAVE_EMAIL_SETTINGS,
          }),
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.NONE,
          },
          {
            intent: SET_MODAL_SUBMITTING_STATE,
            isModalSubmitting: false,
          },
          {
            intent: SET_MODAL_TYPE,
            modalType: InvoiceDetailModalType.EMAIL_INVOICE,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: 'Successfully updated email settings',
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: SAVE_EMAIL_SETTINGS }),
        ]);
      });

      it('fails to save email settings and shows alert on email settings modal', () => {
        const { module, store, integration } = setup();
        integration.mapSuccess(LOAD_INVOICE_DETAIL, invoiceDetailWithNoEmailDetails);
        integration.mapFailure(SAVE_EMAIL_SETTINGS, { message: 'failed' });

        module.run({ invoiceId: 'invoiceId', businessId: 'businessId', region: 'au' });
        module.saveAndEmailInvoice(); // open email settings modal
        module.updateEmailInvoiceDetail({ key: 'fromEmail', value: 'romeo@meow.com' }); // fill out fromEmail
        store.resetActions();
        integration.resetRequests();

        module.handleSaveEmailSettings();

        expect(store.getActions()).toEqual([
          {
            intent: SET_MODAL_SUBMITTING_STATE,
            isModalSubmitting: true,
          },
          {
            intent: SET_MODAL_SUBMITTING_STATE,
            isModalSubmitting: false,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'danger',
              message: 'failed',
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: SAVE_EMAIL_SETTINGS }),
        ]);
      });
    });
  });
});
