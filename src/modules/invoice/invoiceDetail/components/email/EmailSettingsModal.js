import { Alert, Button, Input, Modal, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFromEmail, getFromName } from '../../selectors/emailSelectors';
import { getIsModalActionDisabled } from '../../selectors/invoiceDetailSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import styles from './EmailSettingsModal.module.css';

const EmailSettingsModal = ({
  isSubmitting,
  fromName,
  fromEmail,
  alert,
  onChange,
  onCancel,
  onConfirm,
  onDismissAlert,
}) => (
  <Modal
    title="Email settings"
    size="small"
    onCancel={onCancel}
    canClose={!isSubmitting}
  >
    <Modal.Body>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      <div className={styles.description}>
        Before you can send invoices, you&apos;ll need to complete the settings
        below. You can update the email settings at any time in invoice and
        quote settings.
      </div>
      <Input
        name="fromName"
        label="From name"
        requiredLabel="Required"
        labelAccessory={
          <Tooltip>
            The name that will display when your clients receive an invoice.
            This could be your business name or contact person.
          </Tooltip>
        }
        value={fromName}
        onChange={handleInputChange(onChange)}
      />
      <Input
        name="fromEmail"
        label="Reply-to email address"
        requiredLabel="Required"
        labelAccessory={
          <Tooltip>
            The email address used when your clients reply to an emailed
            invoice.
          </Tooltip>
        }
        value={fromEmail}
        onChange={handleInputChange(onChange)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="primary" onClick={onConfirm} disabled={isSubmitting}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  isSubmitting: getIsModalActionDisabled(state),
  fromName: getFromName(state),
  fromEmail: getFromEmail(state),
});

export default connect(mapStateToProps)(EmailSettingsModal);
