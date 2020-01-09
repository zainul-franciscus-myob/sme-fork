import { Button, Modal } from '@myob/myob-widgets';
import ButtonRow from '@myob/myob-widgets/lib/components/ButtonRow/ButtonRow';
import React from 'react';

import notifiedAtoImage from './images/notified-ato.svg';

const ConfirmationModal = ({
  onCloseConfirmationModal,
  onSendButtonClick,
}) => (
  <Modal
    title="Confirm you&apos;ve notified the ATO"
    size="small"
    onCancel={onCloseConfirmationModal}
  >
    <Modal.Body>
      <img src={notifiedAtoImage} alt="Notified ATO" />
      <h3>
          Remember, the ATO will reject any payroll reports if you haven&apos;t&nbsp;
          completed this step
      </h3>
      <p>
          Make sure you&apos;ve notified the ATO that you&apos; using MYOB&nbsp;
          as your hosted SBR software service.
      </p>
      <ButtonRow
        secondary={[
          <Button type="secondary" onClick={onCloseConfirmationModal}>
              Go back
          </Button>]}
        primary={[
          <Button type="primary" onClick={onSendButtonClick}>
              Send
          </Button>]}
      />
    </Modal.Body>
  </Modal>
);

export default ConfirmationModal;
