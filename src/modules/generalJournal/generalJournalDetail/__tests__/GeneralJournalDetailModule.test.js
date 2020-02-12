import {
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../../GeneralJournalIntents';
import GeneralJournalDetailModule from '../GeneralJournalDetailModule';
import ModalType from '../ModalType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import generalJournalDetailReducer from '../generalJournalDetailReducer';

export const setup = () => {
  const setRootView = () => {};
  const pushMessage = () => {};
  const integration = new TestIntegration();

  const module = new GeneralJournalDetailModule({ integration, setRootView, pushMessage });
  const store = new TestStore(generalJournalDetailReducer);
  module.store = store;

  return { store, module, integration };
};

export const setupWithExisting = () => {
  const { store, module, integration } = setup();
  module.run({ generalJournalId: '1' });
  store.resetActions();
  integration.resetRequests();

  return { store, module, integration };
};

export const setupWithNew = () => {
  const { store, module, integration } = setup();
  module.run({ generalJournalId: 'new' });
  store.resetActions();
  integration.resetRequests();

  return { store, module, integration };
};

describe('GeneralJournalDetailModule', () => {
  describe('run', () => {
    it('should load new', () => {
      const { module, integration } = setup();
      module.run({ generalJournalId: 'new' });

      expect(integration.requests).toEqual([{ intent: LOAD_NEW_GENERAL_JOURNAL }]);
    });

    it('should load existing', () => {
      const { module, integration } = setup();
      module.run({ generalJournalId: '1' });

      expect(integration.requests).toEqual([{ intent: LOAD_GENERAL_JOURNAL_DETAIL }]);
    });
  });


  describe('updateHeaderOptions', () => {
    it('updates key with value', () => {
      const { module, store } = setupWithNew();

      module.updateHeaderOptions({ key: 'isEndOfYearAdjustment', value: true });

      expect(store.actions).toEqual([
        {
          intent: UPDATE_GENERAL_JOURNAL_HEADER,
          key: 'isEndOfYearAdjustment',
          value: true,
        },
      ]);
    });
  });

  describe('updateGeneralJournalLine', () => {
    it('update line', () => {
      const { module, store } = setupWithExisting();
      const lineIndex = 0;
      const lineKey = 'amount';
      const lineValue = '1';

      module.updateGeneralJournalLine(lineIndex, lineKey, lineValue);

      expect(store.getArrayOfIntents()).toEqual([UPDATE_GENERAL_JOURNAL_LINE]);
    });
  });

  describe('openCancelModal', () => {
    it('opens when page is edited', () => {
      const { module, store } = setupWithExisting();
      module.addGeneralJournalLine({ accountId: '1' });
      store.resetActions();

      module.openCancelModal();

      expect(store.actions).toEqual([{
        intent: OPEN_MODAL,
        modal: {
          type: ModalType.CANCEL,
          url: expect.any(String),
        },
      }]);
    });
  });

  describe('saveHandler', () => {
    it('does nothing when cancel modal is open', () => {
      const setupEditedPage = () => {
        const { module, store } = setupWithExisting();
        module.addGeneralJournalLine({ accountId: '1' });
        module.openCancelModal();
        store.resetActions();

        return { module, store };
      };

      const { module, store } = setupEditedPage();

      module.saveHandler();

      expect(store.actions).toEqual([]);
    });

    it('does nothing when delete modal is open', () => {
      const { module, store } = setupWithExisting();
      module.openDeleteModal();
      store.resetActions();

      module.saveHandler();

      expect(store.actions).toEqual([]);
    });
  });

  describe('saveGeneralJournal', () => {
    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.setSubmittingState(true);
      store.resetActions();

      module.saveGeneralJournal();

      expect(integration.getIntents()).toEqual([]);
    });
  });
});
