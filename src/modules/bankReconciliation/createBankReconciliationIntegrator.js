import {
  CREATE_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UNDO_BANK_RECONCILIATION,
} from './BankReconciliationIntents';
import {
  getAccountId,
  getCreateBankReconciliationPayload,
  getSortAndFilterParams,
  getStatementDate,
  getUrlParams,
} from './BankReconciliationSelectors';

const createBankReconciliationIntegrator = (store, integration) => ({
  loadBankReconciliation: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);
    const accountId = getAccountId(state);

    const params = {
      statementDate: getStatementDate(state),
    };

    const intent = accountId
      ? LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT
      : LOAD_BANK_RECONCILIATION;

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterBankReconciliation: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    const params = getSortAndFilterParams(state);

    integration.read({
      intent: SORT_AND_FILTER_BANK_RECONCILIATION,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  saveBankReconciliation: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: CREATE_BANK_RECONCILIATION,
      urlParams: getUrlParams(state),
      content: getCreateBankReconciliationPayload(state),
      onSuccess,
      onFailure,
    });
  },
  undoReconciliation: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UNDO_BANK_RECONCILIATION,
      urlParams: getUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createBankReconciliationIntegrator;
