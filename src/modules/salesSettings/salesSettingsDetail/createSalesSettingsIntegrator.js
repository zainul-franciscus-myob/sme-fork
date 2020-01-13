import {
  DELETE_TEMPLATE,
  LOAD_PAY_DIRECT_SETTINGS,
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  SORT_TEMPLATE_LIST,
  UPDATE_SALES_SETTINGS,
} from '../SalesSettingsIntents';
import { getBusinessId } from './SalesSettingsDetailSelectors';


const createInTrayIntegrator = (store, integration) => ({
  loadSalesSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_SALES_SETTINGS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  updateSalesSettings: ({ onSuccess, onFailure, content }) => {
    const intent = UPDATE_SALES_SETTINGS;
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  saveEmailSettings: ({ onSuccess, onFailure, content }) => {
    const intent = SAVE_EMAIL_SETTINGS;
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  sortTemplateList: ({
    sortOrder,
    onSuccess,
    onFailure,
  }) => {
    const intent = SORT_TEMPLATE_LIST;
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      params: {
        sortOrder,
      },
      onSuccess,
      onFailure,
    });
  },

  deleteTemplate: ({
    templateName,
    onSuccess,
    onFailure,
  }) => {
    const intent = DELETE_TEMPLATE;
    const state = store.getState();
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

  loadPayDirectSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_PAY_DIRECT_SETTINGS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },
});

export default createInTrayIntegrator;
