import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
} from './FinalisationIntents';
import {
  getBusinessId,
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
      year,
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createFinalisationIntegrator;
