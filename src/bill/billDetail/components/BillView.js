import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown,
  getIsLoading,
  getIsModalShown,
  getLayout,
} from '../selectors/billSelectors';
import {
  getShowPrefillInfo,
  getShowSplitView,
} from '../selectors/BillInTrayDocumentSelectors';
import BillActions from './BillActions';
import BillAlert from './BillAlert';
import BillDocumentViewer from './BillDocumentViewer';
import BillHeader from './BillHeader';
import BillInTrayDocumentView from './BillInTrayDocumentView';
import BillItemTable from './BillItemTable';
import BillModal from './BillModal';
import BillPrimaryOptions from './BillPrimaryOptions';
import BillSecondaryOptions from './BillSecondaryOptions';
import BillServiceTable from './BillServiceTable';
import MasterDetailLineItemTemplate
  from '../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../components/PageView/PageView';
import UpgradeModal from './UpdateModal';

const BillView = ({
  onAddAccount,
  accountModal,
  isAlertShown,
  isModalShown,
  isSplitViewShown,
  isLoading,
  showPrefillInfo,
  layout,
  inventoryModal,
  inTrayModal,
  contactModal,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onDismissAlert,
  onUpdateBillOption,
  onAmountPaidBlur,
  onServiceRowInputBlur,
  onAddServiceRow,
  onServiceRowChange,
  onRemoveServiceRow,
  onItemRowInputBlur,
  onAddItemRow,
  onItemRowChange,
  onRemoveItemRow,
  exportPdfModalListeners,
  onAddItemButtonClick,
  onAddSupplierButtonClick,
  onPrefillButtonClick,
  onOpenSplitViewButtonClick,
  onCloseSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
  onUnlinkDocumentConfirm,
  onClosePrefillInfo,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
}) => {
  const table = {
    item: (
      <BillItemTable
        onRowInputBlur={onItemRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAmountPaidBlur={onAmountPaidBlur}
        onAddRow={onAddItemRow}
        onRowChange={onItemRowChange}
        onRemoveRow={onRemoveItemRow}
        onAddItemButtonClick={onAddItemButtonClick}
      />
    ),
    service: (
      <BillServiceTable
        onRowInputBlur={onServiceRowInputBlur}
        onUpdateBillOption={onUpdateBillOption}
        onAmountPaidBlur={onAmountPaidBlur}
        onAddRow={onAddServiceRow}
        onRowChange={onServiceRowChange}
        onRemoveRow={onRemoveServiceRow}
        onAddAccount={onAddAccount}
      />
    ),
  }[layout];

  const stickyHeader = (
    <div>
      {isAlertShown && (
      <BillAlert onDismissAlert={
        () => {
          // Trigger resize event to force MasterDetailTemplate recalculate sticky height
          window.dispatchEvent(new Event('resize'));
          onDismissAlert();
        }
      }
      />)}
      <BillHeader />
    </div>
  );

  const detail = (
    <BillDocumentViewer
      onCloseSplitViewButtonClick={onCloseSplitViewButtonClick}
      onUnlinkDocumentButtonClick={onUnlinkDocumentButtonClick}
    />
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
      {contactModal}
      {inTrayModal}
      {upgradeModal}
      {isModalShown && (
        <BillModal
          onModalClose={onModalClose}
          onCancelModalConfirm={onCancelModalConfirm}
          onDeleteModalConfirm={onDeleteModalConfirm}
          onConfirmSaveAndCreateNewButtonClick={
            onConfirmSaveAndCreateNewButtonClick
          }
          onConfirmSaveAndDuplicateButtonClick={
            onConfirmSaveAndDuplicateButtonClick
          }
          exportPdfModalListeners={exportPdfModalListeners}
          onUnlinkDocumentConfirm={onUnlinkDocumentConfirm}
        />
      )}
      {!isSplitViewShown && (
        <BillInTrayDocumentView
          onPrefillButtonClick={onPrefillButtonClick}
          onOpenSplitViewButtonClick={onOpenSplitViewButtonClick}
          onUnlinkDocumentButtonClick={onUnlinkDocumentButtonClick}
        />
      )}
    </div>
  );

  const prefillInfo = 'We\'ve used your document to fill in some details. Check the fields highlighted in blue.';

  const view = (
    <MasterDetailLineItemTemplate
      optionInfo={showPrefillInfo && prefillInfo}
      onDismissOptionInfo={onClosePrefillInfo}
      primaryOptions={(
        <BillPrimaryOptions
          onUpdateBillOption={onUpdateBillOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
      )}
      secondaryOptions={
        <BillSecondaryOptions onUpdateBillOption={onUpdateBillOption} />
      }
      table={table}
      actions={(
        <BillActions
          onSaveButtonClick={onSaveButtonClick}
          onSaveAndButtonClick={onSaveAndButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onExportPdfButtonClick={onExportPdfButtonClick}
        />
      )}
      subHeadChildren={subHeaderChildren}
      detail={detail}
      pageHead={stickyHeader}
      showDetail={isSplitViewShown}
    />
  );

  return (
    <PageView
      isLoading={isLoading}
      view={view}
    />
  );
};

const mapStateToProps = state => ({
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isLoading: getIsLoading(state),
  layout: getLayout(state),
  isSplitViewShown: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
});

export default connect(mapStateToProps)(BillView);
