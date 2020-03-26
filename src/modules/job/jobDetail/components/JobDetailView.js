import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getLoadingState, getModal, getPageTitle,
} from '../jobDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import FormCard from '../../../../components/FormCard/FormCard';
import JobDetailActions from './JobDetailActions';
import JobDetails from './JobDetails';
import ModalType from '../../ModalType';
import PageView from '../../../../components/PageView/PageView';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const JobDetailView = ({
  isCreating,
  loadingState,
  modal,
  alertMessage,
  onJobDetailsChange,
  pageHeadTitle,
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

  let modalElement;
  if (modal.type === ModalType.CANCEL) {
    modalElement = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
      />
    );
  } else if (modal.type === ModalType.DELETE) {
    modalElement = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this job?"
      />
    );
  } else if (modal.type === ModalType.UNSAVED) {
    modalElement = (
      <UnsavedModal
        onConfirmSave={onSaveButtonClick}
        onConfirmUnsave={onCancelModal}
        onCancel={onCloseModal}
      />
    );
  }

  const view = (
    <FormTemplate
      pageHead={pageHeadTitle}
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
      {modalElement}
      <FormCard>
        <JobDetails
          isCreating={isCreating}
          onJobDetailsChange={onJobDetailsChange}
        />
      </FormCard>

    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  pageHeadTitle: getPageTitle(state),
  isCreating: getIsCreating(state),
  loadingState: getLoadingState(state),
  modal: getModal(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(JobDetailView);
