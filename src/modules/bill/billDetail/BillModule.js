import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from './types/BillMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getBillId,
  getBillUid,
  getContextForInventoryModal,
  getCreateSupplierContactModalContext,
  getHasLineBeenPrefilled,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLineAmountsTaxInclusive,
  getIsLineEdited,
  getIsLinesEmpty,
  getIsPageEdited,
  getIsTaxInclusive,
  getLinesForTaxCalculation,
  getNewLineIndex,
  getRouteUrlParams,
  getTaxCodeOptions,
} from './selectors/billSelectors';
import {
  getBillListUrl,
  getBillPaymentUrl,
  getCreateNewBillUrl,
  getDuplicateBillUrl,
  getFinalRedirectUrl,
  getReadBillWithExportPdfModalUrl,
  getSubscriptionSettingsUrl,
} from './selectors/BillRedirectSelectors';
import { getExportPdfFilename, getShouldSaveAndExportPdf } from './selectors/exportPdfSelectors';
import {
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
import { getLinkInTrayContentWithoutIds } from './selectors/BillIntegratorSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import BillView from './components/BillView';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InTrayModalModule from '../../inTray/inTrayModal/InTrayModalModule';
import InventoryModalModule from '../../inventory/inventoryModal/InventoryModalModule';
import ModalType from './types/ModalType';
import SaveActionType from './types/SaveActionType';
import Store from '../../../store/Store';
import billReducer from './billReducer';
import createBillDispatcher from './createBillDispatcher';
import createBillIntegrator from './createBillIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

class BillModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, replaceURLParams, globalCallbacks,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(billReducer);
    this.dispatcher = createBillDispatcher(this.store);
    this.integrator = createBillIntegrator(this.store, integration);
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactModalModule = new ContactModalModule({ integration });
    this.inventoryModalModule = new InventoryModalModule({ integration });
    this.inTrayModalModule = new InTrayModalModule({ integration });
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.bill);
    this.globalCallbacks = globalCallbacks;
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: message => this.dispatcher.openDangerAlert({ message }),
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

  finalRedirect = () => {
    const state = this.store.getState();
    const finalRedirectUrl = getFinalRedirectUrl(state);

    window.location.href = finalRedirectUrl;
  }

  prefillBillFromInTray() {
    const onSuccess = (response) => {
      this.dispatcher.stopLoading();
      this.dispatcher.setDocumentLoadingState(false);
      this.dispatcher.prefillDataFromInTray(response);
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
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
      const state = this.store.getState();

      this.dispatcher.stopLoading();
      this.dispatcher.loadBill(response);

      if (getIsCreatingFromInTray(state)) {
        this.prefillBillFromInTray();
      }
    };

    const onFailure = () => {
      this.dispatcher.failLoading();
    };

    this.dispatcher.startLoading();
    this.integrator.loadBill({ onSuccess, onFailure });
  }

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
        content: 'Bill created, but the document failed to link. Open the bill to link the document again',
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
        this.pushMessage({
          type: SUCCESSFULLY_SAVED_BILL,
          content: response.message,
        });
        onSuccess(response);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.startBlocking();

    this.integrator.saveBill({
      onSuccess: handleSaveSuccess,
      onFailure,
    });
  };

  saveBill = () => {
    const onSuccess = () => {
      this.globalCallbacks.inTrayBillSaved();
      this.finalRedirect();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndCreateNewBill = () => {
    this.dispatcher.closeModal();

    const redirectToCreateNewBill = () => {
      this.globalCallbacks.inTrayBillSaved();
      const state = this.store.getState();
      const url = getCreateNewBillUrl(state);
      window.location.href = url;
    };

    const onSuccess = () => redirectToCreateNewBill();

    this.saveBillAnd({ onSuccess });
  };

  saveAndDuplicateBill = () => {
    this.dispatcher.closeModal();

    const redirectToDuplicateBill = () => {
      const state = this.store.getState();
      const url = getDuplicateBillUrl(state);
      window.location.href = url;
    };

    const onSuccess = ({ id }) => {
      this.globalCallbacks.inTrayBillSaved();
      const state = this.store.getState();
      const isCreating = getIsCreating(state);

      if (isCreating) {
        this.dispatcher.updateBillId(id);
      }
      redirectToDuplicateBill();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndExportPdf = () => {
    const redirectToReadBillWithExportModal = () => {
      const state = this.store.getState();
      const url = getReadBillWithExportPdfModalUrl(state);
      window.location.href = url;
    };

    const onSuccess = ({ id }) => {
      this.globalCallbacks.inTrayBillSaved();
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateBillId(id);
      }
      redirectToReadBillWithExportModal();
    };

    this.saveBillAnd({ onSuccess });
  }

  deleteBill = () => {
    this.dispatcher.closeModal();
    this.dispatcher.startBlocking();

    const onSuccess = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL,
        content: message,
      });
      this.finalRedirect();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.deleteBill({ onSuccess, onFailure });
  };

  cancelBill = () => {
    this.finalRedirect();
  };

  openSaveAndModal = (saveActionType) => {
    const modalType = {
      [SaveActionType.SAVE_AND_CREATE_NEW]: ModalType.SaveAndCreateNew,
      [SaveActionType.SAVE_AND_DUPLICATE]: ModalType.SaveAndDuplicate,
    }[saveActionType];

    this.dispatcher.openModal({ modalType });
  }

  openCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.dispatcher.openModal({
        modalType: ModalType.CancelModal,
      });
    } else {
      this.finalRedirect();
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

    this.dispatcher.updateBillOption({ key, value });

    if (isSupplierIdKey) {
      this.loadSupplierAddress();
    }

    if (isTaxInclusiveKey) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }

    if (isExpenseAccountIdKey) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  updateLayout = ({ value }) => {
    this.dispatcher.updateLayout({ value });
    const state = this.store.getState();

    if (!getIsLinesEmpty(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

  updateBillLine = ({ index, key, value }) => {
    this.dispatcher.updateBillLine({ index, key, value });

    if (getIsLineTaxCodeIdKey(key) || getIsLineAccountIdKey(key)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    } else if (getIsLineItemIdKey(key)) {
      const hasLineBeenPrefilled = getHasLineBeenPrefilled(this.store.getState(), index);
      if (hasLineBeenPrefilled) {
        this.dispatcher.updateLineItemId({ index, value });
      } else {
        this.loadItemDetailForLine({ index, itemId: value });
      }
    }
  }

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

    if (isLinesEmpty) {
      this.dispatcher.resetTotals();
    } else {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

  calculateBillLines = ({ index, key }) => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.dispatcher.formatBillLine({ index, key });
      this.dispatcher.calculateLineAmounts({ index, key });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

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
        isTaxInclusive, isSwitchingTaxInclusive,
      ),
    });

    this.dispatcher.getTaxCalculations(taxCalculations);
  }

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
      index, itemId, onSuccess, onFailure,
    });
  }

  calculateAmountPaid = () => {
    const state = this.store.getState();
    const isLinesEmpty = getIsLinesEmpty(state);
    this.dispatcher.formatAmountPaid();

    if (!isLinesEmpty) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  }

  loadSupplierAddress = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.loadSupplierAddress(response);
      this.dispatcher.stopBlocking();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.loadSupplierAddress({ onSuccess, onFailure });
  }

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
  }

  openExportPdfModalOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExport = getShouldSaveAndExportPdf(state);
    if (shouldSaveAndExport) {
      this.saveAndExportPdf();
    } else {
      this.dispatcher.openModal({ modalType: ModalType.ExportPdf });
    }
  }

  openSupplierModal = () => {
    const state = this.store.getState();
    const context = getCreateSupplierContactModalContext(state);

    this.contactModalModule.run({
      context,
      onLoadFailure: message => this.dispatcher.setAlert({ type: 'danger', message }),
      onSaveSuccess: this.loadSupplierAfterCreate,
    });
  };

  loadSupplierAfterCreate = ({ message, id }) => {
    this.contactModalModule.resetState();
    this.dispatcher.openSuccessAlert({ message });
    this.dispatcher.startSupplierBlocking();

    const onSuccess = (payload) => {
      this.dispatcher.stopSupplierBlocking();
      this.dispatcher.loadSupplierAfterCreate(id, payload);
    };

    const onFailure = () => {
      this.dispatcher.stopSupplierBlocking();
    };

    this.integrator.loadSupplierAfterCreate({ id, onSuccess, onFailure });
  };

  updateUrlFromState = (state) => {
    const params = getRouteUrlParams(state);
    this.replaceURLParams(params);
  }

  readMessages = () => {
    const messageTypes = [SUCCESSFULLY_SAVED_BILL, SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK];
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message, type } = successMessage;
      if (type === SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK) {
        this.dispatcher.openInfoAlert({ message });
      } else {
        this.dispatcher.openSuccessAlert({ message });
      }
    }
  };

  loadItemOption = ({ itemId }, onChangeItemTableRow) => {
    const onSuccess = (response) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.loadItemOption(response);
      onChangeItemTableRow({ id: itemId });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.startBlocking();

    this.integrator.loadItemOption({ onSuccess, onFailure, itemId });
  };

  saveItem = ({ message, itemId }, onChangeItemTableRow) => {
    this.dispatcher.openSuccessAlert({ message });
    this.loadItemOption({ itemId }, onChangeItemTableRow);
    this.inventoryModalModule.resetState();
  }

  failLoadItem = ({ message }) => {
    this.dispatcher.openDangerAlert({ message });
    this.inventoryModalModule.resetState();
  }

  openInventoryModal = (onChangeItemTableRow) => {
    const state = this.store.getState();
    const context = getContextForInventoryModal(state);

    this.inventoryModalModule.run({
      context,
      onSaveSuccess: (response) => {
        this.saveItem(response, onChangeItemTableRow);
      },
      onLoadFailure: this.failLoadItem,
    });
  }

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
          return;
        }

        const onSuccess = ({ message, attachmentId }) => {
          this.dispatcher.openSuccessAlert({ message });
          this.dispatcher.setAttachmentId(attachmentId);
          this.prefillBillFromInTray();
        };

        const onFailure = ({ message }) => {
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
        this.integrator.linkInTrayDocument({ onSuccess, onFailure, linkContent });
      },
      onLoadFailure: message => this.dispatcher.openDangerAlert({ message }),
    });
  };

  openUnlinkDocumentModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.UnlinkDocument,
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

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  redirectToSubscriptionSettings = () => {
    const state = this.store.getState();
    const url = getSubscriptionSettingsUrl(state);

    this.redirectToUrl(url);
  }

  redirectToBillList = () => {
    const state = this.store.getState();
    const url = getBillListUrl(state);

    this.redirectToUrl(url);
  };

  redirectToBillPayment = () => {
    const state = this.store.getState();
    const url = getBillPaymentUrl(state);

    this.redirectToUrl(url);
  }

  onUpgradeModalUpgradeButtonClick = this.redirectToSubscriptionSettings;

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();
    const inventoryModal = this.inventoryModalModule.render();
    const inTrayModal = this.inTrayModalModule.render();

    const view = (
      <Provider store={this.store}>
        <BillView
          inventoryModal={inventoryModal}
          inTrayModal={inTrayModal}
          onLoadItemOption={this.loadItemOption}
          accountModal={accountModal}
          onSaveButtonClick={this.saveBill}
          onSaveAndButtonClick={this.openSaveAndModal}
          onCancelButtonClick={this.openCancelModal}
          onDeleteButtonClick={this.openDeleteModal}
          onExportPdfButtonClick={this.openExportPdfModalOrSaveAndExportPdf}
          onModalClose={this.closeModal}
          onCancelModalConfirm={this.cancelBill}
          onDeleteModalConfirm={this.deleteBill}
          onConfirmSaveAndCreateNewButtonClick={this.saveAndCreateNewBill}
          onConfirmSaveAndDuplicateButtonClick={this.saveAndDuplicateBill}
          onDismissAlert={this.closeAlert}
          onUpdateLayout={this.updateLayout}
          onUpdateBillOption={this.updateBillOption}
          serviceLayoutListeners={{
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRowInputBlur: this.calculateBillLines,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onUpdateBillOption: this.updateBillOption,
            onAmountPaidBlur: this.calculateAmountPaid,
          }}
          itemAndServiceLayoutListeners={{
            onRowInputBlur: this.calculateBillLines,
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onAddItemButtonClick: this.openInventoryModal,
            onUpdateBillOption: this.updateBillOption,
            onAmountPaidBlur: this.calculateAmountPaid,
          }}
          onPrefillButtonClick={this.openInTrayModal}
          exportPdfModalListeners={{
            onCancel: this.closeModal,
            onConfirm: this.exportPdf,
            onChange: this.dispatcher.updateExportPdfDetail,
          }}
          contactModal={contactModal}
          onAddSupplierButtonClick={this.openSupplierModal}
          onOpenSplitViewButtonClick={this.downloadDocument}
          onCloseSplitViewButtonClick={this.closeSplitView}
          onUnlinkDocumentButtonClick={this.openUnlinkDocumentModal}
          onUnlinkDocumentConfirm={this.unlinkInTrayDocument}
          onClosePrefillInfo={this.dispatcher.hidePrefillInfo}
          onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
          onUpgradeModalUpgradeButtonClick={this.onUpgradeModalUpgradeButtonClick}
          onCreatePaymentClick={this.redirectToBillPayment}
        />
      </Provider>
    );
    this.setRootView(view);
  }

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  }

  resetState = () => {
    this.contactModalModule.resetState();
    this.inventoryModalModule.resetState();
    this.accountModalModule.resetState();
    this.inTrayModalModule.resetState();
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveBill,
    });
    this.render();
    this.readMessages();
    this.store.subscribe(this.updateUrlFromState);
    this.loadBill();
  }
}

export default BillModule;
