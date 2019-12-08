import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BILL, SUCCESSFULLY_SAVED_BILL } from './types/BillMessageTypes';
import {
  getAccountModalContext,
  getContextForInventoryModal,
  getCreateSupplierContactModalContext,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLinesEmpty,
  getIsPageEdited,
  getIsPendingCalculation,
  getLayout,
  getNewLineIndex,
  getRouteUrlParams,
} from './selectors/billSelectors';
import {
  getCreateNewBillUrl,
  getDuplicateBillUrl,
  getFinalRedirectUrl,
  getReadBillWithExportPdfModalUrl,
} from './selectors/BillRedirectSelectors';
import { getExportPdfFilename, getShouldSaveAndExportPdf } from './selectors/exportPdfSelectors';
import {
  getIsAmountPaidKey,
  getIsLineAccountIdKey,
  getIsLineAmountKey,
  getIsLineItemIdKey,
  getIsLineTaxCodeIdKey,
  getIsSupplierIdKey,
  getIsTaxInclusiveKey,
} from './selectors/BillModuleSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import BillView from './components/BillView';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InTrayModalModule from '../../inTray/inTrayModal/InTrayModalModule';
import InventoryModalModule from '../../inventory/inventoryModal/InventoryModalModule';
import LayoutType from './types/LayoutType';
import ModalType from './types/ModalType';
import SaveActionType from './types/SaveActionType';
import Store from '../../store/Store';
import billReducer from './billReducer';
import createBillDispatcher from './createBillDispatcher';
import createBillIntegrator from './createBillIntegrator';
import keyMap from '../../hotKeys/keyMap';
import openBlob from '../../common/blobOpener/openBlob';
import setupHotKeys from '../../hotKeys/setupHotKeys';

class BillModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, replaceURLParams,
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
    this.dispatcher.setAccountLoadingState(true);
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setAccountLoadingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setAccountLoadingState(false);
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
      this.dispatcher.prefillDataFromInTray(response);
    };

    const onFailure = () => {
      console.log('Failed to load');
    };

    this.integrator.prefillDataFromInTray({ onSuccess, onFailure });
  }

  loadBill = () => {
    const onSuccess = (response) => {
      const state = this.store.getState();
      const isCreatingFromInTray = getIsCreatingFromInTray(state);

      this.dispatcher.loadBill(response);

      // @TODO avoid this sequential call. Create dedicated load with intray data in BFF
      if (isCreatingFromInTray) {
        this.prefillBillFromInTray();
      } else {
        this.dispatcher.stopLoading();
      }
    };

    const onFailure = () => {
      console.log('Failed to load bill');
    };

    this.dispatcher.startLoading();
    this.integrator.loadBill({ onSuccess, onFailure });
  }

  saveBillAnd = ({ onSuccess }) => {
    const handleSuccess = (response) => {
      this.dispatcher.stopBlocking();
      onSuccess(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.startBlocking();

    this.integrator.saveBill({
      onSuccess: handleSuccess,
      onFailure,
    });
  };

  saveBill = () => {
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL,
        content: message,
      });

      this.finalRedirect();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndCreateNewBill = () => {
    this.dispatcher.closeModal();

    const redirectToCreateNewBill = () => {
      const state = this.store.getState();
      const url = getCreateNewBillUrl(state);
      window.location.href = url;
    };

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL,
        content: message,
      });

      redirectToCreateNewBill();
    };

    this.saveBillAnd({ onSuccess });
  };

  saveAndDuplicateBill = () => {
    this.dispatcher.closeModal();

    const redirectToDuplicateBill = () => {
      const state = this.store.getState();
      const url = getDuplicateBillUrl(state);
      window.location.href = url;
    };

    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);

      if (isCreating) {
        this.dispatcher.updateBillId(id);
      }
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL,
        content: message,
      });

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

    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateBillId(id);
      }

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL,
        content: message,
      });

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
    this.dispatcher.updateBillOption({ key, value });

    const state = this.store.getState();
    const isTaxInclusiveKey = getIsTaxInclusiveKey(key);
    const isSupplierIdKey = getIsSupplierIdKey(key);
    const isAmountPaidKey = getIsAmountPaidKey(key);
    const isLinesEmpty = getIsLinesEmpty(state);
    const layout = getLayout(state);

    if (isTaxInclusiveKey && !isLinesEmpty) {
      const handler = {
        [LayoutType.SERVICE]: this.serviceCalculate,
        [LayoutType.ITEM]: this.itemCalculateUpdateIsTaxInclusive,
      }[layout];

      handler();
    }

    if (isSupplierIdKey) {
      this.loadSupplierAddress();
    }

    if (isAmountPaidKey) {
      this.dispatcher.startPendingCalculation();
    }
  };

  calculateBillServiceLines = () => {
    const state = this.store.getState();
    const isPendingCalculation = getIsPendingCalculation(state);

    if (isPendingCalculation) {
      this.dispatcher.formatBillServiceLines();
      this.serviceCalculate();
    }
  }

  calculateBillItemLines = ({ index, key }) => {
    const state = this.store.getState();
    const isPendingCalculation = getIsPendingCalculation(state);

    if (isPendingCalculation) {
      this.itemCalculateUpdateLineAmount({ index, key });
    }
  }

  calculateAmountPaid = () => {
    const state = this.store.getState();
    const isPendingCalculation = getIsPendingCalculation(state);
    const isLinesEmpty = getIsLinesEmpty(state);
    const layout = getLayout(state);

    this.dispatcher.formatAmountPaid();

    if (isPendingCalculation && !isLinesEmpty) {
      const handler = {
        [LayoutType.ITEM]: this.itemCalculateUpdateAmountPaid,
        [LayoutType.SERVICE]: this.serviceCalculate,
      }[layout];

      handler();
    }
  }

  addBillServiceLine = ({ accountId }) => {
    this.dispatcher.addBillServiceLine({ accountId });
  }

  addBillItemLine = ({ itemId }) => {
    this.dispatcher.addBillItemLine({ itemId });

    const state = this.store.getState();
    const newLineIndex = getNewLineIndex(state);
    this.itemCalculateUpdateLineItem({ index: newLineIndex, itemId });
  }

  updateBillServiceLine = ({ index, key, value }) => {
    this.dispatcher.updateBillServiceLine({ index, key, value });

    const isLineAmountKey = getIsLineAmountKey(key);
    const shouldCalculateTotals = getIsLineTaxCodeIdKey(key) || getIsLineAccountIdKey(key);

    if (isLineAmountKey) {
      this.dispatcher.startPendingCalculation();
    }

    if (shouldCalculateTotals) {
      this.serviceCalculate();
    }
  }

  updateBillItemLine = ({ index, key, value }) => {
    this.dispatcher.updateBillItemLine({ index, key, value });

    const isLineAmountKey = getIsLineAmountKey(key);
    const isLineTaxCodeIdKey = getIsLineTaxCodeIdKey(key);
    const isLineItemIdKey = getIsLineItemIdKey(key);

    if (isLineAmountKey) {
      this.dispatcher.startPendingCalculation();
    }

    if (isLineItemIdKey) {
      this.itemCalculateUpdateLineItem({ index, itemId: value });
    }

    if (isLineTaxCodeIdKey) {
      this.itemCalculateUpdateLineTaxCode();
    }
  }

  removeBillServiceLine = ({ index }) => {
    this.dispatcher.removeBillLine({ index });

    const state = this.store.getState();
    const isLinesEmpty = getIsLinesEmpty(state);

    if (isLinesEmpty) {
      this.dispatcher.resetTotals();
    } else {
      this.serviceCalculate();
    }
  }

  removeBillItemLine = ({ index }) => {
    this.dispatcher.removeBillLine({ index });

    const state = this.store.getState();
    const isLinesEmpty = getIsLinesEmpty(state);

    if (isLinesEmpty) {
      this.dispatcher.resetTotals();
    } else {
      this.itemCalculateRemoveLine();
    }
  }

  itemCalculateRemoveLine = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.itemCalculate(response);
      this.dispatcher.stopBlocking();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.itemCalculateRemoveLine({ onSuccess, onFailure });
  }

  itemCalculateUpdateAmountPaid = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.itemCalculate(response);
      this.dispatcher.stopBlocking();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.itemCalculateUpdateAmountPaid({ onSuccess, onFailure });
  }

  itemCalculateUpdateIsTaxInclusive = () => {
    const state = this.store.getState();
    const isPendingCalculation = getIsPendingCalculation(state);

    // when a user is editing a line amount field
    // they can click the isTaxInclusive input
    // this will cause two calculate request to fire,
    // one being the calculate line amount,
    // and the other being the calculate tax inclusive
    // to avoid this, we check that the user is not editing
    // an amount input in the line
    if (!isPendingCalculation) {
      this.dispatcher.startBlocking();

      const onSuccess = (response) => {
        this.dispatcher.itemCalculate(response);
        this.dispatcher.stopBlocking();
      };

      const onFailure = ({ message }) => {
        this.dispatcher.openDangerAlert({ message });
        this.dispatcher.stopBlocking();
      };

      this.integrator.itemCalculateUpdateIsTaxInclusive({ onSuccess, onFailure });
    }
  }

  itemCalculateUpdateLineTaxCode = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.itemCalculate(response);
      this.dispatcher.stopBlocking();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.itemCalculateUpdateLineTaxCode({
      onSuccess, onFailure,
    });
  }

  itemCalculateUpdateLineItem = ({ index, itemId }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.itemCalculate(response);
      this.dispatcher.stopBlocking();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
    };

    this.integrator.itemCalculateUpdateLineItem({
      index, itemId, onSuccess, onFailure,
    });
  }

  itemCalculateUpdateLineAmount = ({ index, key }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.itemCalculate(response);
      this.dispatcher.stopBlocking();
      this.dispatcher.stopPendingCalculation();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
      this.dispatcher.stopPendingCalculation();
    };

    this.integrator.itemCalculateUpdateLineAmount({
      index, key, onSuccess, onFailure,
    });
  }

  serviceCalculate = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.serviceCalculate(response);
      this.dispatcher.stopBlocking();
      this.dispatcher.stopPendingCalculation();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopBlocking();
      this.dispatcher.stopPendingCalculation();
    };

    this.integrator.serviceCalculate({ onSuccess, onFailure });
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
    const messageTypes = [SUCCESSFULLY_SAVED_BILL];
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.openSuccessAlert({
        message,
      });
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

  toggleSplitView = () => {
    this.dispatcher.toggleSplitView();
  };

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
          onAddItemButtonClick={this.openInventoryModal}
          onLoadItemOption={this.loadItemOption}
          accountModal={accountModal}
          onAddAccount={this.openAccountModal}
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
          onUpdateBillOption={this.updateBillOption}
          onAmountPaidBlur={this.calculateAmountPaid}
          onServiceRowInputBlur={this.calculateBillServiceLines}
          onAddServiceRow={this.addBillServiceLine}
          onServiceRowChange={this.updateBillServiceLine}
          onRemoveServiceRow={this.removeBillServiceLine}
          onItemRowInputBlur={this.calculateBillItemLines}
          onAddItemRow={this.addBillItemLine}
          onItemRowChange={this.updateBillItemLine}
          onRemoveItemRow={this.removeBillItemLine}
          exportPdfModalListeners={{
            onCancel: this.closeModal,
            onConfirm: this.exportPdf,
            onChange: this.dispatcher.updateExportPdfDetail,
          }}
          contactModal={contactModal}
          onAddSupplierButtonClick={this.openSupplierModal}
          toggleSplitView={this.toggleSplitView}
        />
      </Provider>
    );
    this.setRootView(view);
  }

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  }

  resetState = () => this.dispatcher.resetState();

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

    this.inTrayModalModule.run({
      context: getAccountModalContext(this.store.getState()),
      onSaveSuccess: ({ id }) => console.log(id),
      onLoadFailure: message => console.log(message),
    });
  }
}

export default BillModule;
