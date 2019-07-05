import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DELETE_SPEND_MONEY_LINE,
  FORMAT_SPEND_MONEY_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTALS_LOADING_STATE,
  UPDATE_SPEND_MONEY,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
} from '../SpendMoneyIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
} from '../spendMoneyMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getIsTableEmpty,
  getRegion,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
  getSpendMoneyId,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
import Store from '../../store/Store';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';
import spendMoneyDetailReducer from './spendMoneyDetailReducer';


export default class SpendMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.spendMoneyId = '';
  }

  loadSpendMoney = () => {
    const intent = this.isCreating
      ? LOAD_NEW_SPEND_MONEY
      : LOAD_SPEND_MONEY_DETAIL;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
      ...(!this.isCreating && { spendMoneyId: this.spendMoneyId }),
    };

    const onSuccess = ({ spendMoney, newLine, totals }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        spendMoney,
        totals,
        newLine,
        isLoading: false,
      });
    };

    const onFailure = () => {
      console.log('Failed to load spend money details');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  loadNextReferenceId = (accountId) => {
    const state = this.store.getState();
    if (isReferenceIdDirty(state)) {
      return;
    }

    const intent = LOAD_REFERENCE_ID;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = { accountId };

    const onSuccess = ({ referenceId }) => {
      if (!isReferenceIdDirty(this.store.getState())) {
        this.store.dispatch({
          intent,
          referenceId,
        });
      }
    };

    const onFailure = () => {
      console.log('Failed to load the next reference Id');
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    const intent = UPDATE_SPEND_MONEY_HEADER;

    if (key === 'selectedPayFromAccountId' && this.isCreating) {
      this.loadNextReferenceId(value);
    }

    this.store.dispatch({
      intent,
      key,
      value,
    });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals();
    }
  };

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  createSpendMoneyEntry = () => {
    const intent = CREATE_SPEND_MONEY;
    const state = this.store.getState();
    const content = getSpendMoneyForCreatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveSpendMoneyEntry(intent, content, urlParams);
  };

  updateSpendMoneyEntry = () => {
    const intent = UPDATE_SPEND_MONEY;
    const state = this.store.getState();
    const content = getSpendMoneyForUpdatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
      spendMoneyId: getSpendMoneyId(state),
    };
    this.saveSpendMoneyEntry(intent, content, urlParams);
  }

  saveSpendMoneyEntry(intent, content, urlParams) {
    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
    this.setSubmittingState(true);
  }

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTotals();
    }
  }

  addSpendMoneyLine = (partialLine) => {
    const intent = ADD_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteSpendMoneyLine = (index) => {
    const intent = DELETE_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  formatSpendMoneyLine = (index) => {
    const intent = FORMAT_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  setTotalsLoadingState = (isTotalsLoading) => {
    const intent = SET_TOTALS_LOADING_STATE;

    this.store.dispatch({
      intent,
      isTotalsLoading,
    });
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.store.dispatch({
        intent: RESET_TOTALS,
      });
      return;
    }

    const intent = GET_CALCULATED_TOTALS;

    const onSuccess = (totals) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(this.store.getState()),
      onSuccess,
      onFailure,
    });
  }

  formatAndCalculateTotals = (line) => {
    this.formatSpendMoneyLine(line);
    this.getCalculatedTotals();
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  deleteSpendMoneyTransaction = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SPEND_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: DELETE_SPEND_MONEY,
      urlParams: {
        businessId: getBusinessId(this.store.getState()),
        spendMoneyId: this.spendMoneyId,
      },
      onSuccess,
      onFailure,
    });
  }

  render = () => {
    const spendMoneyView = (
      <SpendMoneyDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.isCreating
          ? this.createSpendMoneyEntry : this.updateSpendMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToTransactionList}
        onDeleteModal={this.deleteSpendMoneyTransaction}
        onDismissAlert={this.dismissAlert}
        isCreating={this.isCreating}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onRowInputBlur={this.formatAndCalculateTotals}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {spendMoneyView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  saveSpendMoney = () => {
    if (this.isCreating) {
      this.createSpendMoneyEntry();
    } else {
      this.updateSpendMoneyEntry();
    }
  }

  handlers = {
    SAVE_ACTION: this.saveSpendMoney,
  };

  run(context) {
    this.setInitialState(context);
    this.spendMoneyId = context.spendMoneyId;
    this.isCreating = context.spendMoneyId === 'new';
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
