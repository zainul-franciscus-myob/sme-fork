import {
  DELETE_GENERAL_JOURNAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
} from '../GeneralJournalIntents';
import {
  getBusinessId,
  getGeneralJournalId,
  getLoadAccountAfterCreateUrlParams,
  getLoadGeneralJournalRequest,
  getLoadJobAfterCreateUrlParams,
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
  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAccountAfterCreateUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  loadJobAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_AFTER_CREATE;
    const urlParams = getLoadJobAfterCreateUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createGeneralJournalIntegrator;
