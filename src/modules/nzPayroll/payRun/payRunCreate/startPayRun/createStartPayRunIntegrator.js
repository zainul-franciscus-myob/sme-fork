import { CREATE_DRAFT_PAY_RUN } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getCreateDraftPayRunRequestContent } from './StartPayRunSelectors';
import createPayRunIntegrator from '../createPayRunIntegrator';

const createStartPayRunIntegrator = (store, integration) => ({
  ...createPayRunIntegrator(store, integration),
  createDraftPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = CREATE_DRAFT_PAY_RUN;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const content = getCreateDraftPayRunRequestContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createStartPayRunIntegrator;
