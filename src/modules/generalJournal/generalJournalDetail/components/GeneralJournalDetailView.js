import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModal,
  getPageTitle,
} from '../generalJournalDetailSelectors';
import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailModal from './GeneralJournalDetailModal';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';

const GeneralJournalDetailView = ({
  alert,
  loadingState,
  pageTitle,
  modal,
  accountModal,
  onDismissAlert,
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onGoBack,
  onDeleteButtonClick,
  confirmModalListeners,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onCreateAccountButtonClick,
  renderJobCombobox,
}) => {
  const templateOptions = (
    <GeneralJournalDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <GeneralJournalDetailActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onGoBack={onGoBack}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <LineItemTemplate
      pageHead={pageTitle}
      options={templateOptions}
      actions={actions}
      alert={alertComponent}
    >
      {accountModal}
      {modal && (
        <GeneralJournalDetailModal
          modal={modal}
          listeners={confirmModalListeners}
        />
      )}
      <GeneralJournalDetailTable
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onRowInputBlur={onRowInputBlur}
        onCreateAccountButtonClick={onCreateAccountButtonClick}
        renderJobCombobox={renderJobCombobox}
      />
    </LineItemTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailView);
