import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsActionDisabled, getIsOpen, getRegion, getTitle,
} from '../JobModalSelectors';
import AuJobModalDetails from './au/JobModalDetails';
import NzJobModalDetails from './nz/JobModalDetails';
import PageView from '../../../../components/PageView/PageView';

const JobModalView = ({
  region,
  alert,
  isOpen,
  title,
  isActionDisabled,
  onClose,
  onDismissAlert,
  onDetailChange,
  onCancelButtonClick,
  onSaveButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const JobModalDetails = {
    au: AuJobModalDetails,
    nz: NzJobModalDetails,
  }[region];

  const view = (
    <>
      <JobModalDetails onChange={onDetailChange} />
    </>
  );

  const modal = (
    <Modal
      title={title}
      onCancel={onClose}
      canClose={!isActionDisabled}
      size="small"
    >
      <Modal.Body>
        {alertComponent}
        <PageView isLoading={isActionDisabled} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancelButtonClick} disabled={isActionDisabled}>Cancel</Button>
        <Button type="primary" onClick={onSaveButtonClick} disabled={isActionDisabled}>Save</Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = state => ({
  region: getRegion(state),
  alert: getAlert(state),
  isOpen: getIsOpen(state),
  title: getTitle(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(JobModalView);
