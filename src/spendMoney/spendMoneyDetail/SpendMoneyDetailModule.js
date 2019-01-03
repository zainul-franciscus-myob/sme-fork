import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_ENTRY,
  SUCCESSFULLY_DELETED_ENTRY,
} from '../spendMoneyMessageTypes';
import {
  getCalculatedTotalsPayload,
  getSpendMoney,
  getSpendMoneyForCreatePayload,
  getSpendMoneyId,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
import SpendMoneyIntents from '../SpendMoneyIntents';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import spendMoneyDetailReducer from './spendMoneyDetailReducer';

export default class SpendMoneyDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.pushMessage = pushMessage;
    this.spendMoneyId = '';
  }

  loadSpendMoney = () => {
    const intent = this.isCreating
      ? SpendMoneyIntents.LOAD_NEW_SPEND_MONEY
      : SpendMoneyIntents.LOAD_SPEND_MONEY_DETAIL;

    const urlParams = {
      businessId: this.businessId,
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
    if (isReferenceIdDirty(this.store.state)) {
      return;
    }

    const intent = SpendMoneyIntents.LOAD_REFERENCE_ID;

    const urlParams = {
      businessId: this.businessId,
    };

    const params = { accountId };

    const onSuccess = ({ referenceId }) => {
      if (!isReferenceIdDirty(this.store.state)) {
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
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY_HEADER;

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
      intent: SpendMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  createSpendMoneyEntry = () => {
    const intent = SpendMoneyIntents.CREATE_SPEND_MONEY;
    const content = getSpendMoneyForCreatePayload(this.store.state);
    const urlParams = {
      businessId: this.businessId,
    };
    this.saveSpendMoneyEntry(intent, content, urlParams);
  };

  updateSpendMoneyEntry = () => {
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY;
    const content = getSpendMoney(this.store.state);
    const spendMoneyId = getSpendMoneyId(this.store.state);
    const urlParams = {
      businessId: this.businessId,
      spendMoneyId,
    };
    this.saveSpendMoneyEntry(intent, content, urlParams);
  }

  saveSpendMoneyEntry(intent, content, urlParams) {
    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_ENTRY,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToSpendMoneyList();
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
    const intent = SpendMoneyIntents.SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  openCancelModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;
    if (isPageEdited(this.store.state)) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToSpendMoneyList();
    }
  };

  openDeleteModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = SpendMoneyIntents.CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  redirectToSpendMoneyList = () => {
    window.location.href = `/#/${this.businessId}/spendMoney`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY_LINE;

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
    const intent = SpendMoneyIntents.ADD_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteSpendMoneyLine = (index) => {
    const intent = SpendMoneyIntents.DELETE_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  formatSpendMoneyLine = (index) => {
    const intent = SpendMoneyIntents.FORMAT_SPEND_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  setTotalsLoadingState = (isTotalsLoading) => {
    const intent = SpendMoneyIntents.SET_TOTALS_LOADING_STATE;

    this.store.dispatch({
      intent,
      isTotalsLoading,
    });
  }

  getCalculatedTotals = () => {
    const intent = SpendMoneyIntents.GET_CALCULATED_TOTALS;

    const onSuccess = (totals) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: this.businessId },
      content: getCalculatedTotalsPayload(this.store.state),
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
      intent: SpendMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  deleteSpendMoneyTransaction = () => {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ENTRY,
        content: message,
      });
      this.redirectToSpendMoneyList();
    };

    const onFailure = (error) => {
      this.closeModal();
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: SpendMoneyIntents.DELETE_SPEND_MONEY,
      urlParams: {
        businessId: this.businessId,
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
        onCancelModal={this.redirectToSpendMoneyList}
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
      intent: SpendMoneyIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.spendMoneyId = context.spendMoneyId;
    this.isCreating = context.spendMoneyId === 'new';
    this.resetState();
    this.render();
    this.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
