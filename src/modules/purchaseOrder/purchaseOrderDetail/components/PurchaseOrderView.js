import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getIsAlertShown,
  getIsBlocking,
  getIsCreating,
  getIsModalShown,
  getIsReadOnly,
  getLoadingState,
  getPurchaseOrderLayout,
  getReadOnlyMessage,
} from '../selectors/purchaseOrderSelectors';
import MasterDetailLineItemTemplate from '../../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import PurchaseOrderActions from './PurchaseOrderActions';
import PurchaseOrderAlert from './PurchaseOrderAlert';
import PurchaseOrderHeader from './PurchaseOrderHeader';
import PurchaseOrderItemAndServiceTable from './PurchaseOrderItemAndServiceTable';
import PurchaseOrderLayout from '../types/PurchaseOrderLayout';
import PurchaseOrderLayoutPopover from './PurchaseOrderLayoutPopover';
import PurchaseOrderModal from './PurchaseOrderModal';
import PurchaseOrderPrimaryOptions from './PurchaseOrderPrimaryOptions';
import PurchaseOrderSecondaryOptions from './PurchaseOrderSecondaryOptions';
import PurchaseOrderServiceTable from './PurchaseOrderServiceTable';
import UpgradeModal from './UpgradeModal';
import styles from './PurchaseOrderView.module.css';

const getOptionInfo = ({ isReadOnly, readOnlyMessage }) => {
  if (isReadOnly) {
    return readOnlyMessage;
  }

  return undefined;
};

const PurchaseOrderView = ({
  renderContactCombobox,
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  renderItemCombobox,
  accountModal,
  jobModal,
  isAlertShown,
  isModalShown,
  isSplitViewShown,
  isBlocking,
  isDocumentLoading,
  loadingState,
  isReadOnly,
  isCreating,
  readOnlyMessage,
  layout,
  inventoryModal,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onConvertToBillButtonClick,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAmountDueWarningButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onInputAlert,
  onDismissAlert,
  onUpdateLayout,
  onUpdatePurchaseOrderOption,
  onIssueDateBlur,
  exportPdfModalListeners,
  onAddSupplierButtonClick,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
  onConfirmSaveAndRedirect,
  onDiscardAndRedirect,
}) => {
  const tableLayoutOption = (
    <PurchaseOrderLayoutPopover
      layout={layout}
      isReadOnly={isReadOnly}
      isCalculating={isBlocking}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const itemAndServiceTable = (
    <PurchaseOrderItemAndServiceTable
      renderItemCombobox={renderItemCombobox}
      listeners={itemAndServiceLayoutListeners}
    />
  );

  const serviceTable = (
    <PurchaseOrderServiceTable listeners={serviceLayoutListeners} />
  );

  const table = {
    [PurchaseOrderLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
    [PurchaseOrderLayout.SERVICE]: serviceTable,
    [PurchaseOrderLayout.PROFESSIONAL]: serviceTable,
    [PurchaseOrderLayout.MISCELLANEOUS]: serviceTable,
  }[layout];

  const stickyHeader = (
    <div>
      {isAlertShown && (
        <PurchaseOrderAlert
          onDismissAlert={() => {
            // Trigger resize event to force MasterDetailTemplate recalculate sticky height
            window.dispatchEvent(new Event('resize'));
            onDismissAlert();
          }}
        />
      )}
      <PurchaseOrderHeader
        isCreating={isCreating}
        onConvertToBillButtonClick={onConvertToBillButtonClick}
      />
    </div>
  );

  const upgradeModal = (
    <UpgradeModal
      onUpgradeModalDismiss={onUpgradeModalDismiss}
      onUpgradeModalUpgradeButtonClick={onUpgradeModalUpgradeButtonClick}
    />
  );

  const subHeaderChildren = (
    <div>
      {inventoryModal}
      {accountModal}
      {jobModal}
      {upgradeModal}
      {isModalShown && (
        <PurchaseOrderModal
          onModalClose={onModalClose}
          onCancelModalConfirm={onCancelModalConfirm}
          onDeleteModalConfirm={onDeleteModalConfirm}
          onConfirmSaveAmountDueWarningButtonClick={
            onConfirmSaveAmountDueWarningButtonClick
          }
          onConfirmSaveAndCreateNewButtonClick={
            onConfirmSaveAndCreateNewButtonClick
          }
          onConfirmSaveAndDuplicateButtonClick={
            onConfirmSaveAndDuplicateButtonClick
          }
          exportPdfModalListeners={exportPdfModalListeners}
          onConfirmSaveAndRedirect={onConfirmSaveAndRedirect}
          onDiscardAndRedirect={onDiscardAndRedirect}
        />
      )}
    </div>
  );

  const optionInfo = getOptionInfo({
    isReadOnly,
    readOnlyMessage,
  });

  const view = (
    <MasterDetailLineItemTemplate
      optionInfo={optionInfo}
      onDismissOptionInfo={undefined}
      detailHeaderClassName={classNames(styles.secondaryOptions, styles.detail)}
      primaryOptions={
        <PurchaseOrderPrimaryOptions
          renderContactCombobox={renderContactCombobox}
          onInputAlert={onInputAlert}
          onUpdatePurchaseOrderOption={onUpdatePurchaseOrderOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
      }
      secondaryOptions={
        <PurchaseOrderSecondaryOptions
          onUpdatePurchaseOrderOption={onUpdatePurchaseOrderOption}
          onIssueDateBlur={onIssueDateBlur}
        />
      }
      tableLayoutOption={tableLayoutOption}
      table={
        <div className={classNames(isReadOnly && styles.disabledTable)}>
          {table}
        </div>
      }
      actions={
        <PurchaseOrderActions
          onSaveButtonClick={onSaveButtonClick}
          onSaveAndButtonClick={onSaveAndButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onExportPdfButtonClick={onExportPdfButtonClick}
          onConvertToBillButtonClick={onConvertToBillButtonClick}
        />
      }
      subHeadChildren={subHeaderChildren}
      pageHead={stickyHeader}
      showDetail={isSplitViewShown}
      templateClassName={styles.wrapper}
    />
  );

  return (
    <PageView
      isLoading={isDocumentLoading}
      loadingState={loadingState}
      view={view}
    />
  );
};

const mapStateToProps = (state) => ({
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isBlocking: getIsBlocking(state),
  layout: getPurchaseOrderLayout(state),
  loadingState: getLoadingState(state),
  isReadOnly: getIsReadOnly(state),
  readOnlyMessage: getReadOnlyMessage(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(PurchaseOrderView);
