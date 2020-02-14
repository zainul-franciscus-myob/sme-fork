import {
  CREATE_GENERAL_JOURNAL, SET_ALERT_MESSAGE, SET_SUBMITTING_STATE, UPDATE_GENERAL_JOURNAL,
} from '../../GeneralJournalIntents';
import { setupWithExisting, setupWithNew } from './GeneralJournalDetailModule.test';

describe('GeneralJournalDetailModule', () => {
  [
    {
      name: 'save from unsaved modal',
      setup: (module) => {
        module.openUnsavedModal('/#/au/a💩/transactionList');
      },
      do: (module) => {
        module.saveHandler();
      },
    },
    {
      name: 'save',
      setup: () => {},
      do: (module) => {
        module.saveGeneralJournal();
      },
    },
  ].forEach((test) => {
    describe('update', () => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = setupWithExisting();
        test.setup(module);
        store.resetActions();

        test.do(module);

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

        expect(integration.getRequests()).toEqual([{
          intent: UPDATE_GENERAL_JOURNAL,
        }]);

        expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/a💩/transactionList');
      });

      it(`fail to ${test.name}`, () => {
        const { module, store, integration } = setupWithExisting();
        test.setup(module);
        integration.mapFailure(UPDATE_GENERAL_JOURNAL);
        store.resetActions();

        test.do(module);

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
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);

        expect(integration.getRequests()).toEqual([{
          intent: UPDATE_GENERAL_JOURNAL,
        }]);
      });
    });

    describe('create', () => {
      it(`successfully ${test.name}`, () => {
        const { module, store, integration } = setupWithNew();
        test.setup(module);
        store.resetActions();

        test.do(module);

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

        expect(integration.getRequests()).toEqual([{ intent: CREATE_GENERAL_JOURNAL }]);

        expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/a💩/transactionList');
      });

      it(`fail to ${test.name}`, () => {
        const { module, store, integration } = setupWithNew();
        test.setup(module);
        integration.mapFailure(CREATE_GENERAL_JOURNAL);
        store.resetActions();

        test.do(module);

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
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);

        expect(integration.getRequests()).toEqual([{ intent: CREATE_GENERAL_JOURNAL }]);
      });
    });
  });
});
