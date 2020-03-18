import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getLoadingState, getModalType,
} from '../jobDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import DisplayId from './DisplayId';
import FormCard from '../../../../components/FormCard/FormCard';
import JobDetailActions from './JobDetailActions';
import JobDetails from './JobDetails';
import JobHeader from './JobHeader';
import PageView from '../../../../components/PageView/PageView';

const JobDetailView = ({
  isCreating,
  loadingState,
  modalType,
  alertMessage,
  onJobDetailsChange,
  onDismissAlert,
  onCancelModal,
  onDeleteModal,
  onCloseModal,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => {
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
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this job?"
      />
    );
  }

  const view = (
    <FormTemplate
      pageHead={<JobHeader />}
      alert={alertComponent}
      sticky="none"
      actions={(
        <JobDetailActions
          isCreating={isCreating}
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      )}
    >
      {modal}
      <FormCard>
        <JobDetails
          isCreating={isCreating}
          onJobDetailsChange={onJobDetailsChange}
        />
        <DisplayId onJobDetailsChange={onJobDetailsChange} />
      </FormCard>

    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(JobDetailView);