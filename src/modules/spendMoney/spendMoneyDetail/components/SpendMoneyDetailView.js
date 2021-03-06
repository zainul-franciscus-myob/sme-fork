import { Alert, Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getAttachmentCount,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLoading,
  getModal,
  getPageTitle,
  getShowPrefillInfo,
  getShowSplitView,
} from '../spendMoneyDetailSelectors';
import MasterDetailLineItemTemplate from '../../../../components/MasterDetailLineItemTemplate/MasterDetailLineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import SpendMoneyAttachments from './SpendMoneyAttachments';
import SpendMoneyDetailActions from './SpendMoneyDetailActions';
import SpendMoneyDetailPrimaryOptions from './SpendMoneyDetailPrimaryOptions';
import SpendMoneyDetailSecondaryOptions from './SpendMoneyDetailSecondaryOptions';
import SpendMoneyDetailTable from './SpendMoneyDetailTable';
import SpendMoneyDocumentViewer from './SpendMoneyDocumentViewer';
import SpendMoneyInTrayDocumentView from './SpendMoneyInTrayDocumentView';
import SpendMoneyModal from './SpendMoneyModal';
import styles from './SpendMoneyDetailView.module.css';

const SpendMoneyDetailView = ({
  renderJobCombobox,
  renderContactCombobox,
  recurringListModal,
  recurringModal,
  accountModal,
  contactModal,
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConfirmCancelButtonClick,
  onCloseModal,
  alert,
  onDismissAlert,
  isCreating,
  isLoading,
  hasInTrayDocument,
  showSplitView,
  showPrefillInfo,
  pageTitle,
  attachmentCount,
  onConfirmDeleteButtonClick,
  onPrefillButtonClick,
  onSaveAsRecurringButtonClick,
  modal,
  onAddAccount,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onAddAttachments,
  onRemoveAttachment,
  onDeleteAttachmentModal,
  onOpenAttachment,
  onFocusAttachments,
  onCloseSplitView,
  onOpenSplitView,
  onClosePrefillInfo,
  onBlurBankStatementText,
  onViewedAccountToolTip,
}) => {
  const primaryOptions = (
    <SpendMoneyDetailPrimaryOptions
      renderContactCombobox={renderContactCombobox}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onBlurBankStatementText={onBlurBankStatementText}
    />
  );
  const secondaryOptions = (
    <SpendMoneyDetailSecondaryOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <SpendMoneyDetailActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onPrefillButtonClick={onPrefillButtonClick}
      onSaveAsRecurringButtonClick={onSaveAsRecurringButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHeadActions = !isCreating
    ? [
        <Button type="link" onClick={onFocusAttachments} icon={<Icons.File />}>
          {`Attachments (${attachmentCount})`}
        </Button>,
      ]
    : [];

  const pageHead = (
    <>
      {alertComponent}
      <TotalsHeader title={pageTitle} actions={pageHeadActions} />
    </>
  );

  const table = (
    <SpendMoneyDetailTable
      onUpdateRow={onUpdateRow}
      renderJobCombobox={renderJobCombobox}
      onAddRow={onAddRow}
      onRemoveRow={onRemoveRow}
      onRowInputBlur={onRowInputBlur}
      onAddAccount={onAddAccount}
      onViewedAccountToolTip={onViewedAccountToolTip}
    />
  );

  const inTrayDocumentView = hasInTrayDocument && !showSplitView && (
    <SpendMoneyInTrayDocumentView onOpenSplitView={onOpenSplitView} />
  );

  const subHeaderChildren = (
    <React.Fragment>
      {inTrayDocumentView}
      {accountModal}
      {contactModal}
      {recurringListModal}
      {recurringModal}
      {modal && (
        <SpendMoneyModal
          modal={modal}
          onDismissModal={onCloseModal}
          onConfirmSave={onSaveButtonClick}
          onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
          onConfirmCancelButtonClick={onConfirmCancelButtonClick}
          onDeleteAttachmentModal={onDeleteAttachmentModal}
        />
      )}
    </React.Fragment>
  );

  const more = (
    <SpendMoneyAttachments
      onAddAttachments={onAddAttachments}
      onRemoveAttachment={onRemoveAttachment}
      onOpenAttachment={onOpenAttachment}
    />
  );

  const detail = (
    <SpendMoneyDocumentViewer onCloseSplitView={onCloseSplitView} />
  );

  const prefillInfo =
    "We've used your document to fill in some details. Check the fields highlighted in blue.";

  const view = (
    <MasterDetailLineItemTemplate
      optionInfo={showPrefillInfo && prefillInfo}
      onDismissOptionInfo={onClosePrefillInfo}
      primaryOptions={primaryOptions}
      secondaryOptions={secondaryOptions}
      table={table}
      actions={actions}
      subHeadChildren={subHeaderChildren}
      detail={detail}
      pageHead={pageHead}
      showDetail={showSplitView}
      more={more}
      templateClassName={styles.wrapper}
      detailHeaderClassName={styles.detail}
    />
  );

  return <PageView loadingState={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  attachmentCount: getAttachmentCount(state),
  hasInTrayDocument: getIsCreatingFromInTray(state),
  showSplitView: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailView);
