import {
  CLOSE_MODAL,
  DELETE_GENERAL_JOURNAL,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../../GeneralJournalIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL } from '../../GeneralJournalMessageTypes';
import GeneralJournalDetailModule from '../GeneralJournalDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import generalJournalDetailReducer from '../generalJournalDetailReducer';

export const setup = () => {
  const setRootView = () => {};
  const pushMessage = jest.fn();
  const integration = new TestIntegration();

  const module = new GeneralJournalDetailModule({ integration, setRootView, pushMessage });
  module.redirectToUrl = jest.fn();
  const store = new TestStore(generalJournalDetailReducer);
  module.store = store;

  return {
    store, module, integration, pushMessage,
  };
};

export const setupWithExisting = () => {
  const {
    store, module, integration, pushMessage,
  } = setup();
  module.run({ generalJournalId: '1', businessId: 'a💩', region: 'au' });
  store.resetActions();
  integration.resetRequests();

  return {
    store, module, integration, pushMessage,
  };
};

export const setupWithNew = () => {
  const {
    store, module, integration, pushMessage,
  } = setup();
  module.run({ generalJournalId: 'new', businessId: 'a💩', region: 'au' });
  store.resetActions();
  integration.resetRequests();

  return {
    store, module, integration, pushMessage,
  };
};

describe('GeneralJournalDetailModule', () => {
  describe('run', () => {
    it('should successfully load new', () => {
      const { store, module, integration } = setup();
      module.run({ generalJournalId: 'new' });

      expect(integration.requests).toEqual([{ intent: LOAD_NEW_GENERAL_JOURNAL }]);
      expect(store.getActions()).toEqual([
        {
          context: {
            generalJournalId: 'new',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_NEW_GENERAL_JOURNAL }),
      ]);
    });

    it('should fail to load new', () => {
      const { store, module, integration } = setup();
      integration.mapFailure(LOAD_NEW_GENERAL_JOURNAL);
      module.run({ generalJournalId: 'new' });

      expect(integration.requests).toEqual([{ intent: LOAD_NEW_GENERAL_JOURNAL }]);
      expect(store.getActions()).toEqual([
        {
          context: {
            generalJournalId: 'new',
          },
          intent: SET_INITIAL_STATE,
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
    });

    it('should successfully load existing', () => {
      const { store, module, integration } = setup();
      module.run({ generalJournalId: '1' });

      expect(integration.requests).toEqual([{ intent: LOAD_GENERAL_JOURNAL_DETAIL }]);
      expect(store.getActions()).toEqual([
        {
          context: {
            generalJournalId: '1',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_GENERAL_JOURNAL_DETAIL }),
      ]);
    });

    it('should fail to load ', () => {
      const { store, module, integration } = setup();
      integration.mapFailure(LOAD_GENERAL_JOURNAL_DETAIL);
      module.run({ generalJournalId: '1' });

      expect(integration.requests).toEqual([{ intent: LOAD_GENERAL_JOURNAL_DETAIL }]);
      expect(store.getActions()).toEqual([
        {
          context: {
            generalJournalId: '1',
          },
          intent: SET_INITIAL_STATE,
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
    });
  });


  describe('updateHeaderOptions', () => {
    it('updates key with value', () => {
      const { module, store } = setupWithNew();

      module.updateHeaderOptions({ key: 'isEndOfYearAdjustment', value: true });

      expect(store.getActions()).toEqual([
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

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: UPDATE_GENERAL_JOURNAL_LINE,
        }),
      ]);
    });
  });

  describe('openCancelModal', () => {
    it('opens when page is edited', () => {
      const { module, store } = setupWithExisting();
      module.addGeneralJournalLine({ accountId: '1' });
      store.resetActions();

      module.openCancelModal();

      expect(store.getActions()).toEqual([{
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

      expect(store.getActions()).toEqual([]);
    });

    it('does nothing when delete modal is open', () => {
      const { module, store } = setupWithExisting();
      module.openDeleteModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
    });
  });

  describe('saveGeneralJournal', () => {
    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.setSubmittingState(true);
      store.resetActions();

      module.saveGeneralJournal();

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('deleteGeneralJournal', () => {
    it('shows alert when it fails', () => {
      const { module, store, integration } = setupWithExisting();
      integration.overrideMapping(DELETE_GENERAL_JOURNAL, ({ onFailure }) => onFailure({ message: 'hello' }));
      module.openDeleteModal();
      store.resetActions();

      module.deleteGeneralJournal();

      expect(integration.getRequests()).toEqual([
        { intent: DELETE_GENERAL_JOURNAL },
      ]);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          alertMessage: 'hello',
          intent: SET_ALERT_MESSAGE,
        },
      ]);
    });

    it('redirect to transaction list with alert', () => {
      const {
        module, store, integration, pushMessage,
      } = setupWithExisting();
      module.openDeleteModal();
      store.resetActions();

      module.deleteGeneralJournal();

      expect(integration.getRequests()).toEqual([
        { intent: DELETE_GENERAL_JOURNAL },
      ]);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_GENERAL_JOURNAL,
        content: 'Great Work! You\'ve done it well!',
      });

      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/a💩/transactionList');
    });
  });
});