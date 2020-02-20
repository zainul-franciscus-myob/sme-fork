import { connect } from 'react-redux';
import React from 'react';

import {
  getBillLayout,
  getIsAlertShown,
  getIsBlocking,
  getIsModalShown,
  getLoadingState,
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
import BillItemAndServiceTable from './BillItemAndServiceTable';
import BillLayout from '../types/BillLayout';
import BillLayoutPopover from './BillLayoutPopover';
import BillModal from './BillModal';
import BillPrimaryOptions from './BillPrimaryOptions';
import BillSecondaryOptions from './BillSecondaryOptions';
import BillServiceTable from './BillServiceTable';
import MasterDetailLineItemTemplate
  from '../../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import UpgradeModal from './UpgradeModal';
import styles from './BillView.module.css';

const BillView = ({
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  accountModal,
  isAlertShown,
  isModalShown,
  isSplitViewShown,
  isBlocking,
  loadingState,
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
  onUpdateLayout,
  exportPdfModalListeners,
  onAddSupplierButtonClick,
  onPrefillButtonClick,
  onOpenSplitViewButtonClick,
  onCloseSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
  onUnlinkDocumentConfirm,
  onClosePrefillInfo,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
  onCreatePaymentClick,
}) => {
  const tableLayoutOption = (
    <BillLayoutPopover
      layout={layout}
      isCalculating={isBlocking}
      onUpdateLayout={onUpdateLayout}
    />
  );
  const table = {
    [BillLayout.ITEM_AND_SERVICE]: (
      <BillItemAndServiceTable listeners={itemAndServiceLayoutListeners} />
    ),
    [BillLayout.SERVICE]: (
      <BillServiceTable listeners={serviceLayoutListeners} />
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
      <BillHeader onCreatePaymentClick={onCreatePaymentClick} />
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
      detailHeaderClassName={styles.secondaryOptions}
      primaryOptions={(
        <BillPrimaryOptions
          onUpdateBillOption={onUpdateBillOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
      )}
      secondaryOptions={
        <BillSecondaryOptions onUpdateBillOption={onUpdateBillOption} />
      }
      tableLayoutOption={tableLayoutOption}
      table={table}
      actions={(
        <BillActions
          onSaveButtonClick={onSaveButtonClick}
          onSaveAndButtonClick={onSaveAndButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onExportPdfButtonClick={onExportPdfButtonClick}
          onCreatePaymentClick={onCreatePaymentClick}
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
      loadingState={loadingState}
      view={view}
    />
  );
};

const mapStateToProps = state => ({
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isBlocking: getIsBlocking(state),
  layout: getBillLayout(state),
  loadingState: getLoadingState(state),
  isSplitViewShown: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
});

export default connect(mapStateToProps)(BillView);
