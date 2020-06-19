import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_SPEND_MONEY,
  PREFILL_INTRAY_DOCUMENT,
  PREFILL_NEW,
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
} from '../spendMoneyMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getContactModalContext,
  getCreateUrl,
  getDate,
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
  getJobModalContext,
  getLinesForTaxCalculation,
  getLinkInTrayContentWithoutSpendMoneyId,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getSelectedPayFromId,
  getSelectedPayToContactId,
  getShouldLoadAbn,
  getShouldShowAccountCode,
  getSpendMoneyId,
  getTaxCodeOptions,
  getTransactionListUrl,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import FeatureToggle from '../../../FeatureToggles';
import JobModalModule from '../../job/jobModal/JobModalModule';
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
    integration, setRootView, pushMessage, popMessages, navigateTo, isToggleOn,
  }) {
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;
    this.dispatcher = createSpendMoneyDispatcher(this.store);
    this.integrator = createSpendMoneyIntegrator(this.store, integration);
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.spendMoney);

    this.isToggleOn = isToggleOn;

    this.accountModalModule = new AccountModalModule({ integration });
    this.contactModalModule = new ContactModalModule({ integration });
    this.jobModalModule = new JobModalModule({ integration });
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

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: message => this.displayFailureAlert(message),
      onSaveSuccess: payload => this.loadJobAfterCreate(payload, onChange),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.jobModalModule.resetState();
    this.dispatcher.setAlert({ type: 'success', message });
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const job = { ...payload, id };
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobAfterCreate(id, job);
      onChange(job);
    };

    const onFailure = () => {
      this.dispatcher.setJobLoadingState(false);
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
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
    if (getIsCreating(state)) {
      this.loadNewSpendMoney();
    } else {
      this.loadExistingSpendMoney();
    }
  };

  loadExistingSpendMoney = () => {
    const onSuccess = intent => (response) => {
      this.dispatcher.loadSpendMoney(intent, response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });

      const state = this.store.getState();
      const contactId = getSelectedPayToContactId(state);
      if (contactId && getShouldLoadAbn(state)) {
        this.loadAbnFromContact(contactId);
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSpendMoney({
      onSuccess,
      onFailure,
    });
  }

  loadNewSpendMoney = () => {
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
  }

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

  loadAbnFromContact = (contactId) => {
    this.dispatcher.setLoadingAbnState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingAbnState(false);
      this.dispatcher.loadAbn(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingAbnState(false);
    };

    this.integrator.loadAbnFromContact({ contactId, onSuccess, onFailure });
  }

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
    if (key === 'selectedPayToContactId') {
      if (getShouldShowAccountCode(stateAfterUpdate)) {
        this.loadSupplierExpenseAccount();
      }
      if (value && getShouldLoadAbn(stateAfterUpdate)) {
        this.loadAbnFromContact(value);
      } else if (!value) {
        this.dispatcher.clearAbn();
      }
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
      this.navigateTo(url);
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

    this.navigateTo(url);
  }

  redirectAfterLink = () => {
    const state = this.store.getState();
    const redirectUrl = getSaveUrl(state);

    this.navigateTo(redirectUrl);
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
    const jobModal = this.jobModalModule.render();

    const spendMoneyView = (
      <SpendMoneyDetailView
        accountModal={accountModal}
        contactModal={contactModal}
        jobModal={jobModal}
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
        onAddJob={this.openJobModal}
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
      const state = this.store.getState();

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: message,
      });

      this.pushMessage({
        type: PREFILL_NEW,
        selectedBankAccountId: getSelectedPayFromId(state),
        selectedDate: getDate(state),
      });

      const url = getCreateUrl(state);
      this.navigateTo(url);
    };

    this.saveSpendMoneyAnd({ onSuccess });
  }

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getSpendMoneyId(state);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: message,
      });

      this.pushMessage({
        type: DUPLICATE_SPEND_MONEY,
        duplicateId,
      });

      const url = getCreateUrl(state);
      this.navigateTo(url);
    };

    this.saveSpendMoneyAnd({ onSuccess });
  }

  handleSaveAndAction = (actionType) => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) {
      return;
    }

    if (actionType === SaveActionType.SAVE_AND_CREATE_NEW) {
      this.saveAndCreateNew();
    }

    if (actionType === SaveActionType.SAVE_AND_DUPLICATE) {
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
    this.popMessages([
      SUCCESSFULLY_SAVED_SPEND_MONEY,
      SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
      DUPLICATE_SPEND_MONEY,
      PREFILL_NEW,
      PREFILL_INTRAY_DOCUMENT,
    ]).forEach(message => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_SPEND_MONEY:
        case SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK:
          this.dispatcher.setAlert({ message: message.content, type: 'success' });
          break;
        case DUPLICATE_SPEND_MONEY:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        case PREFILL_NEW:
          this.dispatcher.setPrefillNew({
            selectedBankAccountId: message.selectedBankAccountId,
            selectedDate: message.selectedDate,
          });
          break;
        case PREFILL_INTRAY_DOCUMENT:
          this.dispatcher.setPrefillInTrayDocumentId(message.inTrayDocumentId);
          break;
        default:
      }
    });
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isSpendMoneyJobColumnEnabled: this.isToggleOn(FeatureToggle.EssentialsJobs),
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
      this.navigateTo(url);
    }
  }
}
