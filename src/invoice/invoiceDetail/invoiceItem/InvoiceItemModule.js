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
  getAmountDue,
  getBusinessId,
  getCreateDuplicateInvoiceURL,
  getCreateNewInvoiceItemURL,
  getCustomerId,
  getHasEmailReplyDetails,
  getInvoiceId,
  getInvoiceListURL,
  getInvoiceReadUpdateWithEmailModalURL,
  getIsAnAmountLineInput,
  getIsCreating,
  getIsLineAmountDirty,
  getIsPageEdited,
  getIsTableEmpty,
  getNewLineIndex,
  getRegion,
  getRouteURLParams,
  getShouldReload,
  getTotalsPayloadForCalculation,
  getTotalsPayloadForLineItemChange,
  getTotalsPayloadForLineRemoval,
  getTotalsPayloadForLineTaxCodeChange,
  getTotalsPayloadForTaxInclusiveChange,
} from './invoiceItemSelectors';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceItemView from './components/InvoiceItemView';
import SaveActionType from '../SaveActionType';
import Store from '../../../store/Store';
import createInvoiceItemDispatcher from './createInvoiceItemDispatcher';
import createInvoiceItemIntegrator from './createInvoiceItemIntegrator';
import invoiceItemReducer from './invoiceItemReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceItemModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams, reload,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.reload = reload;
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

  createOrUpdateInvoice = ({ onSuccess }) => {
    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.saveInvoiceItemDetail({
      isCreating: getIsCreating(this.store.getState()),
      onSuccess,
      onFailure,
    });
  }

  saveInvoice = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushSuccessfulSaveMessage(message);
      this.redirectToInvoiceList();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  executeSaveAndAction = saveAction => (saveAction === SaveActionType.SAVE_AND_CREATE_NEW
    ? this.openSaveAndCreateNewModal()
    : this.openSaveAndDuplicateModal())

  saveAndCreateNewInvoice = () => {
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(state)) {
        this.reload();
      } else {
        this.redirectToURL(getCreateNewInvoiceItemURL(state));
      }
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndDuplicateInvoice = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.saveInvoiceIdForCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToURL(getCreateDuplicateInvoiceURL(this.store.getState()));
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndEmailInvoice = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.saveInvoiceIdForCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToURL(getInvoiceReadUpdateWithEmailModalURL(this.store.getState()));
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveInvoiceAndRedirectToInvoicePayment = () => {
    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
      this.openInvoicePayment();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

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

  updateAmountNewInvoicePaymentAmount = amount => (
    this.dispatcher.updateAmountNewInvoicePaymentAmount(amount)
  );

  getQueryFromParams = (params = {}) => {
    const encode = encodeURIComponent;
    const query = Object.keys(params)
      .map(key => `${encode(key)}=${encode(params[key])}`)
      .join('&');
    return `?${query}`;
  };

  openInvoicePayment = () => {
    const state = this.store.getState();
    const redirectParams = {
      customerId: getCustomerId(state),
      paymentAmount: getAmountDue(state),
      applyPaymentToInvoiceId: getInvoiceId(state),
    };
    const urlParams = this.getQueryFromParams(redirectParams);
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    window.location.href = `/#/${region}/${businessId}/invoicePayment/new${urlParams}`;
  }

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

  redirectToURL = (url) => {
    window.location.href = url;
  }

  redirectToInvoiceList = () => {
    this.redirectToURL(getInvoiceListURL(this.store.getState()));
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
  }

  openSaveAndCreateNewModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_CREATE_NEW);
  }

  openSaveAndDuplicateModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_DUPLICATE);
  }

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.CANCEL);
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => this.dispatcher.setModalType(InvoiceDetailModalType.DELETE);

  openApplyPaymentModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.APPLY_PAYMENT_UNSAVED_CHANGES);
    } else {
      this.openInvoicePayment();
    }
  };

  closeConfirmModal = () => {
    this.setCloseModalType();
  }

  closeEmailSettingsModal = () => {
    this.setCloseModalType();
    this.dispatcher.resetOpenSendEmailParam();
  }

  closeEmailInvoiceDetailModal = () => {
    this.setCloseModalType();
    this.dispatcher.resetEmailInvoiceDetail();
    this.dispatcher.resetOpenSendEmailParam();
  }

  setCloseModalType = () => this.dispatcher.setModalType('');

  displaySuccessMessage = message => this.dispatcher.setAlert({ type: 'success', message });

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  dismissAlert = () => this.dispatcher.dismissAlert();

  dismissModalAlert = () => this.dispatcher.dismissModalAlert();

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_INVOICE_ITEM,
      content: message,
    });
  }

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
        onSaveAndButtonClick={this.executeSaveAndAction}
        onSaveAndEmailButtonClick={this.saveAndEmailInvoice}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        confirmModalListeners={{
          onCancelModalConfirm: this.redirectToInvoiceList,
          onDeleteModalConfirm: this.deleteInvoice,
          onCloseConfirmModal: this.closeConfirmModal,
        }}
        saveAndConfirmModalListeners={{
          onCloseModal: this.closeConfirmModal,
          onConfirmSaveAndCreateNew: this.saveAndCreateNewInvoice,
          onConfirmSaveAndDuplicate: this.saveAndDuplicateInvoice,
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
        onChangeAmountToPay={this.updateAmountNewInvoicePaymentAmount}
        onPayInvoiceButtonClick={this.openApplyPaymentModal}
        applyPaymentUnsavedChangesListeners={{
          onConfirmSave: this.saveInvoiceAndRedirectToInvoicePayment,
          onConfirmUnsave: this.openInvoicePayment,
          onCancel: this.setCloseModalType,
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
