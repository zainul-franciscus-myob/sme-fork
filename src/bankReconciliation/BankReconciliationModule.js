import { Provider } from 'react-redux';
import React from 'react';

import {
  CREATE_BANK_RECONCILIATION,
  FORMAT_AMOUNT,
  LOAD_BANK_RECONCILIATION,
  SELECT_ALL,
  SELECT_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UPDATE_HEADER_OPTION,
  UPDATE_RESULT,
} from './BankReconciliationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import {
  getAccountId,
  getBusinessId,
  getCreateBankReconciliationPayload,
  getSortAndFilterParams,
  getStatementDate,
} from './BankReconciliationSelectors';
import BankReconciliationView from './components/BankReconciliationView';
import Store from '../store/Store';
import bankReconciliationReducer from './bankReconciliationReducer';
import keyMap from '../hotKeys/keyMap';
import setupHotKeys from '../hotKeys/setupHotKeys';

export default class BankReconciliationModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(bankReconciliationReducer);
    this.setRootView = setRootView;
  }

  loadBankReconciliation = () => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = {
      statementDate: getStatementDate(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent: LOAD_BANK_RECONCILIATION,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load bank reconciliation');
    };

    this.integration.read({
      intent: LOAD_BANK_RECONCILIATION,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  sortAndFilterBankReconciliation = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const urlParams = {
      businessId: getBusinessId(state),
      accountId: getAccountId(state),
    };

    const params = getSortAndFilterParams(state);

    const onSuccess = (response) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        ...response,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.read({
      intent: SORT_AND_FILTER_BANK_RECONCILIATION,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  }

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  };

  shouldLoad = (key, value) => [
    'selectedAccountId', 'statementDate',
  ].includes(key) && value.length > 0;

  updateHeaderOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_HEADER_OPTION,
      key,
      value,
    });

    if (this.shouldLoad(key, value)) {
      this.sortAndFilterBankReconciliation();
    }
  };

  formatAmount = ({ key, value }) => this.store.dispatch({
    intent: FORMAT_AMOUNT,
    key,
    value,
  });

  selectRow = ({ index, value }) => this.store.dispatch({
    intent: SELECT_ROW,
    index,
    value,
  });

  selectAll = () => this.store.dispatch({
    intent: SELECT_ALL,
  });

  setSortOrder = (orderBy) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
    });

    this.sortAndFilterBankReconciliation();
  };

  updateReconciliationResult = () => {
    this.store.dispatch({
      intent: UPDATE_RESULT,
    });
  };

  saveBankReconciliation = () => {
    this.setSubmittingState(true);

    const state = this.store.getState();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.updateReconciliationResult();
      this.setAlert({
        type: 'success',
        message,
      });
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent: CREATE_BANK_RECONCILIATION,
      urlParams: {
        businessId: getBusinessId(state),
        accountId: getAccountId(state),
      },
      content: getCreateBankReconciliationPayload(state),
      onSuccess,
      onFailure,
    });
  };

  render = () => {
    const bankReconciliationView = (
      <BankReconciliationView
        onUpdateHeaderOption={this.updateHeaderOption}
        onAmountInputBlur={this.formatAmount}
        onSelectRow={this.selectRow}
        onSelectAll={this.selectAll}
        onSort={this.setSortOrder}
        onReconcileButtonClick={this.saveBankReconciliation}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankReconciliationView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.saveBankReconciliation,
  };

  run = (context) => {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.setLoadingState(true);
    this.render();
    this.loadBankReconciliation();
  };

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
