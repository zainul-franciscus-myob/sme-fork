import {
  CREATE_ACCOUNT_MODAL,
  LOAD_NEW_ACCOUNT_MODAL,
} from '../../../account/AccountIntents';
import {
  CREATE_RECURRING_BILL,
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_ALERT,
  SET_MODAL,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
} from '../RecurringBillIntents';
import { mockCreateObjectUrl, setUpWithRun } from './RecurringBillModule.test';
import ModalType from '../types/ModalType';

describe('RecurringBillModule_Modal', () => {
  mockCreateObjectUrl();

  describe('account modal', () => {
    it('runs the accountModalModule when modal opens', () => {
      const { module } = setUpWithRun({ isCreating: true });
      module.accountModalModule.run = jest.fn();

      module.openAccountModal();
      expect(module.accountModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId',
          region: 'au',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('saves the newly added account, calls the line onChange and shows success alert on page when user successfully saves the newly created account on the account modal', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });

      const onChange = jest.fn();
      module.accountModalModule.close = jest.fn();

      const createAccountSuccessPayload = { id: 'id', message: 'message' };
      integration.mapSuccess(CREATE_ACCOUNT_MODAL, createAccountSuccessPayload);

      const loadAccountAfterCreateSuccessPayload = {
        id: 'afterId',
        message: 'afterCreateSuccess',
      };
      integration.mapSuccess(
        LOAD_ACCOUNT_AFTER_CREATE,
        loadAccountAfterCreateSuccessPayload
      );

      module.openAccountModal(onChange);
      module.accountModalModule.save();

      expect(store.getActions()).toEqual([
        { intent: SET_ALERT, alert: { type: 'success', message: 'message' } },
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({ intent: LOAD_ACCOUNT_AFTER_CREATE }),
      ]);

      expect(integration.getRequests()).toContainEqual({
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        urlParams: { businessId: 'bizId', accountId: 'id' },
      });

      expect(onChange).toHaveBeenCalledWith(
        loadAccountAfterCreateSuccessPayload
      );
      expect(module.accountModalModule.close).toHaveBeenCalled();
    });

    it('displays page failure alert when inventory modal fails to load', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });

      module.accountModalModule.close = jest.fn();
      integration.mapFailure(LOAD_NEW_ACCOUNT_MODAL, { message: 'failed' });

      module.openAccountModal();

      expect(store.getActions()).toEqual([
        { intent: SET_ALERT, alert: { type: 'danger', message: 'failed' } },
      ]);

      expect(module.accountModalModule.close).toHaveBeenCalled();
    });
  });

  describe('cancel modal', () => {
    it('opens cancel modal if page has been edited', () => {
      const { module, store } = setUpWithRun({ isCreating: true });
      module.addBillLine({ id: '2', description: 'hello' });
      store.resetActions();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        { intent: SET_MODAL, modalType: ModalType.CancelModal },
      ]);
    });

    describe('when page not edited', () => {
      it('redirects to recurring transaction list on new recurring bill', () => {
        const { module } = setUpWithRun({ isCreating: true });
        module.navigateTo = jest.fn();

        module.openCancelModal();

        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/bizId/recurringTransaction'
        );
      });

      it('redirects to recurring transaction list on existing recurring bill', () => {
        const { module } = setUpWithRun();
        module.navigateTo = jest.fn();

        module.openCancelModal();

        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/bizId/recurringTransaction'
        );
      });
    });
  });

  describe('unsaved modal', () => {
    it('opens unsaved modal if page has been edited', () => {
      const { module, store } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      store.resetActions();

      module.handlePageTransition('/#/foo');

      expect(store.getActions()).toEqual([
        { intent: SET_REDIRECT_URL, redirectUrl: '/#/foo' },
        { intent: SET_MODAL, modalType: ModalType.Unsaved },
      ]);
    });

    it('redirect to target url if page not edited ', () => {
      const { module, navigateTo } = setUpWithRun({ isCreating: true });
      module.handlePageTransition('/#/foo');

      expect(navigateTo).toBeCalledWith('/#/foo');
    });

    it('should save and redirect when confirm modal', () => {
      const { module, integration, navigateTo } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.saveAndRedirect();
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_RECURRING_BILL }),
      ]);
      expect(navigateTo).toBeCalledWith('/#/bar');
    });

    it('should redirect without save when click on discard', () => {
      const { module, integration, navigateTo } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.discardAndRedirect();
      expect(integration.getRequests()).toEqual([]);
      expect(navigateTo).toBeCalledWith('/#/bar');
    });
  });
});
