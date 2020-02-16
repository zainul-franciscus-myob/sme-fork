import {
  DELETE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';
import {
  getBusinessId,
  getGeneralJournalId,
  getLoadGeneralJournalRequest,
  getSaveGeneralJournalRequest,
} from './generalJournalDetailSelectors';

const createGeneralJournalIntegrator = (store, integration) => ({
  deleteGeneralJournal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const generalJournalId = getGeneralJournalId(state);
    const businessId = getBusinessId(state);

    integration.write({
      intent: DELETE_GENERAL_JOURNAL,
      urlParams: {
        businessId,
        generalJournalId,
      },
      onSuccess,
      onFailure,
    });
  },
  loadGeneralJournalDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      ...getLoadGeneralJournalRequest(state),
      onSuccess,
      onFailure,
    });
  },
  saveGeneralJournalDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      ...getSaveGeneralJournalRequest(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createGeneralJournalIntegrator;
