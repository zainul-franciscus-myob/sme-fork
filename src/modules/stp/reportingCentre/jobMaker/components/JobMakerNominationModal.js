import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const JobMakerNominationModal = ({ onCloseModal, onNominate }) => {
  return (
    <Modal title="Nominate Employee" onCancel={onCloseModal}>
      <Modal.Body>
        I nominate this employee for the JobMaker Hiring Credit.
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          testid="jobmaker-nomination-modal-cancel-btn"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          testid="jobmaker-nomination-modal-nominate-btn"
          onClick={onNominate}
        >
          Nominate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobMakerNominationModal;
