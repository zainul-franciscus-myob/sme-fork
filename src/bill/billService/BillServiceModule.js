import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_BILL_SERVICE_LINE,
  CLOSE_MODAL,
  CREATE_BILL_SERVICE_DETAIL,
  DELETE_BILL_DETAIL,
  FORMAT_BILL_SERVICE_LINE,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  OPEN_MODAL,
  REMOVE_BILL_SERVICE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_SERVICE_DETAIL,
  UPDATE_BILL_SERVICE_HEADER_OPTIONS,
  UPDATE_BILL_SERVICE_LINE,
} from '../BillIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_SERVICE, SUCCESSFULLY_SAVED_BILL_SERVICE } from '../billMessageTypes';
import {
  getBillId,
  getBillPayload,
  getBusinessId,
  getCalculatedTotalsPayload,
  getContactId,
  getIsCreating,
  getIsTableEmpty,
  getRegion,
  isPageEdited,
} from './billServiceSelectors';
import BillServiceView from './components/BillServiceView';
import Store from '../../store/Store';
import billServiceReducer from './billServiceReducer';

export default class BillServiceModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(billServiceReducer);
  }

  resetTotals = () => this.store.dispatch({ intent: RESET_TOTALS });

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.resetTotals();
      return;
    }
    const intent = GET_CALCULATED_BILL_DETAIL_TOTALS;
    const onSuccess = ({ totals }) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };
    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  setContactAddress = address => this.store.dispatch({
    intent: LOAD_CUSTOMER_ADDRESS,
    address,
  })

  loadContactAddress = () => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };

    const onSuccess = ({ address }) => this.setContactAddress(address);

    const onFailure = (error) => {
      this.displayAlert(error.message);
      this.setContactAddress('');
    };

    this.integration.read({
      intent: LOAD_CUSTOMER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BILL_SERVICE_HEADER_OPTIONS,
      key,
      value,
    });

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'contactId') {
      this.loadContactAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BILL_SERVICE_LINE,
      index,
      key,
      value,
    });

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }
  }

  addTableLine = line => this.store.dispatch({
    intent: ADD_BILL_SERVICE_LINE,
    line,
  })

  removeTableLineAndCalculateTotals = (index) => {
    this.store.dispatch({
      intent: REMOVE_BILL_SERVICE_LINE,
      index,
    });

    this.getCalculatedTotals();
  }

  redirectToBillList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill`;
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToBillList();
    }
  };

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: 'delete',
  });

  closeModal = () => this.store.dispatch({
    intent: CLOSE_MODAL,
  });

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  saveBillServiceEntry = (intent, content, urlParams) => {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_SERVICE,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  updateBillServiceEntry = () => {
    const intent = UPDATE_BILL_SERVICE_DETAIL;
    const state = this.store.getState();
    const billId = getBillId(state);
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      billId,
    };
    this.saveBillServiceEntry(intent, content, urlParams);
  }

  createBillServiceEntry = () => {
    const intent = CREATE_BILL_SERVICE_DETAIL;
    const state = this.store.getState();
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveBillServiceEntry(intent, content, urlParams);
  }

  deleteBillEntry = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_SERVICE,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    const state = this.store.getState();
    const billId = getBillId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      billId,
    };

    this.integration.write({
      intent: DELETE_BILL_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  formatLine = index => this.store.dispatch({
    intent: FORMAT_BILL_SERVICE_LINE,
    index,
  });

  formatAndCalculateTotals = (index) => {
    this.formatLine(index);
    this.getCalculatedTotals();
  }

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const billServiceView = (
      <BillServiceView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveButtonClick={isCreating ? this.createBillServiceEntry : this.updateBillServiceEntry}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToBillList}
        onDeleteButtonClick={this.openDeleteModal}
        onDeleteModal={this.deleteBillEntry}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {billServiceView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context, payload) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
      ...payload,
    });
  }

  run({ context, payload }) {
    this.setInitialState(context, payload);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
