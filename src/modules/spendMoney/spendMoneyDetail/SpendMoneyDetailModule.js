import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_SPEND_MONEY,
  PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
  PREFILL_NEW_SPEND_MONEY,
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
} from '../../../common/types/MessageTypes';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getContactComboboxContext,
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
  getJobComboboxContext,
  getLinesForTaxCalculation,
  getLinkInTrayContentWithoutSpendMoneyId,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getRecurringTransactionListModalContext,
  getRecurringTransactionModalContext,
  getSaveUrl,
  getSelectedPayFromId,
  getSelectedPayToContactId,
  getShouldLoadAbn,
  getShouldShowAccountCode,
  getSpendMoneyId,
  getTaxCodeOptions,
  getTransactionListUrl,
  getUniqueSelectedJobIds,
  getViewedAccountToolTip,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import { isToggleOn } from '../../../splitToggle';
import { trackUserEvent } from '../../../telemetry';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import AlertType from '../../../common/types/AlertType';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import JobComboboxModule from '../../job/jobCombobox/JobComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './components/ModalType';
import RecurringTransactionListModalModule from '../../recurringTransaction/recurringTransactionListModal/RecurringTransactionListModalModule';
import RecurringTransactionModalModule from '../../recurringTransaction/recurringTransactionModal/RecurringTransactionModalModule';
import SaveActionType from './components/SaveActionType';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
import SpendMoneyElementId from './SpendMoneyElementId';
import Store from '../../../store/Store';
import createSpendMoneyDispatcher from './createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from './createSpendMoneyIntegrator';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import spendMoneyDetailReducer from './spendMoneyDetailReducer';

