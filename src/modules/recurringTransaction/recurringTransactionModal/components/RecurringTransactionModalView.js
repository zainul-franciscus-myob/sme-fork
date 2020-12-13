import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsLoading,
  getIsOpen,
} from '../RecurringTransactionModalSelectors';
import PageView from '../../../../components/PageView/PageView';
import RecurringTransactionModalSchedule from './RecurringTransactionModalSchedule';

const RecurringTransactionModalView = ({
  isOpen,
  alert,
  isLoading,
  isActionDisabled,
  onClose,
  onDismissAlert,
  onOkButtonClick,
  onCancelButtonClick,
  onUpdateScheduleOptions,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <RecurringTransactionModalSchedule
      onUpdateScheduleOptions={onUpdateScheduleOptions}
    />
  );

  const modal = (
    <Modal
      title="Create recurring transaction"
      onCancel={onClose}
      canClose={!isActionDisabled}
      size="small"
    >
      <Modal.Body>
        {alertComponent}
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCancelButtonClick}
          disabled={isActionDisabled}
        >
          Go back
        </Button>
        <Button
          type="primary"
          onClick={onOkButtonClick}
          disabled={isActionDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(RecurringTransactionModalView);
