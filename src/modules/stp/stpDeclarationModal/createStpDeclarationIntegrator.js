import { RECORD_STP_DECLARATION } from './StpDeclarationModalIntents';
import {
  getStpDeclarationContents,
  getStpDeclarationUrlParams,
} from './StpDeclarationModalSelectors';

const createStpDeclarationModalIntegrator = (store, integration) => ({
  recordStpDeclaration: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getStpDeclarationUrlParams(state);
    const content = getStpDeclarationContents(state);

    integration.write({
      intent: RECORD_STP_DECLARATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createStpDeclarationModalIntegrator;
