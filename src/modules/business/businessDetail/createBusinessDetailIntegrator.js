import {
  LOAD_BUSINESS_DETAIL,
  START_NEW_FINANCIAL_YEAR,
  UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';
import {
  getBusinessForUpdate,
  getBusinessId,
  getLastMonthInNewFinancialYear,
} from './businessDetailSelectors';

const createBusinessDetailIntegrator = (store, integration) => ({
  saveBusinessDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UPDATE_BUSINESS_DETAIL,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getBusinessForUpdate(state),
      onSuccess,
      onFailure,
    });
  },
  loadBusinessDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BUSINESS_DETAIL,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
  startNewFinancialYear: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: START_NEW_FINANCIAL_YEAR,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: {
        lastMonthInFinancialYear: getLastMonthInNewFinancialYear(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createBusinessDetailIntegrator;
