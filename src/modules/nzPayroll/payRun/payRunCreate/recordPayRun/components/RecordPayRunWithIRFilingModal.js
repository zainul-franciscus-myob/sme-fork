import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import inlandRevenueImg from './InlandRevenue.svg';
import styles from './RecordPayRunWithFilingModal.module.css';

const RecordPayRunWithIRFilingModal = ({
  onGoBack,
  onRecordAndFile,
  title = 'Record pay run and file with IR',
  description = 'You’re about to record this pay run and file your employment information with Inland Revenue.',
}) => (
  <Modal title={title} size="medium" onCancel={onGoBack}>
    <Modal.Body>
      <div className={styles.irLogo}>
        <img src={inlandRevenueImg} width="200" alt="Inland Revenue" />
      </div>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button name="goBack" type="secondary" onClick={onGoBack}>
        Go back
      </Button>
      <Button name="recordAndFile" type="primary" onClick={onRecordAndFile}>
        Record and file
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RecordPayRunWithIRFilingModal;
