import {
  Alert, Icons, LineItemTemplate, TotalsHeader,
} from '@myob/myob-widgets';
import { Button } from '@myob/myob-widgets/lib/components/Button/Button';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getAttachmentCount,
  getIsLoading,
  getIsSubmitting,
  getModal,
  getPageTitle,
} from '../spendMoneyDetailSelectors';
import PageView from '../../../components/PageView/PageView';
import SpendMoneyAttachments from './SpendMoneyAttachments';
import SpendMoneyDetailActions from './SpendMoneyDetailActions';
import SpendMoneyDetailOptions from './SpendMoneyDetailOptions';
import SpendMoneyDetailTable from './SpendMoneyDetailTable';
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
}) => {
  const templateOptions = (
    <SpendMoneyDetailOptions
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

  const pageHeadActions = [
    <Button type="link" onClick={onFocusAttachments} icon={<Icons.File />}>
      {`Attachments (${attachmentCount})`}
    </Button>,
  ];

  const pageHead = (
    <TotalsHeader
      title={pageTitle}
      actions={pageHeadActions}
    />
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageHead}
        options={templateOptions}
        actions={actions}
        alert={alertComponent}
      >
        {
          modal && (
          <SpendMoneyModal
            modal={modal}
            onDismissModal={onCloseModal}
            onConfirmSave={onSaveButtonClick}
            onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
            onConfirmCancelButtonClick={onConfirmCancelButtonClick}
            onDeleteAttachmentModal={onDeleteAttachmentModal}
          />
          )
        }
        <SpendMoneyDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />

      </LineItemTemplate>
      <SpendMoneyAttachments
        onAddAttachments={onAddAttachments}
        onRemoveAttachment={onRemoveAttachment}
        onOpenAttachment={onOpenAttachment}
      />
    </React.Fragment>
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
  pageTitle: getPageTitle(state),
  attachmentCount: getAttachmentCount(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailView);
