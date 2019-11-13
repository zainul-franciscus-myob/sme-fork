import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModal, getPageTitle,
} from '../generalJournalDetailSelectors';
import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailModal from './GeneralJournalDetailModal';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';
import PageView from '../../../components/PageView/PageView';

const GeneralJournalDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  alertMessage,
  onDismissAlert,
  isCreating,
  isLoading,
  pageTitle,
  modal,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const templateOptions = (
    <GeneralJournalDetailOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />
  );

  const actions = (
    <GeneralJournalDetailActions
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

  const view = (
    <LineItemTemplate
      pageHead={pageTitle}
      options={templateOptions}
      actions={actions}
      alert={alertComponent}
    >
      {
        modal && (
          <GeneralJournalDetailModal
            modal={modal}
            onDismissModal={onDismissModal}
            onConfirmSave={onSaveButtonClick}
            onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
            onConfirmCancelButtonClick={onConfirmCancelButtonClick}
          />
        )
      }
      <GeneralJournalDetailTable
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onRowInputBlur={onRowInputBlur}
      />
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailView);
