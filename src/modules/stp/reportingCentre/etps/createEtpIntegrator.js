import { DELETE_EMPLOYEE_ETP, LOAD_EMPLOYEE_ETP } from './EtpIntents';
import {
  getBusinessId,
  getDeleteEtpsContent,
  getLoadEmployeeEtpsParams,
  getLoadEmployeeEtpsUrlParams,
} from './EtpSelector';

const createEtpIntegrator = (store, integration) => ({
  loadEmployeeEtps: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getLoadEmployeeEtpsUrlParams(state);
    const params = getLoadEmployeeEtpsParams(state);

    integration.read({
      intent: LOAD_EMPLOYEE_ETP,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  deleteEmployeeEtps: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getDeleteEtpsContent(state);

    integration.write({
      intent: DELETE_EMPLOYEE_ETP,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createEtpIntegrator;
