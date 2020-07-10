import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsActionDisabled,
  getIsLoading,
  getIsOpen,
} from '../JobModalSelectors';
import DetailView from './DetailView';
import PageView from '../../../../components/PageView/PageView';

const JobModalView = ({
  isOpen,
  isLoading,
  isActionDisabled,
  alertMessage,
  onSaveButtonClick,
  onCloseModal,
  onJobChange,
  onDismissAlert,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const view = (
    <>
      {alertComponent}
      <DetailView onJobChange={onJobChange} />
    </>
  );
  const modal = (
    <Modal
      title="Create job"
      onCancel={onCloseModal}
      canClose={!isActionDisabled}
      size="small"
    >
      <Modal.Body>
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCloseModal}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isActionDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen && modal;
};

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(JobModalView);
