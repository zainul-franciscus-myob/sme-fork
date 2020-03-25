import {
  DELETE_PAY_RUN_DRAFT, LOAD_EMPLOYEE_PAYS, LOAD_STP_REGISTRATION_STATUS, VALIDATE_STP_REGISTRATION,
} from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getLoadEmployeePaysRequestContent } from './StartPayRunSelectors';
import createPayRunIntegrator from '../createPayRunIntegrator';

const createStartPayRunIntegrator = (store, integration) => ({
  ...createPayRunIntegrator(store, integration),

  loadStpValidation: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent: VALIDATE_STP_REGISTRATION,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadEmployeePays: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_PAYS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const content = getLoadEmployeePaysRequestContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  deleteDraft: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = DELETE_PAY_RUN_DRAFT;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  getStpRegistrationStatus: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_STP_REGISTRATION_STATUS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createStartPayRunIntegrator;
