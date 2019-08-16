import { Provider } from 'react-redux';
import React from 'react';

import {
  CALCULATE_LINE,
  REMOVE_LINE,
  UPDATE_INVOICE_ITEM_TAX_INCLUSIVE,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
} from './InvoiceItemIntents';
import { SUCCESSFULLY_DELETED_INVOICE_ITEM, SUCCESSFULLY_EMAILED_INVOICE, SUCCESSFULLY_SAVED_INVOICE_ITEM } from '../invoiceMessageTypes';
import {
  areLinesCalculating,
  getBusinessId,
  getHasEmailReplyDetails,
  getInvoiceId,
  getIsAnAmountLineInput,
  getIsCreating,
  getIsLineAmountDirty,
  getIsPageEdited,
  getIsTableEmpty,
  getNewLineIndex,
  getRegion,
  getRouteURLParams,
  getShouldShowEmailModalAfterSave,
  getTotalsPayloadForCalculation,
  getTotalsPayloadForLineItemChange,
  getTotalsPayloadForLineRemoval,
  getTotalsPayloadForLineTaxCodeChange,
  getTotalsPayloadForTaxInclusiveChange,
} from './invoiceItemSelectors';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceItemView from './components/InvoiceItemView';
import Store from '../../../store/Store';
import createInvoiceItemDispatcher from './createInvoiceItemDispatcher';
import createInvoiceItemIntegrator from './createInvoiceItemIntegrator';
import invoiceItemReducer from './invoiceItemReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceItemModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(invoiceItemReducer);
    this.integrator = createInvoiceItemIntegrator(this.store, this.integration);
    this.dispatcher = createInvoiceItemDispatcher(this.store);
  }

  loadCustomerAddress = () => {
    const onSuccess = ({ address }) => {
      this.dispatcher.setContactAddress(address);
    };
    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setContactAddress('');
    };

    this.integrator.loadCustomerAddress({
      onSuccess,
      onFailure,
    });
  };

  updateInvoiceOption = ({ key, value }) => {
    this.dispatcher.updateInvoiceOption(key, value);
    if (key === 'customerId') {
      this.loadCustomerAddress();
    }
  };

  setAreLinesCalculating = (linesCalculating) => {
    this.dispatcher.setAreLinesCalculating(linesCalculating);
  }

  setLineAmountDirty = (isLineAmountDirty) => {
    this.dispatcher.setLineAmountDirty(isLineAmountDirty);
  }

  updateLines = (requestPayload, intent) => {
    this.setAreLinesCalculating(true);

    const onSuccess = (response) => {
      this.setLineAmountDirty(false);
      this.setAreLinesCalculating(false);
      this.dispatcher.updateLines(response);
    };

    const onFailure = ({ message }) => {
      this.setLineAmountDirty(false);
      this.setAreLinesCalculating(false);
      this.displayFailureAlert(message);
    };

    this.integrator.updateLines({
      intent,
      requestPayload,
      onSuccess,
      onFailure,
    });
  };

  updateIsTaxInclusive = ({ key, value }) => {
    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);
    const isTableEmpty = getIsTableEmpty(state);

    if (!isLineAmountDirty) {
      this.dispatcher.updateInvoiceOption(key, value);

      const newState = this.store.getState();

      if (!isTableEmpty) {
        this.updateLines(
          getTotalsPayloadForTaxInclusiveChange(newState),
          UPDATE_INVOICE_ITEM_TAX_INCLUSIVE,
        );
      }
    }
  };

  updateLineTaxCode = () => {
    const state = this.store.getState();

    this.updateLines(
      getTotalsPayloadForLineTaxCodeChange(state),
      UPDATE_LINE_TAX_CODE,
    );
  };

  addTableLine = (line) => {
    this.dispatcher.addLine(line);

    const { itemId } = line;
    if (itemId) {
      const state = this.store.getState();

      this.updateLineItem({
        index: getNewLineIndex(state),
        itemId,
      });
    }
  };

  changeTableRow = (index, key, value) => {
    this.dispatcher.changeTableRow(index, key, value);

    if (getIsAnAmountLineInput(key)) {
      this.setLineAmountDirty(true);
    }

    if (key === 'itemId') {
      this.updateLineItem({
        index,
        itemId: value,
      });
    }

    if (key === 'taxCodeId') {
      this.updateLineTaxCode({
        index,
        value,
      });
    }
  };

  removeTableRow = (index) => {
    const state = this.store.getState();

    if (!areLinesCalculating(state)) {
      this.dispatcher.removeLine(index);

      const newState = this.store.getState();
      const isTableEmpty = getIsTableEmpty(newState);

      if (isTableEmpty) {
        this.dispatcher.resetTotals();
      } else {
        this.updateLines(
          getTotalsPayloadForLineRemoval(newState),
          REMOVE_LINE,
        );
      }
    }
  };

  lineCalculation = ({ index, key }) => {
    this.dispatcher.formatLineAmount(index, key);

    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (isLineAmountDirty) {
      this.updateLines(
        getTotalsPayloadForCalculation(state, index, key),
        CALCULATE_LINE,
      );
    }
  };

  updateLineItem = ({ index, itemId }) => {
    const state = this.store.getState();

    this.updateLines(
      getTotalsPayloadForLineItemChange({ state, index, itemId }),
      UPDATE_LINE_ITEM,
    );
  };

  redirectToInvoiceReadUpdateView = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const invoiceId = getInvoiceId(state);

    window.location.href = `/#/${region}/${businessId}/invoice/${invoiceId}?openSendEmail=true`;
  }

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/invoice`;
  };

  createInvoice = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message, id }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_ITEM,
        content: message,
      });
      this.dispatcher.saveInvoiceIdForCreate(id);
      this.transitionAfterSave();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.createInvoice({
      onSuccess,
      onFailure,
    });
  };

  updateInvoice = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_ITEM,
        content: message,
      });
      this.transitionAfterSave();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.updateInvoice({
      onSuccess,
      onFailure,
    });
  };

  deleteInvoice = () => {
    this.dispatcher.setSubmittingState(true);
    this.closeConfirmModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_ITEM,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.deleteInvoice({
      onSuccess,
      onFailure,
    });
  };

  openInvoiceAndQuoteSettingsTab = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const invoiceAndQuoteSettingsUrl = `/#/${region}/${businessId}/salesSettings`;
    window.open(invoiceAndQuoteSettingsUrl);
  }

  openSalesSettingsTabAndCloseModal = () => {
    this.openInvoiceAndQuoteSettingsTab();
    this.closeEmailSettingsModal();
  }

  transitionAfterSave = () => {
    const state = this.store.getState();
    if (getShouldShowEmailModalAfterSave(state)) {
      this.redirectToInvoiceReadUpdateView();
    } else {
      this.redirectToInvoiceList();
    }
  }

  saveInvoice = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    return isCreating
      ? this.createInvoice()
      : this.updateInvoice();
  };

  saveAndEmailInvoice = () => {
    this.dispatcher.setShowEmailModalAfterSave(true);
    this.saveInvoice();
  }

  updateEmailInvoiceDetail = ({ key, value }) => {
    this.dispatcher.updateEmailInvoiceDetail(key, value);
  }

  sendEmail = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_EMAILED_INVOICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.closeEmailInvoiceDetailModal();
      this.displayFailureAlert(message);
    };

    this.integrator.sendEmail({
      onSuccess,
      onFailure,
    });
  }

  openEmailInvoiceModal = () => {
    const state = this.store.getState();
    if (getHasEmailReplyDetails(state)) {
      this.openEmailInvoiceDetailModal();
    } else {
      this.openEmailSettingsModal();
    }
  }

  openEmailSettingsModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.EMAIL_SETTINGS);
  }

  openEmailInvoiceDetailModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.EMAIL_INVOICE);
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.CANCEL);
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => this.dispatcher.setModalType(InvoiceDetailModalType.DELETE);

  closeConfirmModal = () => {
    this.setCloseModalType();
  }

  closeEmailSettingsModal = () => {
    this.setCloseModalType();
    this.dispatcher.setShowEmailModalAfterSave(false);
    this.dispatcher.resetOpenSendEmailParam();
  }

  closeEmailInvoiceDetailModal = () => {
    this.setCloseModalType();
    this.dispatcher.setShowEmailModalAfterSave(false);
    this.dispatcher.resetEmailInvoiceDetail();
    this.dispatcher.resetOpenSendEmailParam();
  }

  setCloseModalType = () => this.dispatcher.setModalType('');

  displaySuccessMessage = message => this.dispatcher.setAlert({ type: 'success', message });

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  dismissAlert = () => this.dispatcher.dismissAlert();

  dismissModalAlert = () => this.dispatcher.dismissModalAlert();

  render = () => {
    const invoiceItemView = (
      <InvoiceItemView
        onUpdateInvoiceOption={this.updateInvoiceOption}
        onUpdateTaxInclusive={this.updateIsTaxInclusive}
        onAddTableLine={this.addTableLine}
        onChangeTableRow={this.changeTableRow}
        onRemoveTableRow={this.removeTableRow}
        onLineInputBlur={this.lineCalculation}
        onDismissAlert={this.dismissAlert}
        onSaveButtonClick={this.saveInvoice}
        onSaveAndEmailButtonClick={this.saveAndEmailInvoice}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        confirmModalListeners={{
          onCancelModalConfirm: this.redirectToInvoiceList,
          onDeleteModalConfirm: this.deleteInvoice,
          onCloseConfirmModal: this.closeConfirmModal,
        }}
        emailSettingsModalListeners={{
          onConfirm: this.openSalesSettingsTabAndCloseModal,
          onCloseModal: this.closeEmailSettingsModal,
          onDismissAlert: this.dismissModalAlert,
        }}
        emailInvoiceDetailModalListeners={{
          onConfirm: this.sendEmail,
          onCloseModal: this.closeEmailInvoiceDetailModal,
          onEmailInvoiceDetailChange: this.updateEmailInvoiceDetail,
          onDismissAlert: this.dismissModalAlert,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoiceItemView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  }

  handlers = {
    SAVE_ACTION: this.saveInvoice,
  };

  updateURLFromState = (state) => {
    const params = getRouteURLParams(state);
    this.replaceURLParams(params);
  }

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.store.subscribe(this.updateURLFromState);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
