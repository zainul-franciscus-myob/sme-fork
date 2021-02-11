import {
  DELETE_DRAFT_PAY_RUN,
  LOAD_PAYDAY_ONBOARDED_STATUS,
  START_NEW_PAY_RUN,
} from './PayRunIntents';
import { getBusinessId, getDraftPayRunId } from './PayRunSelectors';

const createPayRunIntegrator = (store, integration) => ({
  startNewPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = START_NEW_PAY_RUN;

    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  deleteDraftPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = DELETE_DRAFT_PAY_RUN;
    const urlParams = {
      businessId: getBusinessId(state),
      draftPayRunId: getDraftPayRunId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadPayDayOnboardedStatus: ({ onSuccess, onFailure }) => {
    const intent = LOAD_PAYDAY_ONBOARDED_STATUS;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createPayRunIntegrator;
