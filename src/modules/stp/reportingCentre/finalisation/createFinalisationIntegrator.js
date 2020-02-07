import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  SUBMIT_EMPLOYEES_FINALISATION,
  SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
} from './FinalisationIntents';
import {
  getBusinessId, getSubmitEmployeesFinalisationContent, getSubmitEmployeesRemoveFinalisationContent,
} from './FinalisationSelector';

const createFinalisationIntegrator = (store, integration) => ({
  loadInitialEmployeesAndHeaderDetails: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadHeadersAndEmployeesForYear: ({ onSuccess, onFailure, year }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    const params = {
      year,
    };

    integration.read({
      intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  submitEmployeesFinalisation: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSubmitEmployeesFinalisationContent(state);

    integration.write({
      intent: SUBMIT_EMPLOYEES_FINALISATION,
      urlParams,
      onSuccess,
      onFailure,
      content,
    });
  },

  submitEmployeesRemoveFinalisation: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSubmitEmployeesRemoveFinalisationContent(state);

    integration.write({
      intent: SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
      urlParams,
      onSuccess,
      onFailure,
      content,
    });
  },
});

export default createFinalisationIntegrator;
