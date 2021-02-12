import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_BILL,
  PREFILL_INTRAY_DOCUMENT_FOR_BILL,
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from '../../../common/types/MessageTypes';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../common/taxCalculator';
import {
  getBillId,
  getBillUid,
  getContactComboboxContext,
  getExpenseAccountId,
  getHasLineBeenPrefilled,
  getIsBeforeConversionDate,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLineAmountsTaxInclusive,
  getIsLineEdited,
  getIsLinesEmpty,
  getIsPageEdited,
  getIsPreConversion,
  getIsTaxInclusive,
  getItemComboboxContext,
  getJobModalContext,
  getLinesForTaxCalculation,
  getModalContext,
  getModalType,
  getNewLineIndex,
  getRedirectUrl,
  getShouldShowAbn,
  getSupplierId,
  getSupplierLink,
  getTaxCodeOptions,
  getUniqueSelectedItemIds,
  getUniqueSelectedJobIds,
  getViewedAccountToolTip,
} from './selectors/billSelectors';
import {
  getBillListUrl,
  getBillPaymentUrl,
  getCreateNewBillUrl,
  getInTrayUrl,
  getSavedBillPaymentUrl,
  getSupplierPaymentUrl,
} from './selectors/BillRedirectSelectors';
import {
  getDefaultAccountId,
  getIsActionsDisabled,
  getShouldSendRemittanceAdvice,
} from './selectors/BillRecordPaymentSelectors';
import {
  getExportPdfFilename,
  getShouldSaveAndReload,
} from './selectors/exportPdfSelectors';
import {
  getHasInTrayDocumentId,
  getHasInTrayDocumentUrl,
  getInTrayModalContext,
  getShouldLinkInTrayDocument,
} from './selectors/BillInTrayDocumentSelectors';
import {
  getIsExpenseAccountIdKey,
  getIsLineAccountIdKey,
  getIsLineItemIdKey,
  getIsLineTaxCodeIdKey,
  getIsSupplierIdKey,
  getIsTaxInclusiveKey,
} from './selectors/BillModuleSelectors';
import {
  getIsRecurringTransactionReadOnly,
  getRecurringTransactionListModalContext,
} from './selectors/recurringBillSelectors';
import { getLinkInTrayContentWithoutIds } from './selectors/BillIntegratorSelectors';
import { isToggleOn } from '../../../splitToggle';
import { shouldShowSaveAmountDueWarningModal } from './selectors/BillSaveSelectors';
import { trackUserEvent } from '../../../telemetry';
import AbnStatus from '../../../components/autoFormatter/AbnInput/AbnStatus';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import AlertType from '../../../common/types/AlertType';
import BillView from './components/BillView';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import InTrayModalModule from '../../inTray/inTrayModal/InTrayModalModule';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobComboboxModule from '../../job/jobCombobox/JobComboboxModule';
import JobModalModule from '../../job/jobModal/JobModalModule';
import ModalType from './types/ModalType';
import RecurringTransactionListModalModule from '../../recurringTransaction/recurringTransactionListModal/RecurringTransactionListModalModule';
import SaveActionType from './types/SaveActionType';
import Store from '../../../store/Store';
import billReducer from './reducer/billReducer';
import createBillDispatcher from './createBillDispatcher';
import createBillIntegrator from './createBillIntegrator';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

class BillModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    globalCallbacks,
    navigateTo,
    subscribeOrUpgrade,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.featureToggles = featureToggles;

    this.store = new Store(billReducer);
    this.dispatcher = createBillDispatcher(this.store);
    this.integrator = createBillIntegrator(this.store, integration);
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.jobModalModule = new JobModalModule({
      integration,
    });
    this.inTrayModalModule = new InTrayModalModule({ integration, navigateTo });
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.bill);
    this.globalCallbacks = globalCallbacks;
    this.navigateTo = navigateTo;
    this.subscribeOrUpgrade = subscribeOrUpgrade;
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.openAlert,
      featureToggles,
    });
    this.jobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });
    this.recurringTransactionListModal = new RecurringTransactionListModalModule(
      { integration }
    );
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.openSuccessAlert({ message });
    this.dispatcher.startBlocking();
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.stopBlocking();
    };
    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const jobModalContext = getModalContext(state);
    this.jobModalModule.run({
      context: jobModalContext,
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.openSuccessAlert({ message });
    this.dispatcher.startBlocking();
    this.jobModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.loadJobAfterCreate({
        ...payload,
        id,
      });
      onChange({
        ...payload,
        id,
      });
    };

    const onFailure = () => {
      this.dispatcher.stopBlocking();
    };
    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  updateComponentsAfterLoadBill = () => {
    this.updateContactCombobox();
    this.updateItemCombobox();
    this.updateJobCombobox();

    const state = this.store.getState();
    const shouldShowAbn = getShouldShowAbn(state);
    if (shouldShowAbn) {
      this.loadAbnFromSupplier();
    }
  };

  prefillBillFromInTray() {
    const onSuccess = (response) => {
      this.dispatcher.setDocumentLoadingState(false);
      this.dispatcher.prefillDataFromInTray(response);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });

      this.updateContactCombobox();

      const shouldShowAbn = getShouldShowAbn(this.store.getState());
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setDocumentLoadingState(false);
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.setDocumentLoadingState(true);
    this.integrator.prefillDataFromInTray({ onSuccess, onFailure });
  }

  loadBill = () => {
    const onSuccess = (response) => {
      this.dispatcher.stopLoading();
      this.dispatcher.loadBill(response);

      const state = this.store.getState();
      if (getHasInTrayDocumentId(state)) {
        this.downloadDocument();
      }

      if (getIsCreatingFromInTray(state)) {
        this.prefillBillFromInTray();
      } else {
        this.updateComponentsAfterLoadBill();
      }
    };

    const onFailure = () => {
      this.dispatcher.failLoading();
    };

    this.dispatcher.startLoading();
    this.integrator.loadBill({ onSuccess, onFailure });
  };

  reloadBill = ({ onSuccess: next = () => {} }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.reloadBill(response);

      const shouldShowAbn = getShouldShowAbn(this.store.getState());
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }

      next();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.loadBill({ onSuccess, onFailure });
  };

  linkAfterSave = (onSuccess, response) => {
    const state = this.store.getState();

    const handleSuccess = () => {
      this.dispatcher.stopBlocking();
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL,
        content: 'Bill successfully created from document',
      });
      onSuccess(response);
    };

    const handleLinkFailure = () => {
      this.dispatcher.stopBlocking();
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
        content:
          'Bill created, but the document failed to link. Open the bill to link the document again',
      });
      onSuccess(response);
    };

    const linkContent = {
      id: response.id,
      uid: response.uid,
      ...getLinkInTrayContentWithoutIds(state),
    };

    this.integrator.linkInTrayDocument({
      onSuccess: handleSuccess,
      onFailure: handleLinkFailure,
      linkContent,
    });
  };

  saveBillAnd = ({ onSuccess }) => {
    const handleSaveSuccess = (response) => {
      const state = this.store.getState();

      if (response.monthlyLimit) {
        this.dispatcher.stopBlocking();
        this.dispatcher.showUpgradeModal(response.monthlyLimit);
      } else if (getShouldLinkInTrayDocument(state)) {
        this.linkAfterSave(onSuccess, response);
      } else {
        this.dispatcher.stopBlocking();
        onSuccess(response);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.startBlocking();

    if (getIsPreConversion(this.store.getState())) {
      this.integrator.savePreConversionBill({
        onSuccess: handleSaveSuccess,
        onFailure,
      });
    } else {
      this.integrator.saveBill({
        onSuccess: handleSaveSuccess,
        onFailure,
      });
    }
  };

  handleSaveBill = () => {
    const state = this.store.getState();
    if (shouldShowSaveAmountDueWarningModal(state)) {
      const modalType = ModalType.SaveAmountDueWarning;
      this.dispatcher.openModal({ modalType });
    } else {
      this.saveBill();
    }
  };

  saveBill = () => {
    const state = this.store.getState();

    if (getModalType(state)) {
      this.closeModal();
    }

    const isCreatingFromInTray = getIsCreatingFromInTray(state);
    const isPreConversion = getIsPreConversion(state);
    if (isCreatingFromInTray && !isPreConversion) {
      const onSuccess = ({ message }) => {
        this.pushMessage({ type: SUCCESSFULLY_SAVED_BILL, content: message });
        this.globalCallbacks.inTrayBillSaved();
        this.redirectToInTray();
      };
      this.saveBillAnd({ onSuccess });
    } else {
      const onSuccess = ({ message }) => {
        this.dispatcher.openSuccessAlert({ message });
      };
      this.saveAndReload({ onSuccess });
    }
  };

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const url = getRedirectUrl(this.store.getState());
    this.navigateTo(url);
  };

  saveAndRedirect = () => {
    this.dispatcher.closeModal();

    const onSuccess = () => {
      this.globalCallbacks.inTrayBillSaved();
      const url = getRedirectUrl(this.store.getState());
      this.navigateTo(url);
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndCreateNewBill = () => {
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.globalCallbacks.inTrayBillSaved();
      this.pushMessage({ type: SUCCESSFULLY_SAVED_BILL, content: message });

      this.redirectToCreateNewBill();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndDuplicateBill = () => {
    this.dispatcher.closeModal();

    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getBillId(state);

      this.globalCallbacks.inTrayBillSaved();
      this.pushMessage({ type: SUCCESSFULLY_SAVED_BILL, content: message });
      this.pushMessage({ type: DUPLICATE_BILL, duplicateId });

      this.redirectToCreateNewBill();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndReload = ({ onSuccess: next = () => {} }) => {
    const onSuccess = ({ message, id }) => {
      this.globalCallbacks.inTrayBillSaved();
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateBillId(id);
        this.replaceURLParams({ billId: id });
      }

      this.reloadBill({ onSuccess: () => next({ message }) });
    };

    this.saveBillAnd({ onSuccess });
  };

  deleteBill = () => {
    this.dispatcher.closeModal();
    this.dispatcher.startBlocking();

    const onSuccess = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    const isPreConversion = getIsPreConversion(this.store.getState());
    if (isPreConversion) {
      this.integrator.deletePreConversionBill({ onSuccess, onFailure });
    } else {
      this.integrator.deleteBill({ onSuccess, onFailure });
    }
  };

  cancelBill = () => {
    const state = this.store.getState();
    const isCreatingFromInTray = getIsCreatingFromInTray(state);
    if (isCreatingFromInTray) {
      this.redirectToInTray();
    } else {
      this.redirectToBillList();
    }
  };

  openSaveAndModal = (saveActionType) => {
    const modalType = {
      [SaveActionType.SAVE_AND_CREATE_NEW]: ModalType.SaveAndCreateNew,
      [SaveActionType.SAVE_AND_DUPLICATE]: ModalType.SaveAndDuplicate,
    }[saveActionType];

    this.dispatcher.openModal({ modalType });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.dispatcher.openModal({
        modalType: ModalType.CancelModal,
      });
    } else {
      this.cancelBill();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.DeleteModal,
    });
  };

  closeModal = () => {
    this.dispatcher.closeModal();
  };

  closeAlert = () => {
    this.dispatcher.closeAlert();
  };

  updateBillOption = ({ key, value }) => {
    const isTaxInclusiveKey = getIsTaxInclusiveKey(key);
    const isSupplierIdKey = getIsSupplierIdKey(key);
    const isExpenseAccountIdKey = getIsExpenseAccountIdKey(key);

    if (isSupplierIdKey) {
      this.dispatcher.resetSupplier();
    }

    this.dispatcher.updateBillOption({ key, value });

    if (isSupplierIdKey && value) {
      this.loadSupplierDetail();
    }

    if (isTaxInclusiveKey) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }

    if (isExpenseAccountIdKey) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  validateIssueDate = () => {
    if (getIsBeforeConversionDate(this.store.getState())) {
      this.openPreConversionModal();
    }
  };

  openPreConversionModal = () => {
    this.dispatcher.openModal({ modalType: ModalType.PreConversionBill });
  };

  updateLayout = ({ value }) => {
    this.dispatcher.updateLayout({ value });
    const state = this.store.getState();

    if (!getIsLinesEmpty(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  updateBillLine = ({ index, key, value }) => {
    this.dispatcher.updateBillLine({ index, key, value });

    if (getIsLineTaxCodeIdKey(key) || getIsLineAccountIdKey(key)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    } else if (
      getIsLineItemIdKey(key) &&
      !getHasLineBeenPrefilled(this.store.getState(), index) &&
      value
    ) {
      this.loadItemDetailForLine({ index, itemId: value });
    }
  };

  addBillLine = (line) => {
    const state = this.store.getState();

    const getKey = ({ id, ...lineWithoutId }) => Object.keys(lineWithoutId)[0];
    const key = getKey(line);
    const value = line[key];
    const index = getNewLineIndex(state);

    this.dispatcher.addBillLine();
    this.updateBillLine({ index, key, value });
  };

  removeBillLine = ({ index }) => {
    this.dispatcher.removeBillLine({ index });

    const state = this.store.getState();
    const isLinesEmpty = getIsLinesEmpty(state);

    if (!isLinesEmpty) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  calculateBillLines = ({ index, key }) => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.dispatcher.calculateLineAmounts({ index, key });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  getTaxCalculations = ({ isSwitchingTaxInclusive }) => {
    const state = this.store.getState();
    const isTableEmpty = getIsLinesEmpty(state);

    if (isTableEmpty) {
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

    this.dispatcher.getTaxCalculations(
      taxCalculations,
      isSwitchingTaxInclusive
    );
  };

  loadItemDetailForLine = ({ index, itemId }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (updatedLine) => {
      this.dispatcher.loadItemDetailForLine({ index, updatedLine });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.dispatcher.stopBlocking();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.loadItemDetailForLine({
      index,
      itemId,
      onSuccess,
      onFailure,
    });
  };

  loadSupplierDetail = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.loadSupplierDetail(response);

      const state = this.store.getState();
      if (getIsCreating(state) && getExpenseAccountId(state)) {
        this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      }

      const shouldShowAbn = getShouldShowAbn(state);
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }
    };
    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.loadSupplierDetail({ onSuccess, onFailure });
  };

  loadAbnFromSupplier = () => {
    this.dispatcher.setAbnLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn(response);
    };

    const onFailure = () => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn({ status: AbnStatus.UNAVAILABLE });
    };

    this.integrator.loadAbnFromSupplier({ onSuccess, onFailure });
  };

  exportPdf = () => {
    this.dispatcher.startModalBlocking();
    const onSuccess = (data) => {
      this.dispatcher.stopModalBlocking();
      this.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob({ blob: data, filename });
    };

    const onFailure = () => {
      this.dispatcher.openDangerAlert({ message: 'Failed to export PDF' });
      this.dispatcher.stopModalBlocking();
      this.closeModal();
    };

    this.integrator.exportPdf({ onSuccess, onFailure });
  };

  openExportPdfModal = () => {
    this.dispatcher.openModal({ modalType: ModalType.ExportPdf });
  };

  openExportPdfModalOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExport = getShouldSaveAndReload(state);
    if (shouldSaveAndExport) {
      this.saveAndReload({ onSuccess: this.openExportPdfModal });
    } else {
      this.openExportPdfModal();
    }
  };

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
      SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
      SUCCESSFULLY_SAVED_BILL,
      SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
      DUPLICATE_BILL,
      PREFILL_INTRAY_DOCUMENT_FOR_BILL,
    ]).forEach((message) => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_BILL:
          this.dispatcher.openSuccessAlert({ message: message.content });
          break;
        case SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK:
          this.dispatcher.openInfoAlert({ message: message.content });
          break;
        case DUPLICATE_BILL:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        case PREFILL_INTRAY_DOCUMENT_FOR_BILL:
          this.dispatcher.setInTrayDocumentId(message.inTrayDocumentId);
          this.dispatcher.setSource('inTray');
          break;
        default:
      }
    });
  };

  downloadDocument = () => {
    const state = this.store.getState();

    this.dispatcher.setShowSplitView(true);
    if (getHasInTrayDocumentUrl(state)) {
      return;
    }

    const onSuccess = (blob) => {
      const url = URL.createObjectURL(blob);
      this.dispatcher.downloadInTrayDocument(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setShowSplitView(false);
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.downloadDocument({ onSuccess, onFailure });
  };

  closeSplitView = () => {
    this.dispatcher.setShowSplitView(false);
  };

  openInTrayModal = () => {
    const state = this.store.getState();
    const modalContext = getInTrayModalContext(state);
    this.inTrayModalModule.run({
      context: modalContext,
      onSaveSuccess: (id) => {
        this.inTrayModalModule.close();
        this.dispatcher.setInTrayDocumentId(id);

        if (getIsCreating(state)) {
          this.prefillBillFromInTray();
          this.downloadDocument();
          return;
        }

        const onSuccess = ({ message, attachmentId }) => {
          this.dispatcher.openSuccessAlert({ message });
          this.dispatcher.setAttachmentId(attachmentId);
          this.prefillBillFromInTray();
          this.downloadDocument();
        };

        const onFailure = ({ message }) => {
          this.dispatcher.setDocumentLoadingState(false);
          this.dispatcher.openDangerAlert({ message });
          this.dispatcher.unlinkInTrayDocument();
        };

        const linkContent = {
          id: getBillId(state),
          uid: getBillUid(state),
          loadAttachmentId: true,
          inTrayDocumentId: id,
        };

        this.dispatcher.setDocumentLoadingState(true);
        this.integrator.linkInTrayDocument({
          onSuccess,
          onFailure,
          linkContent,
        });
      },
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  openUnlinkDocumentModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.UnlinkDocument,
    });
  };

  openRecordPaymentModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.RecordPayment,
    });
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'open_bill_payment_modal_clicked',
        page: 'Bill',
      },
    });
  };

  unlinkInTrayDocument = () => {
    const state = this.store.getState();
    this.dispatcher.closeModal();

    if (getIsCreating(state)) {
      this.dispatcher.unlinkInTrayDocument();
      return;
    }

    const onSuccess = () => {
      this.dispatcher.setDocumentLoadingState(false);
      this.dispatcher.unlinkInTrayDocument();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setDocumentLoadingState(false);
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.setDocumentLoadingState(true);
    this.integrator.unlinkInTrayDocument({ onSuccess, onFailure });
  };

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'Bill',
        },
      });
    }
  };

  openRecurringTransactionListModal = () => {
    const state = this.store.getState();

    this.recurringTransactionListModal.run({
      context: getRecurringTransactionListModalContext(state),
      onComplete: ({ id }) => {
        this.recurringTransactionListModal.close();

        if (id) {
          this.loadPrefillFromRecurringBill(id);
        }
      },
      onLoadFailure: (message) => {
        this.recurringTransactionListModal.close();
        this.dispatcher.openDangerAlert({ message });
      },
    });
  };

  loadPrefillFromRecurringBill = (recurringTransactionId) => {
    this.dispatcher.startBlocking();

    const onSuccess = (data) => {
      this.dispatcher.stopBlocking();

      const isReadOnly = getIsRecurringTransactionReadOnly(data);
      if (isReadOnly) {
        this.dispatcher.openDangerAlert({
          message:
            'Unable to prefill bill. The selected recurring transaction contains unsupported feature.',
        });
      } else {
        this.dispatcher.loadPrefillFromRecurringBill(data);
        this.updateComponentsAfterLoadBill();
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.loadPrefillFromRecurringBill({
      recurringTransactionId,
      onSuccess,
      onFailure,
    });
  };

  redirectToCreateNewBill = () => {
    const state = this.store.getState();
    const url = getCreateNewBillUrl(state);

    this.navigateTo(url);
  };

  redirectToBillList = () => {
    const state = this.store.getState();
    const url = getBillListUrl(state);

    this.navigateTo(url);
  };

  redirectToBillPayment = () => {
    const state = this.store.getState();
    const url = getBillPaymentUrl(state);

    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'pay_multiple_bills_clicked',
        page: 'Bill',
      },
    });

    this.navigateTo(url);
  };

  redirectToSupplierPayment = () => {
    const state = this.store.getState();
    const url = getSupplierPaymentUrl(state);

    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'pay_multiple_bills_clicked',
        page: 'Bill',
      },
    });

    this.navigateTo(url);
  };

  redirectToSavedBillPayment = () => {
    const state = this.store.getState();
    const url = getSavedBillPaymentUrl(state);

    this.navigateTo(url);
  };

  redirectToContactDetail = () => {
    const state = this.store.getState();
    const url = getSupplierLink(state);

    this.navigateTo(url);
  };

  redirectToInTray = () => {
    const state = this.store.getState();
    const url = getInTrayUrl(state);

    this.navigateTo(url);
  };

  openAlert = ({ type, message }) => {
    if (type === AlertType.SUCCESS) {
      this.dispatcher.openSuccessAlert({ message });
    }

    if (type === AlertType.DANGER) {
      this.dispatcher.openDangerAlert({ message });
    }
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const supplierId = getSupplierId(state);
    if (supplierId) {
      this.contactComboboxModule.load(supplierId);
    }
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  dismissPreConversionModal = () => {
    this.dispatcher.updateIssueDate(formatIsoDate(new Date()));
    this.closeModal();
  };

  loadItemCombobox = () => {
    const state = this.store.getState();
    const context = getItemComboboxContext(state);
    this.itemComboboxModule.run(context);
  };

  updateItemCombobox = () => {
    const state = this.store.getState();
    const selectedItemIds = getUniqueSelectedItemIds(state);
    if (selectedItemIds.length > 0) {
      this.itemComboboxModule.load(selectedItemIds);
    }
  };

  renderItemCombobox = (props) => {
    return this.itemComboboxModule
      ? this.itemComboboxModule.render(props)
      : null;
  };

  loadJobCombobox = () => {
    const state = this.store.getState();
    const context = getJobModalContext(state);
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

  displayPreConversionAlert = () =>
    this.dispatcher.setShowPreConversionAlert(true);

  dismissPreConversionAlert = () =>
    this.dispatcher.setShowPreConversionAlert(false);

  convertToPreConversionBill = () => {
    this.dispatcher.convertToPreConversionBill();
    this.closeModal();
    this.displayPreConversionAlert();

    const state = this.store.getState();
    if (state.bill.lines[0].amount) {
      this.calculateBillLines({ index: 0, key: 'amount' });
    }
  };

  changeBankStatementText = ({ value }) => {
    this.dispatcher.changeBankStatementText(value);
  };

  updateBankStatementText = ({ value }) => {
    this.dispatcher.updateBankStatementText(value);
  };

  loadNewBillPayment = () => {
    this.dispatcher.setBillPaymentModalLoadingState(true);
    const onSuccess = (response) => {
      this.dispatcher.setBillPaymentModalLoadingState(false);
      this.dispatcher.loadBillPayment({
        ...response,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setBillPaymentModalLoadingState(false);
      this.dispatcher.setBillPaymentModalAlert({ type: 'danger', message });
    };

    this.integrator.loadBillPayment({ onSuccess, onFailure });
  };

  saveBillPayment = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    this.dispatcher.setBillPaymentModalSubmittingState(true);

    const onSuccess = (response) => {
      if (getShouldSendRemittanceAdvice(state)) {
        const { id } = response;
        this.dispatcher.updateBillPaymentId(id);
        this.pushMessage({
          type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
          content: response.message,
        });
        this.redirectToSavedBillPayment();
        return;
      }

      this.reloadBill({
        onSuccess: () => {
          this.dispatcher.setBillPaymentModalSubmittingState(false);
          this.dispatcher.closeModal();
          this.dispatcher.openSuccessAlert({ message: response.message });
        },
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setBillPaymentModalSubmittingState(false);
      this.dispatcher.setBillPaymentModalAlert({ type: 'danger', message });
    };

    this.integrator.saveBillPayment({ onSuccess, onFailure });
  };

  updateHeaderOption = ({ key, value }) => {
    this.dispatcher.updateHeaderOption({ key, value });

    if (key === 'accountId') this.updateReferenceId();
  };

  updateIsElectronicPayment = ({ value }) => {
    const state = this.store.getState();

    const accountId = value
      ? state.recordBillPayment.electronicClearingAccountId
      : getDefaultAccountId(state);

    this.updateHeaderOption({ key: 'accountId', value: accountId });
  };

  updateReferenceId = () => {
    const onSuccess = ({ referenceId }) => {
      this.dispatcher.updateReferenceId(referenceId);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setBillPaymentModalAlert({ type: 'danger', message });
    };

    this.integrator.getReferenceId({ onSuccess, onFailure });
  };

  render = () => {
    const accountModal = this.accountModalModule.render();
    const jobModal = this.jobModalModule.render();
    const inTrayModal = this.inTrayModalModule.render();
    const recurringListModal = this.recurringTransactionListModal.render();

    const view = (
      <Provider store={this.store}>
        <BillView
          renderItemCombobox={this.renderItemCombobox}
          renderContactCombobox={this.renderContactCombobox}
          renderJobCombobox={this.renderJobCombobox}
          inTrayModal={inTrayModal}
          accountModal={accountModal}
          jobModal={jobModal}
          recurringListModal={recurringListModal}
          onSaveButtonClick={this.handleSaveBill}
          onSaveAndButtonClick={this.openSaveAndModal}
          onConfirmSaveAndRedirect={this.saveAndRedirect}
          onDiscardAndRedirect={this.discardAndRedirect}
          onCancelButtonClick={this.openCancelModal}
          onDeleteButtonClick={this.openDeleteModal}
          onExportPdfButtonClick={this.openExportPdfModalOrSaveAndExportPdf}
          onModalClose={this.closeModal}
          onCancelModalConfirm={this.cancelBill}
          onDeleteModalConfirm={this.deleteBill}
          onConfirmSaveAmountDueWarningButtonClick={this.saveBill}
          onConfirmSaveAndCreateNewButtonClick={this.saveAndCreateNewBill}
          onConfirmSaveAndDuplicateButtonClick={this.saveAndDuplicateBill}
          onInputAlert={this.openAlert}
          onDismissAlert={this.closeAlert}
          onUpdateLayout={this.updateLayout}
          onUpdateBillOption={this.updateBillOption}
          onIssueDateBlur={this.validateIssueDate}
          serviceLayoutListeners={{
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRowInputBlur: this.calculateBillLines,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onAddJob: this.openJobModal,
            onUpdateBillOption: this.updateBillOption,
            onViewedAccountToolTip: this.viewedAccountToolTip,
          }}
          itemAndServiceLayoutListeners={{
            onRowInputBlur: this.calculateBillLines,
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onAddJob: this.openJobModal,
            onAddItemButtonClick: this.openInventoryModal,
            onUpdateBillOption: this.updateBillOption,
            onViewedAccountToolTip: this.viewedAccountToolTip,
          }}
          onPrefillButtonClick={this.openInTrayModal}
          onPrefillFromRecurringButtonClick={
            this.openRecurringTransactionListModal
          }
          exportPdfModalListeners={{
            onCancel: this.closeModal,
            onConfirm: this.exportPdf,
            onChange: this.dispatcher.updateExportPdfDetail,
          }}
          onAddSupplierButtonClick={this.openSupplierModal}
          onOpenSplitViewButtonClick={this.downloadDocument}
          onCloseSplitViewButtonClick={this.closeSplitView}
          onUnlinkDocumentButtonClick={this.openUnlinkDocumentModal}
          onUnlinkDocumentConfirm={this.unlinkInTrayDocument}
          onClosePrefillInfo={this.dispatcher.hidePrefillInfo}
          onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
          onUpgradeModalUpgradeButtonClick={this.subscribeOrUpgrade}
          onRecordPaymentClick={this.openRecordPaymentModal}
          recordBillPaymentModalListeners={{
            onCancel: this.closeModal,
            onChangeBankStatementText: this.changeBankStatementText,
            onEditSupplierClick: this.redirectToContactDetail,
            // TODO Need change it to redirectToSupplierPayment after release supplier payment module
            onRecordMultiplePayments: this.redirectToBillPayment,
            onRecordPaymentModalOpen: this.loadNewBillPayment,
            onShouldSendRemittanceAdviceChange: this.dispatcher
              .updateShouldSendRemittanceAdvice,
            onUpdateBankStatementText: this.updateBankStatementText,
            onUpdateHeaderOption: this.updateHeaderOption,
            onUpdateIsElectronicPayment: this.updateIsElectronicPayment,
            onUpdateBillPaymentAmountFields: this.dispatcher
              .updateBillPaymentAmountFields,
            onSaveBillPayment: this.saveBillPayment,
          }}
          preConversionModalListeners={{
            onCancel: this.dismissPreConversionModal,
            onConfirm: this.convertToPreConversionBill,
          }}
          onDismissPreConversionAlert={this.dismissPreConversionAlert}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState({
      ...context,
    });
  };

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.itemComboboxModule.resetState();
    this.accountModalModule.resetState();
    this.inTrayModalModule.resetState();
    this.recurringTransactionListModal.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  saveHandler = () => {
    if (this.recurringTransactionListModal.isOpened()) {
      this.recurringTransactionListModal.complete();
      return;
    }

    this.saveBill();
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.setInitialState({
      isRecurringTransactionEnabled,
      ...context,
    });
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveHandler,
    });
    this.render();
    this.readMessages();

    this.loadBill();
    this.loadContactCombobox();
    this.loadItemCombobox();
    this.loadJobCombobox();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal({ modalType: ModalType.Unsaved });
    } else {
      this.navigateTo(url);
    }
  };
}

export default BillModule;
