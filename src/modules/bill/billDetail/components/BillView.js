import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getBillLayout,
  getIsAlertShown,
  getIsBlocking,
  getIsModalShown,
  getIsPreConversion,
  getIsReadOnly,
  getLoadingState,
  getReadOnlyMessage,
  getShowPreConversionAlert,
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
import MasterDetailLineItemTemplate from '../../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import UpgradeModal from './UpgradeModal';
import styles from './BillView.module.css';

const getOptionInfo = ({
  isReadOnly,
  readOnlyMessage,
  showPrefillInfo,
  showPreConversionAlert,
}) => {
  if (isReadOnly) {
    return readOnlyMessage;
  }

  if (showPreConversionAlert) {
    return `Bills dated before your opening balance month will not automatically update account balances.
    Remember to include the bill amounts in the respective account's opening balance`;
  }

  if (showPrefillInfo) {
    return "We've used your document to fill in some details. Check the fields highlighted in blue.";
  }

  return undefined;
};

const BillView = ({
  renderContactCombobox,
  renderJobCombobox,
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  renderItemCombobox,
  accountModal,
  jobModal,
  recurringListModal,
  recurringModal,
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
  onInputAlert,
  onDismissAlert,
  onUpdateBillOption,
  onUpdateLayout,
  onIssueDateBlur,
  exportPdfModalListeners,
  onAddSupplierButtonClick,
  onPrefillButtonClick,
  onPrefillFromRecurringButtonClick,
  onSaveAsRecurringButtonClick,
  onOpenSplitViewButtonClick,
  onCloseSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
  onUnlinkDocumentConfirm,
  onClosePrefillInfo,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
  onRecordPaymentClick,
  onConfirmSaveAndRedirect,
  onDiscardAndRedirect,
  preConversionModalListeners,
  showPreConversionAlert,
  onDismissPreConversionAlert,
  isPreConversion,
  recordBillPaymentModalListeners,
}) => {
  const tableLayoutOption = isPreConversion || (
    <BillLayoutPopover
      layout={layout}
      isReadOnly={isReadOnly}
      isCalculating={isBlocking}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const itemAndServiceTable = (
    <BillItemAndServiceTable
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
      listeners={itemAndServiceLayoutListeners}
    />
  );

  const serviceTable = (
    <BillServiceTable
      listeners={serviceLayoutListeners}
      renderJobCombobox={renderJobCombobox}
    />
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
        <BillAlert
          onDismissAlert={() => {
            // Trigger resize event to force MasterDetailTemplate recalculate sticky height
            window.dispatchEvent(new Event('resize'));
            onDismissAlert();
          }}
        />
      )}
      <BillHeader onRecordPaymentClick={onRecordPaymentClick} />
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
      {inTrayModal}
      {recurringListModal}
      {recurringModal}
      {upgradeModal}
      {isModalShown && (
        <BillModal
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
          onUnlinkDocumentConfirm={onUnlinkDocumentConfirm}
          onConfirmSaveAndRedirect={onConfirmSaveAndRedirect}
          onDiscardAndRedirect={onDiscardAndRedirect}
          preConversionModalListeners={preConversionModalListeners}
          recordBillPaymentModalListeners={recordBillPaymentModalListeners}
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

  const optionInfo = getOptionInfo({
    isReadOnly,
    readOnlyMessage,
    showPrefillInfo,
    showPreConversionAlert,
  });

  const onDismissOptionInfo =
    (showPreConversionAlert && onDismissPreConversionAlert) ||
    (showPrefillInfo && onClosePrefillInfo) ||
    undefined;

  const view = (
    <MasterDetailLineItemTemplate
      optionInfo={optionInfo}
      onDismissOptionInfo={onDismissOptionInfo}
      detailHeaderClassName={classNames(styles.secondaryOptions, styles.detail)}
      primaryOptions={
        <BillPrimaryOptions
          renderContactCombobox={renderContactCombobox}
          onInputAlert={onInputAlert}
          onUpdateBillOption={onUpdateBillOption}
          onAddSupplierButtonClick={onAddSupplierButtonClick}
        />
      }
      secondaryOptions={
        <BillSecondaryOptions
          onUpdateBillOption={onUpdateBillOption}
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
        <BillActions
          onSaveButtonClick={onSaveButtonClick}
          onSaveAndButtonClick={onSaveAndButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onExportPdfButtonClick={onExportPdfButtonClick}
          onRecordPaymentClick={onRecordPaymentClick}
          onPrefillFromRecurringButtonClick={onPrefillFromRecurringButtonClick}
          onSaveAsRecurringButtonClick={onSaveAsRecurringButtonClick}
        />
      }
      subHeadChildren={subHeaderChildren}
      detail={detail}
      pageHead={stickyHeader}
      showDetail={isSplitViewShown && !isPreConversion}
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
  layout: getBillLayout(state),
  loadingState: getLoadingState(state),
  isDocumentLoading: getIsDocumentLoading(state),
  isSplitViewShown: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
  isReadOnly: getIsReadOnly(state),
  readOnlyMessage: getReadOnlyMessage(state),
  shouldShowInTrayDocument: getShouldShowInTrayDocument(state),
  showPreConversionAlert: getShowPreConversionAlert(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(BillView);
