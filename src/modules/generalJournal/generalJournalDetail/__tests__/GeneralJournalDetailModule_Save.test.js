import {
  CLOSE_MODAL,
  CREATE_GENERAL_JOURNAL,
  SET_ALERT,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL,
} from '../../GeneralJournalIntents';
import { SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../../../../common/types/MessageTypes';
import {
  setupWithExisting,
  setupWithNew,
} from './GeneralJournalDetailModule.test';

describe('GeneralJournalDetailModule', () => {
  describe('saveGeneralJournal', () => {
    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.saveGeneralJournal();

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('create', () => {
    it('successfully creates a new general journal', () => {
      const { module, store, integration } = setupWithNew();
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.saveGeneralJournal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_GENERAL_JOURNAL }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/bizId/transactionList'
      );
    });

    it('fail to create a new general journal', () => {
      const { module, store, integration } = setupWithNew();
      module.pushMessage = jest.fn();
      integration.mapFailure(CREATE_GENERAL_JOURNAL);

      module.saveGeneralJournal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_GENERAL_JOURNAL }),
      ]);
    });
  });

  describe('update', () => {
    it('successfully saves', () => {
      const { module, store, integration } = setupWithExisting();
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.saveGeneralJournal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_GENERAL_JOURNAL,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/bizId/transactionList'
      );
    });

    it('fails to save', () => {
      const { module, store, integration } = setupWithExisting();
      module.pushMessage = jest.fn();
      integration.mapFailure(UPDATE_GENERAL_JOURNAL);

      module.saveGeneralJournal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_GENERAL_JOURNAL,
        }),
      ]);
    });
  });

  describe('unsaved modal confirm actions', () => {
    describe('saves from unsaved modal', () => {
      it('successfully creates a new general journal and reloads module to show fresh create screen', () => {
        const { module, store, integration } = setupWithNew();
        module.pushMessage = jest.fn();
        module.navigateTo = jest.fn();

        module.addGeneralJournalLine({ accountId: '4' }); // edit page
        module.handlePageTransition('/#/au/bizId/generalJournal/new');
        store.resetActions();
        integration.resetRequests();

        module.saveUnsavedChanges();

        expect(store.getActions()).toEqual([
          {
            intent: CLOSE_MODAL,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_GENERAL_JOURNAL }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith(
          expect.objectContaining({ type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL })
        );

        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/bizId/generalJournal/new'
        );
      });

      it('successfully updates a general journal and redirects to modal url', () => {
        const { module, store, integration } = setupWithExisting();
        module.pushMessage = jest.fn();
        module.navigateTo = jest.fn();

        module.addGeneralJournalLine({ accountId: '4' }); // edit page
        module.handlePageTransition('/#/au/bizId/someOtherPage');
        store.resetActions();
        integration.resetRequests();

        module.saveUnsavedChanges();

        expect(store.getActions()).toEqual([
          {
            intent: CLOSE_MODAL,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_GENERAL_JOURNAL }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith(
          expect.objectContaining({ type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL })
        );
        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/bizId/someOtherPage'
        );
      });

      it('fails to save and closes unsaved modal', () => {
        const { module, store, integration } = setupWithNew();
        integration.mapFailure(CREATE_GENERAL_JOURNAL);

        module.addGeneralJournalLine({ accountId: '4' }); // edit page
        module.handlePageTransition('/#/au/bizId/someOtherPage');
        store.resetActions();
        integration.resetRequests();

        module.saveUnsavedChanges();

        expect(store.getActions()).toEqual([
          {
            intent: CLOSE_MODAL,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
          {
            intent: SET_ALERT,
            alert: {
              message: 'fails',
              type: 'danger',
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_GENERAL_JOURNAL }),
        ]);
      });
    });
  });
});
