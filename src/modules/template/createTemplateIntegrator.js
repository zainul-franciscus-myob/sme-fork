import { CREATE_TEMPLATE, LOAD_TEMPLATE, UPDATE_TEMPLATE } from './TemplateIntents';
import {
  getBusinessId,
  getSavePayload,
} from './templateSelectors';

const createTemplateIntegrator = (store, integration) => ({
  loadTemplate: ({
    onSuccess,
    onFailure,
    templateName,
  }) => {
    const state = store.getState();
    const intent = LOAD_TEMPLATE;

    const urlParams = {
      businessId: getBusinessId(state),
      templateName,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createTemplate: ({
    onSuccess,
    onFailure,
  }) => {
    const state = store.getState();
    const content = getSavePayload(state);

    integration.writeFormData({
      intent: CREATE_TEMPLATE,
      content,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  updateTemplate: ({
    onSuccess,
    onFailure,
    templateId,
  }) => {
    const state = store.getState();
    const content = getSavePayload(state);

    integration.writeFormData({
      intent: UPDATE_TEMPLATE,
      content,
      urlParams: {
        templateId,
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createTemplateIntegrator;