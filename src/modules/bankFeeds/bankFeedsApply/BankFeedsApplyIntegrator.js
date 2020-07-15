import {
  GET_AUTHORITY_FORM,
  GET_REFERENCE_NUMBER,
  LOAD_BANK_FEED_APPLICATION_DATA,
  SUBMIT_BANK_FEED_APPLICATION,
} from './BankFeedsApplyIntents';
import {
  getApplicationId,
  getBusinessId,
  getFinancialInstitutionCode,
  getOnlineBankLink,
  getRegion,
  getSubmitApplicationBody,
} from './BankFeedsApplySelectors';

const BankFeedsApplyIntegrator = (store, integration) => ({
  getAuthorityForm: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_AUTHORITY_FORM;
    const urlParams = { businessId: getBusinessId(state) };

    integration.readFile({
      intent,
      urlParams,
      params: {
        applicationId: getApplicationId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  getReferenceNumber: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    integration.write({
      intent: GET_REFERENCE_NUMBER,
      urlParams,
      content: {
        BankCode: getFinancialInstitutionCode(state),
        BankLink: getOnlineBankLink(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadBankFeedApplicationData: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const params = { region: getRegion(state) };

    integration.read({
      intent: LOAD_BANK_FEED_APPLICATION_DATA,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  submitBankFeedApplication: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSubmitApplicationBody(state);

    integration.write({
      intent: SUBMIT_BANK_FEED_APPLICATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default BankFeedsApplyIntegrator;
