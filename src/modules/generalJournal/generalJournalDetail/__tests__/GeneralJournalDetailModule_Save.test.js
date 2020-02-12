import { CREATE_GENERAL_JOURNAL, SET_SUBMITTING_STATE, UPDATE_GENERAL_JOURNAL } from '../../GeneralJournalIntents';
import { setupWithExisting, setupWithNew } from './GeneralJournalDetailModule.test';

const mockRedirectToUrl = (module) => {
  // eslint-disable-next-line no-param-reassign
  module.redirectToUrl = () => {};
};

describe('GeneralJournalDetailModule', () => {
  describe('update', () => {
    [
      {
        name: 'save from unsaved modal',
        setup: (module) => {
          module.openUnsavedModal('url');
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
      it(test.name, () => {
        const { module, store, integration } = setupWithExisting();
        mockRedirectToUrl(module);
        test.setup(module);
        store.resetActions();

        test.do(module);

        expect(store.actions).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getIntents()).toEqual([UPDATE_GENERAL_JOURNAL]);
      });
    });
  });

  describe('create', () => {
    [
      {
        name: 'save from unsaved modal',
        setup: (module) => {
          module.openUnsavedModal('url');
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
      it(test.name, () => {
        const { module, store, integration } = setupWithNew();
        mockRedirectToUrl(module);
        test.setup(module);
        store.resetActions();

        test.do(module);

        expect(store.actions).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getIntents()).toEqual([CREATE_GENERAL_JOURNAL]);
      });
    });
  });
});
