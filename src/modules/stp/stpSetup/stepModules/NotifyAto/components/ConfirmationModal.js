import { Button, ButtonRow, Modal } from '@myob/myob-widgets';
import React from 'react';

import notifiedAtoImage from './images/notified-ato.svg';
import styles from './StpNotifyAto.module.css';

const ConfirmationModal = ({ onCloseConfirmationModal, onSendButtonClick }) => (
  <Modal
    title="Confirm you've notified the ATO"
    onCancel={onCloseConfirmationModal}
  >
    <Modal.Body>
      <div className={styles.modalImage}>
        <img src={notifiedAtoImage} alt="Notified ATO" />
      </div>
      <h3>
        Remember, the ATO will reject any payroll reports if you
        haven&apos;t&nbsp; completed this step
      </h3>
      <p>
        Make sure you&apos;ve notified the ATO that you&apos; using MYOB&nbsp;
        as your hosted SBR software service.
      </p>
    </Modal.Body>
    <div className={styles.modalButtons}>
      <ButtonRow
        secondary={[
          <Button type="secondary" onClick={onCloseConfirmationModal}>
            Go back
          </Button>,
        ]}
        primary={[
          <Button
            type="primary"
            onClick={onSendButtonClick}
            testid="sendButton"
          >
            Send
          </Button>,
        ]}
      />
    </div>
  </Modal>
);

export default ConfirmationModal;
