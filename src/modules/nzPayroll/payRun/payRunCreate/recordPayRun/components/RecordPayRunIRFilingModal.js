import { Alert, Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import inlandRevenueImg from './images/InlandRevenue.svg';
import recordImg from './images/Record.svg';
import styles from './RecordPayRunIRFilingModal.module.css';

const RecordPayRunIRFilingModal = ({
  onGoBack,
  onRecord,
  userOnboarded,
  title = userOnboarded
    ? 'Record pay run and file with IR'
    : 'Record pay run without filing to IR',
  description = userOnboarded
    ? 'You’re about to record this pay run and file your employment information with Inland Revenue.'
    : 'You’re about to record this pay run without filing with Inland Revenue.',
}) => (
  <Modal title={title} size="medium" onCancel={onGoBack}>
    <Modal.Body>
      <div className={styles.modalLogo}>
        {userOnboarded ? (
          <img
            src={inlandRevenueImg}
            width="200"
            alt="Inland Revenue"
            name="irImage"
          />
        ) : (
          <img
            src={recordImg}
            width="200"
            alt="Record Pay Run"
            name="recordImage"
          />
        )}
      </div>
      {description}
      {!userOnboarded && (
        <div className={styles.modalAlert}>
          <Alert type="info" testid="userNotOnboardedModalAlert" inline>
            Remember to get someone who&apos;s authorised MYOB for payday filing
            to submit this pay run to Inland Revenue.
          </Alert>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button name="goBack" type="secondary" onClick={onGoBack}>
        Go back
      </Button>

      {userOnboarded ? (
        <Button name="recordAndFile" type="primary" onClick={onRecord}>
          Record and file
        </Button>
      ) : (
        <Button name="recordWithoutFiling" type="primary" onClick={onRecord}>
          Record without filing to IR
        </Button>
      )}
    </Modal.Footer>
  </Modal>
);

export default RecordPayRunIRFilingModal;
