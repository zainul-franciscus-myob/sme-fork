import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  OPEN_MODAL,
  SELECT_ALL,
  SELECT_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UNDO_BANK_RECONCILIATION,
  UPDATE_HEADER_OPTION,
  UPDATE_RESULT,
} from './BankReconciliationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getAccountId,
  getCreateBankReconciliationPayload,
  getIsModalActive,
  getIsOutOfBalance,
  getIsSubmitting,
  getSortAndFilterParams,
  getStatementDate,
  getUrlParams,
} from './BankReconciliationSelectors';
import BankReconciliationView from './components/BankReconciliationView';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../store/Store';
import bankReconciliationReducer from './bankReconciliationReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BankReconciliationModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(bankReconciliationReducer);
    this.setRootView = setRootView;
  }

  loadBankReconciliation = () => {
    const state = this.store.getState();

    const urlParams = getUrlParams(state);
    const accountId = getAccountId(state);

    const params = {
      statementDate: getStatementDate(state),
    };

    const intent = accountId
      ? LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT
      : LOAD_BANK_RECONCILIATION;

    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  sortAndFilterBankReconciliation = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const urlParams = getUrlParams(state);

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

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
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
    const state = this.store.getState();

    const isOutOfBalance = getIsOutOfBalance(state);
    if (isOutOfBalance) {
      this.openOutOfBalanceModal();
      return;
    }

    if (getIsSubmitting(state)) return;

    this.setSubmittingState(true);

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
      urlParams: getUrlParams(state),
      content: getCreateBankReconciliationPayload(state),
      onSuccess,
      onFailure,
    });
  };

  undoReconciliation = () => {
    this.closeModal();
    this.setSubmittingState(true);

    const state = this.store.getState();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.setAlert({
        type: 'success',
        message,
      });
      this.sortAndFilterBankReconciliation();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent: UNDO_BANK_RECONCILIATION,
      urlParams: getUrlParams(state),
      onSuccess,
      onFailure,
    });
  }

  openUndoReconciliationModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.UNDO },
    });
  };

  openOutOfBalanceModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.OUT_OF_BALANCE },
    });
  };

  closeModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  }

  render = () => {
    const bankReconciliationView = (
      <BankReconciliationView
        onUpdateHeaderOption={this.updateHeaderOption}
        onSelectRow={this.selectRow}
        onSelectAll={this.selectAll}
        onSort={this.setSortOrder}
        onReconcileButtonClick={this.saveBankReconciliation}
        onDismissAlert={this.dismissAlert}
        onUndoReconciliationClick={this.openUndoReconciliationModal}
        onModalCancel={this.closeModal}
        onUndoBankReconciliationModalConfirm={this.undoReconciliation}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankReconciliationView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();
    const isModalActive = getIsModalActive(state);
    if (isModalActive) return;

    this.saveBankReconciliation();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.setLoadingState(LoadingState.LOADING);
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
