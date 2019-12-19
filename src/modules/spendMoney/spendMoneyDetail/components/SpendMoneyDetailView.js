import {
  Alert, Icons, TotalsHeader,
} from '@myob/myob-widgets';
import { Button } from '@myob/myob-widgets/lib/components/Button/Button';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getAttachmentCount,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLoading,
  getIsSubmitting,
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

const SpendMoneyDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConfirmCancelButtonClick,
  onCloseModal,
  alertMessage,
  onDismissAlert,
  isCreating,
  isLoading,
  isSubmitting,
  hasInTrayDocument,
  showSplitView,
  showPrefillInfo,
  pageTitle,
  attachmentCount,
  onConfirmDeleteButtonClick,
  modal,
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
}) => {
  const primaryOptions = (
    <SpendMoneyDetailPrimaryOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
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
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const pageHeadActions = !isCreating ? [
    <Button type="link" onClick={onFocusAttachments} icon={<Icons.File />}>
      {`Attachments (${attachmentCount})`}
    </Button>,
  ] : [];

  const pageHead = (
    <>
      {alertComponent}
      <TotalsHeader title={pageTitle} actions={pageHeadActions} />
    </>
  );

  const table = (
    <SpendMoneyDetailTable
      onUpdateRow={onUpdateRow}
      onAddRow={onAddRow}
      onRemoveRow={onRemoveRow}
      onRowInputBlur={onRowInputBlur}
    />
  );

  const inTrayDocumentView = hasInTrayDocument && !showSplitView && (
    <SpendMoneyInTrayDocumentView onOpenSplitView={onOpenSplitView} />
  );

  const subHeaderChildren = (
    <React.Fragment>
      {inTrayDocumentView}
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

  const detail = <SpendMoneyDocumentViewer onCloseSplitView={onCloseSplitView} />;

  const prefillInfo = 'We\'ve used your document to fill in some details. Check the fields highlighted in blue.';

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
    />
  );

  return (
    <PageView isSubmitting={isSubmitting} isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
  isSubmitting: getIsSubmitting(state),
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  attachmentCount: getAttachmentCount(state),
  hasInTrayDocument: getIsCreatingFromInTray(state),
  showSplitView: getShowSplitView(state),
  showPrefillInfo: getShowPrefillInfo(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailView);
