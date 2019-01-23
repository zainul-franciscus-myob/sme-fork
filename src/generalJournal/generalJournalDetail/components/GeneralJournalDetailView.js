import {
  ButtonRow, Columns, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../generalJournalDetailSelectors';
import Alert from '../../../components/Alert/Alert';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import GeneralJournalDetailActions from './GeneralJournalDetailActions';
import GeneralJournalDetailOptions from './GeneralJournalDetailOptions';
import GeneralJournalDetailTable from './GeneralJournalDetailTable';

const GeneralJournalDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onCancelModal,
  onCloseModal,
  onDeleteModal,
  alertMessage,
  onDismissAlert,
  isCreating,
  isLoading,
  modalType,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const templateOptions = (
    <Columns type="three">
      <GeneralJournalDetailOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />
    </Columns>
  );

  const actions = (
    <ButtonRow>
      <GeneralJournalDetailActions
        isCreating={isCreating}
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </ButtonRow>
  );

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel general journal alterations"
        description="Are you sure you want to cancel the alterations in this general journal?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete transaction"
        description="Are you sure you want to delete this general journal transaction?"
      />
    );
  }

  const view = (
    <React.Fragment>
      {alertComponent}
      <LineItemTemplate
        pageHead="General journal entry"
        options={templateOptions}
        actions={actions}
      >
        { modal }
        <GeneralJournalDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return (
    isLoading ? <Spinner /> : view
  );
};

GeneralJournalDetailView.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailView);
