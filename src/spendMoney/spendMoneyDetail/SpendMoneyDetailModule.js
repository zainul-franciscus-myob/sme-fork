import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY } from '../spendMoneyMessageTypes';
import {
  getCalculatedTotalsPayload,
  getHeaderOptions,
  getIndexOfLastLine,
  getIsActionsDisabled,
  getLineData,
  getNewLineData,
  getSpendMoneyForCreatePayload,
  getTotals,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import CancelModal from './components/SpendMoneyDetailCancelModal';
import SpendMoneyDetailAlert from './components/SpendMoneyDetailAlert';
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
  }

  loadSpendMoney = () => {
    const intent = SpendMoneyIntents.LOAD_NEW_SPEND_MONEY;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ spendMoney, newLine }) => {
      this.setLoadingState(false);
      this.store.publish({
        intent,
        spendMoney,
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
        this.store.publish({
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

    if (key === 'selectedPayFromAccountId') {
      this.loadNextReferenceId(value);
    }

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals();
    }

    this.store.publish({
      intent,
      key,
      value,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.publish({
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

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_ENTRY,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToFeatureList();
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
  };

  setSubmittingState = (isSubmitting) => {
    const intent = SpendMoneyIntents.SET_SUBMITTING_STATE;

    this.store.publish({
      intent,
      isSubmitting,
    });
  }

  openCancelModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'cancel',
    });
  };

  openDeleteModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = SpendMoneyIntents.CLOSE_MODAL;

    this.store.publish({ intent });
  };

  redirectToFeatureList = () => {
    window.location.href = `/#/${this.businessId}/features`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY_LINE;

    this.store.publish({
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

    this.store.publish({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteSpendMoneyLine = (index) => {
    const intent = SpendMoneyIntents.DELETE_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  formatSpendMoneyLine = (index) => {
    const intent = SpendMoneyIntents.FORMAT_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  setTotalsLoadingState = (isTotalsLoading) => {
    const intent = SpendMoneyIntents.SET_TOTALS_LOADING_STATE;

    this.store.publish({
      intent,
      isTotalsLoading,
    });
  }

  getCalculatedTotals = () => {
    const intent = SpendMoneyIntents.GET_CALCULATED_TOTALS;
    const content = getCalculatedTotalsPayload(this.store.state);
    const urlParams = { businessId: this.businessId };

    const onSuccess = (totals) => {
      this.store.publish({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  formatAndCalculateTotals = (line) => {
    this.formatSpendMoneyLine(line);
    this.getCalculatedTotals();
  }

  dismissAlert = () => {
    this.store.publish({
      intent: SpendMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  render = (state) => {
    let modal;
    if (state.modalType === 'cancel') {
      modal = (
        <CancelModal
          onCancel={this.closeModal}
          onConfirm={this.redirectToGeneralJournalList}
        />
      );
    }

    const alertComponent = state.alertMessage && (
      <SpendMoneyDetailAlert type="danger" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </SpendMoneyDetailAlert>
    );

    const spendMoneyView = (
      <SpendMoneyDetailView
        headerOptions={getHeaderOptions(state)}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.createSpendMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        modal={modal}
        alertComponent={alertComponent}
        isCreating={this.isCreating}
        lines={getLineData(state)}
        newLineData={getNewLineData(state)}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onRowInputBlur={this.formatAndCalculateTotals}
        indexOfLastLine={getIndexOfLastLine(state)}
        amountTotals={getTotals(state)}
        isActionsDisabled={getIsActionsDisabled(state)}
      />
    );
    const view = state.isLoading ? (<Spinner />) : spendMoneyView;
    this.setRootView(view);
  };

  setLoadingState = (isLoading) => {
    this.store.publish({
      intent: SpendMoneyIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.publish({
      intent,
    });
  }

  exit() {
    this.resetState();
  }
}
