import { Alert, Button, Input, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsSubmitting,
  getModalAlert,
} from '../../selectors/invoiceDetailSelectors';
import { getRecurringTransactionName } from '../../selectors/recurringInvoiceSelectors';
import PageView from '../../../../../components/PageView/PageView';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const RecurringScheduleModal = ({
  listeners: {
    onConfirm,
    onCancel,
    onRecurringScheduleDetailChange,
    onDismissAlert,
  },
  isActionDisabled,
  recurringTransactionName,
  alert,
}) => {
  const modalBody = (
    <Input
      name="recurringTransactionName"
      label="Recurring transaction name"
      requiredLabel="This is required"
      value={recurringTransactionName}
      onChange={handleInputChange(onRecurringScheduleDetailChange)}
      maxLength={30}
    />
  );

  return (
    <Modal
      title="Create recurring transaction"
      onCancel={onCancel}
      canClose={!isActionDisabled}
    >
      <Modal.Body>
        {alert && (
          <Alert type={alert.type} onDismiss={onDismissAlert}>
            {alert.message}
          </Alert>
        )}
        <PageView isLoading={isActionDisabled} view={modalBody} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>
          Go back
        </Button>
        <Button type="primary" onClick={onConfirm} disabled={isActionDisabled}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  alert: getModalAlert(state),
  recurringTransactionName: getRecurringTransactionName(state),
  isActionDisabled: getIsSubmitting(state),
});

export default connect(mapStateToProps)(RecurringScheduleModal);
