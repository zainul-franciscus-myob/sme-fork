import { Button, ButtonRow, Modal } from '@myob/myob-widgets';
import React from 'react';

import styles from './Timesheet.module.css';

const DeleteTimesheetModal = ({ onCancel, onDelete }) => (
  <Modal title="Delete this timesheet?" onCancel={onCancel} size="small">
    <Modal.Body>
      <p>This can&apos;t be undone, or recovered later.</p>
    </Modal.Body>
    <div className={styles.modalButtons}>
      <ButtonRow
        secondary={[
          <Button type="secondary" onClick={onCancel}>
            Go back
          </Button>,
        ]}
        primary={[
          <Button type="delete" onClick={onDelete}>
            Delete
          </Button>,
        ]}
      />
    </div>
  </Modal>
);

export default DeleteTimesheetModal;
