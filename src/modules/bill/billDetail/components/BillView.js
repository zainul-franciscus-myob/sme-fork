import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getBillLayout,
  getIsAlertShown,
  getIsBlocking,
  getIsModalShown,
  getIsReadOnly,
  getLoadingState,
  getReadOnlyMessage,
} from '../selectors/billSelectors';
import {
  getIsDocumentLoading,
  getShouldShowInTrayDocument,
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

const getOptionInfo = ({ isReadOnly, readOnlyMessage, showPrefillInfo }) => {
  if (isReadOnly) {
    return readOnlyMessage;
  }

  if (showPrefillInfo) {
    return 'We\'ve used your document to fill in some details. Check the fields highlighted in blue.';
  }

  return undefined;
};

const BillView = ({
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  accountModal,
  jobModal,
  isAlertShown,
  isModalShown,
  isSplitViewShown,
  isBlocking,
  isDocumentLoading,
  loadingState,
  showPrefillInfo,
  isReadOnly,
  readOnlyMessage,
  shouldShowInTrayDocument,
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
  onConfirmSaveAmountDueWarningButtonClick,
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
  onConfirmSaveAndRedirect,
  onDiscardAndRedirect,
}) => {
  const tableLayoutOption = (
    <BillLayoutPopover
      layout={layout}
      isReadOnly={isReadOnly}
      isCalculating={isBlocking}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const itemAndServiceTable = (
    <BillItemAndServiceTable listeners={itemAndServiceLayoutListeners} />
  );

  const serviceTable = (
    <BillServiceTable listeners={serviceLayoutListeners} />
  );

  const table = {
    [BillLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
    [BillLayout.SERVICE]: serviceTable,
    [BillLayout.PROFESSIONAL]: serviceTable,
    [BillLayout.MISCELLANEOUS]: serviceTable,
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
      {jobModal}
      {contactModal}
      {inTrayModal}
      {upgradeModal}
      {isModalShown && (
        <BillModal
          onModalClose={onModalClose}
          onCancelModalConfirm={onCancelModalConfirm}
          onDeleteModalConfirm={onDeleteModalConfirm}
          onConfirmSaveAmountDueWarningButtonClick={onConfirmSaveAmountDueWarningButtonClick}
          onConfirmSaveAndCreateNewButtonClick={
            onConfirmSaveAndCreateNewButtonClick
          }
          onConfirmSaveAndDuplicateButtonClick={
            onConfirmSaveAndDuplicateButtonClick
          }
          exportPdfModalListeners={exportPdfModalListeners}
          onUnlinkDocumentConfirm={onUnlinkDocumentConfirm}
          onConfirmSaveAndRedirect={onConfirmSaveAndRedirect}
          onDiscardAndRedirect={onDiscardAndRedirect}
        />
      )}
      {shouldShowInTrayDocument && !isSplitViewShown && (
        <BillInTrayDocumentView
          onPrefillButtonClick={onPrefillButtonClick}
          onOpenSplitViewButtonClick={onOpenSplitViewButtonClick}
          onUnlinkDocumentButtonClick={onUnlinkDocumentButtonClick}
        />
      )}
    </div>
  );

  const optionInfo = getOptionInfo({ isReadOnly, readOnlyMessage, showPrefillInfo });
  const onDismissOptionInfo = isReadOnly ? undefined : onClosePrefillInfo;

  const view = (
    <MasterDetailLineItemTemplate
      optionInfo={optionInfo}
      onDismissOptionInfo={onDismissOptionInfo}
      detailHeaderClassName={classNames(styles.secondaryOptions, styles.detail)}
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
      table={(
        <div className={classNames(isReadOnly && styles.disabledTable)}>
          {table}
        </div>
      )}
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

const mapStateToProps = state => ({
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isBlocking: getIsBlocking(state),
  layout: getBillLayout(state),
  loadingState: getLoadingState(state),
  isDocumentLoading: getIsDocumentLoading(state),
  isSplitViewShown: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
  isReadOnly: getIsReadOnly(state),
  readOnlyMessage: getReadOnlyMessage(state),
  shouldShowInTrayDocument: getShouldShowInTrayDocument(state),
});

export default connect(mapStateToProps)(BillView);