export default class SpendMoneyDetailModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    navigateTo,
    featureToggles,
  }) {
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;
    this.featureToggles = featureToggles;
    this.dispatcher = createSpendMoneyDispatcher(this.store);
    this.integrator = createSpendMoneyIntegrator(this.store, integration);
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.spendMoney);
    this.accountModalModule = new AccountModalModule({ integration });
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.jobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });
    this.trackUserEvent = trackUserEvent;

    this.recurringTransactionListModal = new RecurringTransactionListModalModule(
      { integration }
    );
    this.recurringTransactionModal = new RecurringTransactionModalModule({
      integration,
    });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({ type: 'danger', message }),
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

  loadContact = (onChange) => {
    const state = this.store.getState();
    const contactId = getSelectedPayToContactId(state);

    if (contactId) {
      this.dispatcher.setSubmittingState(true);

      const onSuccess = (payload) => {
        this.dispatcher.setSubmittingState(false);
        onChange(payload);

        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      };

      const onFailure = ({ message }) => {
        this.dispatcher.setAlert({ type: AlertType.DANGER, message });
        this.dispatcher.setSubmittingState(false);
      };

      this.integrator.loadContact({ contactId, onSuccess, onFailure });
    }
  };

  prefillSpendMoneyFromInTray(inTrayDocumentId) {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.prefillDataFromInTray(response);

      const hasPrefilledLines = getHasPrefilledLines(this.store.getState());
      if (hasPrefilledLines) {
        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      }

      this.loadContact(({ contactType, isReportable, expenseAccountId }) => {
        this.dispatcher.prefillSpendMoneyOnContact(
          contactType,
          isReportable,
          expenseAccountId
        );
      });

      this.updateContactCombobox();
      this.updateJobCombobox();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.prefillDataFromInTray({
      onSuccess,
      onFailure,
      inTrayDocumentId,
    });
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
    const onSuccess = (intent) => (response) => {
      this.dispatcher.loadSpendMoney(intent, response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.loadContact(({ contactType }) => {
        this.dispatcher.setContactType(contactType);
      });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.updateComponentsAfterLoadSpendMoney();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSpendMoney({
      onSuccess,
      onFailure,
    });
  };

  loadNewSpendMoney = () => {
    const state = this.store.getState();

    const onSuccess = (intent) => (response) => {
      this.dispatcher.loadSpendMoney(intent, response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });

      const inTrayDocumentId = getInTrayDocumentId(state);
      if (inTrayDocumentId) {
        this.prefillSpendMoneyFromInTray(inTrayDocumentId);
        this.openSplitView();
      } else {
        this.updateContactCombobox();
        this.updateJobCombobox();
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

    if (key === 'selectedPayToContactId') {
      if (value) {
        this.loadContact(({ contactType, isReportable, expenseAccountId }) => {
          this.dispatcher.prefillSpendMoneyOnContact(
            contactType,
            isReportable,
            expenseAccountId.expenseAccountId || expenseAccountId
          );
        });
      } else {
        this.dispatcher.clearContactType();
        this.dispatcher.clearIsReportable();
      }

      const stateAfterUpdate = this.store.getState();
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
      } else {
        this.dispatcher.openModal({
          type: ModalType.CANCEL,
          url: transactionListUrl,
        });
      }
    } else if (isCreatingFromIntray) {
      this.redirectToInTrayList();
    } else this.redirectToTransactionList();
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.dispatcher.openModal({
      type: ModalType.DELETE,
      url: transactionListUrl,
    });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  };

  handleOnDiscardButtonClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.navigateTo(url);
  };

  openRecurringTransactionListModal = () => {
    const state = this.store.getState();

    this.recurringTransactionListModal.run({
      context: getRecurringTransactionListModalContext(state),
      onComplete: ({ id }) => {
        this.recurringTransactionListModal.close();

        if (id) {
          this.loadPrefillFromRecurringSpendMoney(id);
        }
      },
      onLoadFailure: (message) => {
        this.recurringTransactionListModal.close();
        this.dispatcher.setAlert({ type: 'danger', message });
      },
    });
  };

  loadPrefillFromRecurringSpendMoney = (recurringTransactionId) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setSubmittingState(false);

      this.dispatcher.loadPrefillFromRecurringSpendMoney(data);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.updateComponentsAfterLoadSpendMoney();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadPrefillFromRecurringSpendMoney({
      recurringTransactionId,
      onSuccess,
      onFailure,
    });
  };

  openRecurringTransactionModal = () => {
    const state = this.store.getState();

    this.recurringTransactionModal.run({
      context: getRecurringTransactionModalContext(state),
      onLoadFailure: (message) => {
        this.recurringTransactionModal.close();
        this.dispatcher.setAlert({ type: 'danger', message });
      },
      onSaveSuccess: ({ message }) => {
        this.recurringTransactionModal.close();
        this.dispatcher.setAlert({ type: 'success', message });
      },
    });
  };

  updateComponentsAfterLoadSpendMoney = () => {
    const state = this.store.getState();

    const contactId = getSelectedPayToContactId(state);
    if (contactId && getShouldLoadAbn(state)) {
      this.loadAbnFromContact(contactId);
    }

    this.updateContactCombobox();
    this.updateJobCombobox();
  };

  redirectAfterLink = () => {
    const state = this.store.getState();
    const redirectUrl = getSaveUrl(state);

    this.navigateTo(redirectUrl);
  };

  redirectToInTrayList = () => {
    const state = this.store.getState();
    const inTrayUrl = getInTrayUrl(state);

    window.location.href = inTrayUrl;
  };

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
  };

  addSpendMoneyLine = (line) => {
    const { id, ...partialLine } = line;
    this.dispatcher.addSpendMoneyLine(partialLine);
  };

  deleteSpendMoneyLine = (index) => {
    this.dispatcher.deleteSpendMoneyLine(index);

    this.getTaxCalculations({ isSwitchingTaxInclusive: false });
  };

  formatAndCalculateTotals = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

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
        isTaxInclusive,
        isSwitchingTaxInclusive
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

    getFilesForUpload(state, files).forEach((file) =>
      this.uploadAttachment(file)
    );
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
    const element = document.getElementById(
      SpendMoneyElementId.ATTACHMENTS_ELEMENT_ID
    );
    element.scrollIntoView();
  };

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

  loadJobCombobox = () => {
    const state = this.store.getState();
    const context = getJobComboboxContext(state);
    this.jobComboboxModule.run(context);
  };

  updateJobCombobox = () => {
    const state = this.store.getState();
    const selectedJobIds = getUniqueSelectedJobIds(state);
    if (selectedJobIds.length > 0) {
      this.jobComboboxModule.load(selectedJobIds);
    }
  };

  renderJobCombobox = (props) => {
    return this.jobComboboxModule ? this.jobComboboxModule.render(props) : null;
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const contactId = getSelectedPayToContactId(state);
    if (contactId) {
      this.contactComboboxModule.load(contactId);
    }
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'Spend money',
        },
      });
    }
  };

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const accountModal = this.accountModalModule.render();
    const recurringListModal = this.recurringTransactionListModal.render();
    const recurringModal = this.recurringTransactionModal.render();

    const spendMoneyView = (
      <SpendMoneyDetailView
        recurringListModal={recurringListModal}
        recurringModal={recurringModal}
        renderJobCombobox={this.renderJobCombobox}
        renderContactCombobox={this.renderContactCombobox}
        accountModal={accountModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveSpendMoney}
        onSaveAndButtonClick={this.handleSaveAndAction}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onConfirmCancelButtonClick={
          this.handleOnDiscardButtonClickFromUnsavedModal
        }
        onConfirmDeleteButtonClick={this.deleteSpendMoneyTransaction}
        onPrefillButtonClick={this.openRecurringTransactionListModal}
        onSaveAsRecurringButtonClick={this.openRecurringTransactionModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        isCreating={isCreating}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onAddAccount={this.openAccountModal}
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
        onViewedAccountToolTip={this.viewedAccountToolTip}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{spendMoneyView}</Provider>
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
        type: PREFILL_NEW_SPEND_MONEY,
        selectedBankAccountId: getSelectedPayFromId(state),
        selectedDate: getDate(state),
      });

      const url = getCreateUrl(state);
      this.navigateTo(url);
    };

    this.saveSpendMoneyAnd({ onSuccess });
  };

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getSpendMoneyId(state);

      this.loadContact(({ contactType }) => {
        this.dispatcher.setContactType(contactType);
      });

      const contactId = getSelectedPayToContactId(state);
      if (contactId && getShouldLoadAbn(state)) {
        this.loadAbnFromContact(contactId);
      }

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
  };

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
  };

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
  };

  saveOrCreateSpendMoney = ({ onSuccess, onFailure }) => {
    if (getIsCreating(this.store.getState())) {
      this.integrator.createSpendMoneyEntry({ onSuccess, onFailure });
    } else {
      this.integrator.updateSpendMoneyEntry({ onSuccess, onFailure });
    }
  };

  saveSpendMoney = () => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) {
      return;
    }

    this.dispatcher.setSubmittingState(true);

    const saveHandler = this.getSaveHandlers();
    this.saveOrCreateSpendMoney(saveHandler);
  };

  saveHandler = () => {
    // Quick add modals
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (this.jobComboboxModule.isCreateJobModalOpened()) {
      this.jobComboboxModule.createJob();
      return;
    }

    if (this.contactComboboxModule.isContactModalOpened()) {
      this.contactComboboxModule.createContact();
      return;
    }

    if (this.recurringTransactionListModal.isOpened()) {
      this.recurringTransactionListModal.complete();
      return;
    }

    if (this.recurringTransactionModal.isOpened()) {
      this.recurringTransactionModal.save();
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
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_SAVED_SPEND_MONEY,
      SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
      DUPLICATE_SPEND_MONEY,
      PREFILL_NEW_SPEND_MONEY,
      PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
    ]).forEach((message) => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_SPEND_MONEY:
        case SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK:
          this.dispatcher.setAlert({
            message: message.content,
            type: 'success',
          });
          break;
        case DUPLICATE_SPEND_MONEY:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        case PREFILL_NEW_SPEND_MONEY:
          this.dispatcher.setPrefillNew({
            selectedBankAccountId: message.selectedBankAccountId,
            selectedDate: message.selectedDate,
          });
          break;
        case PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY:
          this.dispatcher.setPrefillInTrayDocumentId(message.inTrayDocumentId);
          break;
        default:
      }
    });
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });
    const { isCustomizedForNonGstEnabled } = this.featureToggles;

    this.dispatcher.setInitialState({
      isRecurringTransactionEnabled,
      isCustomizedForNonGstEnabled,
      ...context,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadSpendMoney();
    this.loadContactCombobox();
    this.loadJobCombobox();
  }

  resetState() {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
    this.contactComboboxModule.resetState();
    this.jobComboboxModule.resetState();
    this.recurringTransactionListModal.resetState();
    this.recurringTransactionModal.resetState();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.navigateTo(url);
    }
  };
}
