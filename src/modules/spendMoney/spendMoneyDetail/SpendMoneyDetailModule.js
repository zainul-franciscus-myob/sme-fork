import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
} from '../spendMoneyMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getContactModalContext,
  getCreateAndNewUrl,
  getCreateUrl,
  getDuplicatedSpendMoneyId,
  getDuplicatedUrl,
  getExpenseAccountId,
  getFilesForUpload,
  getHasPrefilledLines,
  getInTrayDocumentId,
  getInTrayUrl,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLineAmountsTaxInclusive,
  getIsSubmitting,
  getIsTableEmpty,
  getIsTaxInclusive,
  getLinesForTaxCalculation,
  getLinkInTrayContentWithoutSpendMoneyId,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getShouldReloadModule,
  getShouldShowAccountCode,
  getSpendMoneyId,
  getTaxCodeOptions,
  getTransactionListUrl,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './components/ModalType';
import SaveActionType from './components/SaveActionType';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
import SpendMoneyElementId from './SpendMoneyElementId';
import Store from '../../../store/Store';
import createSpendMoneyDispatcher from './createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from './createSpendMoneyIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import spendMoneyDetailReducer from './spendMoneyDetailReducer';

export default class SpendMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, reload, featureToggles,
  }) {
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.reload = reload;
    this.dispatcher = createSpendMoneyDispatcher(this.store);
    this.integrator = createSpendMoneyIntegrator(this.store, integration);
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.spendMoney);

    this.isSpendMoneyJobColumnEnabled = featureToggles.isSpendMoneyJobColumnEnabled;

    this.accountModalModule = new AccountModalModule({ integration });
    this.contactModalModule = new ContactModalModule({ integration });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: message => this.dispatcher.setAlert({ type: 'danger', message }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.setAlert({ type: 'success', message });
    this.dispatcher.setSubmittingState(true);
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  openContactModal = () => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onSaveSuccess: payload => this.loadContactAfterCreate(payload),
      onLoadFailure: message => this.dispatcher.setAlert({ type: 'danger', message }),
    });
  }

  loadContactAfterCreate = ({ message, id }) => {
    this.dispatcher.setAlert({ type: 'success', message });
    this.dispatcher.setSubmittingState(true);
    this.contactModalModule.resetState();

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadContactAfterCreate(id, payload);

      const state = this.store.getState();
      if (getShouldShowAccountCode(state) && getExpenseAccountId(state)) {
        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      }
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadContactAfterCreate({ id, onSuccess, onFailure });
  }

  prefillSpendMoneyFromInTray(inTrayDocumentId) {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.prefillDataFromInTray(response);

      const hasPrefilledLines = getHasPrefilledLines(this.store.getState());
      if (hasPrefilledLines) {
        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.prefillDataFromInTray({ onSuccess, onFailure, inTrayDocumentId });
  }

  loadSpendMoney = () => {
    const state = this.store.getState();

    const onSuccess = intent => (response) => {
      this.dispatcher.loadSpendMoney(intent, response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });

      const inTrayDocumentId = getInTrayDocumentId(state);
      if (inTrayDocumentId) {
        this.prefillSpendMoneyFromInTray(inTrayDocumentId);
        this.openSplitView();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSpendMoney({
      onSuccess,
      onFailure,
    });
  };

  loadNextReferenceId = (accountId) => {
    const onSuccess = ({ referenceId }) => {
      if (!isReferenceIdDirty(this.store.getState())) {
        this.dispatcher.loadReferenceId(referenceId);
      }
    };

    const onFailure = () => {
      // eslint-disable-next-line no-console
      console.log('Failed to load the next reference Id');
    };

    this.integrator.loadNextReferenceId({
      onSuccess,
      onFailure,
      accountId,
      updateBankStatementText: this.dispatcher.updateBankStatementText,
    });
  };

  loadSupplierExpenseAccount = () => {
    this.dispatcher.setSupplierBlockingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSupplierBlockingState(false);
      this.dispatcher.loadSupplierExpenseAccount(response);

      if (getExpenseAccountId(this.store.getState())) {
        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      }
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'danger' });
      this.dispatcher.setSupplierBlockingState(false);
    };

    this.integrator.loadSupplierExpenseAccount({ onSuccess, onFailure });
  };

  updateHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateHeaderOptions({ key, value });

    if (key === 'selectedPayFromAccountId') {
      if (getIsCreating(this.store.getState())) {
        this.loadNextReferenceId(value);
      } else {
        this.dispatcher.updateBankStatementText();
      }
    }

    if (key === 'isTaxInclusive') {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }

    if (key === 'expenseAccountId') {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }

    const stateAfterUpdate = this.store.getState();
    if (key === 'selectedPayToContactId' && getShouldShowAccountCode(stateAfterUpdate)) {
      this.loadSupplierExpenseAccount();
    }
  };

  getSaveHandlers = () => ({
    onSuccess: (response) => {
      const state = this.store.getState();
      if (getIsCreatingFromInTray(state)) {
        this.linkAfterSave(this.redirectAfterLink, response);
        return;
      }
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: response.message,
      });

      this.dispatcher.setSubmittingState(false);

      const url = getSaveUrl(state);
      if (this.isRedirectToSamePage(url)) {
        this.reload();
      } else this.redirectToUrl(url);
    },

    onFailure: (error) => {
      if (getModal(this.store.getState())) {
        this.dispatcher.closeModal();
      }
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message: error.message,
      });
    },
  });

  linkAfterSave = (onSuccess, response) => {
    const state = this.store.getState();

    const handleLinkSuccess = () => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: response.message,
      });
      this.dispatcher.setSubmittingState(false);
      onSuccess(response);
    };

    const handleLinkFailure = () => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
        content: 'Spend money created, but the document failed to link.',
      });
      this.dispatcher.setSubmittingState(false);
      onSuccess(response);
    };

    const linkContent = {
      id: response.id,
      ...getLinkInTrayContentWithoutSpendMoneyId(state),
    };

    this.integrator.linkInTrayDocument({
      onSuccess: handleLinkSuccess,
      onFailure: handleLinkFailure,
      linkContent,
    });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const isCreatingFromIntray = getIsCreatingFromInTray(state);
    if (isPageEdited(this.store.getState())) {
      const intrayUrl = getInTrayUrl(state);
      const transactionListUrl = getTransactionListUrl(state);

      if (isCreatingFromIntray) {
        this.dispatcher.openModal({ type: ModalType.CANCEL, url: intrayUrl });
      } else { this.dispatcher.openModal({ type: ModalType.CANCEL, url: transactionListUrl }); }
    } else if (isCreatingFromIntray) {
      this.redirectToInTrayList();
    } else this.redirectToTransactionList();
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.dispatcher.openModal({ type: ModalType.DELETE, url: transactionListUrl });
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  }

  handleOnDiscardButtonClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    if (this.isRedirectToSamePage(url)) {
      if (getIsCreatingFromInTray(state)
        || getDuplicatedSpendMoneyId(state)) {
        this.redirectToUrl(getCreateUrl(state));
      } else {
        this.reload();
      }
    } else {
      this.redirectToUrl(url);
    }
  }

  redirectAfterLink = () => {
    const state = this.store.getState();
    const redirectUrl = getSaveUrl(state);

    if (this.isRedirectToSamePage(redirectUrl)) {
      // Not calling reload here because reload preserves the inTrayDocumentId param
      // and so prefills the spend money if the user is clicking on the nav option
      // to create Spend Money from a Create Spend Money from In Tray,
      // on successful link and save, the page should redirects to
      // Create Spend Money without prefill
      this.redirectToUrl(getCreateUrl(state));
    } else {
      this.redirectToUrl(redirectUrl);
    }
  };

  redirectToInTrayList = () => {
    const state = this.store.getState();
    const inTrayUrl = getInTrayUrl(state);

    window.location.href = inTrayUrl;
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    window.location.href = transactionListUrl;
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  isRedirectToSamePage = (redirectUrl) => window.location.href.includes(redirectUrl);

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    this.dispatcher.updateSpendMoneyLine(lineIndex, lineKey, lineValue);

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

  addSpendMoneyLine = (line) => {
    const { id, ...partialLine } = line;
    this.dispatcher.addSpendMoneyLine(partialLine);
  }

  deleteSpendMoneyLine = (index) => {
    this.dispatcher.deleteSpendMoneyLine(index);

    this.getTaxCalculations({ isSwitchingTaxInclusive: false });
  }

  formatAndCalculateTotals = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

  getTaxCalculations = ({ isSwitchingTaxInclusive }) => {
    const state = this.store.getState();

    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const isTaxInclusive = getIsTaxInclusive(state);
    const taxCalculations = this.taxCalculate({
      isTaxInclusive,
      lines: getLinesForTaxCalculation(state),
      taxCodes: getTaxCodeOptions(state),
      isLineAmountsTaxInclusive: getIsLineAmountsTaxInclusive(
        isTaxInclusive, isSwitchingTaxInclusive,
      ),
    });

    this.dispatcher.getTaxCalculations(taxCalculations);
  };

  deleteSpendMoneyTransaction = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SPEND_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message: error.message,
      });
    };

    this.integrator.deleteSpendMoneyTransaction({
      onSuccess,
      onFailure,
      spendMoneyId: getSpendMoneyId(this.store.getState()),
    });
  };

  addAttachments = (files) => {
    this.dispatcher.addAttachments(files);

    this.uploadAttachments(files);
  };

  uploadAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach(file => this.uploadAttachment(file));
  };

  uploadAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadAttachment({ response, file });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadAttachmentFailed({ message, file });
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.updateUploadProgress({ uploadProgress, file });
    };

    this.integrator.uploadAttachment({
      onSuccess,
      onFailure,
      onProgress,
      file,
    });
  };

  openDeleteAttachmentModal = (index) => {
    const state = this.store.getState();
    const { id } = state.attachments[index];

    if (id) {
      this.dispatcher.openRemoveAttachmentModal(id);
    } else {
      this.dispatcher.removeAttachmentByIndex(index);
    }
  };

  removeAttachment = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const id = state.pendingDeleteId;

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = () => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.removeAttachment(id);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.appendAlert(message);
    };

    this.integrator.removeAttachment({
      onSuccess,
      onFailure,
    });
  };

  openAttachment = (index) => {
    const state = this.store.getState();
    const { id } = state.attachments[index];

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = ({ fileUrl }) => {
      window.open(fileUrl, '_blank');
      this.dispatcher.setOperationInProgressState(id, false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.appendAlert(message);
      this.dispatcher.setOperationInProgressState(id, false);
    };

    this.integrator.openAttachment({
      onSuccess,
      onFailure,
      id,
    });
  };

  focusSpendMoneyAttachments = () => {
    const element = document.getElementById(SpendMoneyElementId.ATTACHMENTS_ELEMENT_ID);
    element.scrollIntoView();
  }

  closeSplitView = () => {
    this.dispatcher.setShowSplitView(false);
    this.dispatcher.clearInTrayDocumentUrl();
  };

  openSplitView = () => {
    this.dispatcher.setShowSplitView(true);

    const onSuccess = (blob) => {
      const url = URL.createObjectURL(blob);
      this.dispatcher.setInTrayDocumentUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setShowSplitView(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.downloadInTrayDocument({
      onSuccess,
      onFailure,
      inTrayDocumentId: getInTrayDocumentId(this.store.getState()),
    });
  };

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();

    const spendMoneyView = (
      <SpendMoneyDetailView
        accountModal={accountModal}
        contactModal={contactModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveSpendMoney}
        onSaveAndButtonClick={this.handleSaveAndAction}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onConfirmCancelButtonClick={this.handleOnDiscardButtonClickFromUnsavedModal}
        onConfirmDeleteButtonClick={this.deleteSpendMoneyTransaction}
        onDismissAlert={this.dispatcher.dismissAlert}
        isCreating={isCreating}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onAddAccount={this.openAccountModal}
        onAddContact={this.openContactModal}
        onRowInputBlur={this.formatAndCalculateTotals}
        onAddAttachments={this.addAttachments}
        onRemoveAttachment={this.openDeleteAttachmentModal}
        onDeleteAttachmentModal={this.removeAttachment}
        onOpenAttachment={this.openAttachment}
        onFocusAttachments={this.focusSpendMoneyAttachments}
        onCloseSplitView={this.closeSplitView}
        onOpenSplitView={this.openSplitView}
        onClosePrefillInfo={this.dispatcher.hidePrefillInfo}
        onBlurBankStatementText={this.dispatcher.resetBankStatementText}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {spendMoneyView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveAndCreateNew = () => {
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: message,
      });
      const state = this.store.getState();
      const url = getCreateAndNewUrl(state);
      if (getShouldReloadModule(state)) {
        this.reload();
      } else this.redirectToUrl(url);
    };

    this.saveSpendMoneyAnd({ onSuccess });
  };

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: message,
      });

      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateSpendMoneyId(id);
      }

      const url = getDuplicatedUrl(this.store.getState());

      this.redirectToUrl(url);
    };

    this.saveSpendMoneyAnd({ onSuccess });
  };

  handleSaveAndAction = (actionType) => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) {
      return;
    }
    if (actionType === SaveActionType.SAVE_AND_CREATE_NEW) {
      this.saveAndCreateNew();
    } else if (actionType === SaveActionType.SAVE_AND_DUPLICATE) {
      this.saveAndDuplicate();
    }
  }

  saveSpendMoneyAnd = ({ onSuccess }) => {
    this.dispatcher.setSubmittingState(true);

    const handleSaveSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      const state = this.store.getState();
      if (getIsCreatingFromInTray(state)) {
        this.linkAfterSave(onSuccess, response);
      } else {
        onSuccess(response);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ message });
    };

    this.saveOrCreateSpendMoney({ onSuccess: handleSaveSuccess, onFailure });
  }

  saveOrCreateSpendMoney = ({ onSuccess, onFailure }) => {
    if (getIsCreating(this.store.getState())) {
      this.integrator.createSpendMoneyEntry({ onSuccess, onFailure });
    } else {
      this.integrator.updateSpendMoneyEntry({ onSuccess, onFailure });
    }
  }

  saveSpendMoney = () => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) {
      return;
    }

    this.dispatcher.setSubmittingState(true);

    const saveHandler = this.getSaveHandlers();
    this.saveOrCreateSpendMoney(saveHandler);
  }

  saveHandler = () => {
    // Quick add modals
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (this.contactModalModule.isOpened()) {
      this.contactModalModule.save();
      return;
    }

    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
      case ModalType.DELETE_ATTACHMENT:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveSpendMoney();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    const messageTypes = [
      SUCCESSFULLY_SAVED_SPEND_MONEY,
      SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
    ];
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ message, type: 'success' });
    }
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isSpendMoneyJobColumnEnabled: this.isSpendMoneyJobColumnEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadSpendMoney();
  }

  resetState() {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
    this.contactModalModule.resetState();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
