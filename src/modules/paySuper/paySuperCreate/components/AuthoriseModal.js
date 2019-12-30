import {
  Button,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

const AuthoriseModal = ({
  onGoBackButtonClick,
  onDoNotAuthoriseButtonClick,
  onAuthoriseButtonClick,
}) => (
  <Modal title="Authorise super payment" onCancel={onGoBackButtonClick}>
    <Modal.Body>
      <h4>Authorise and process now?</h4>
      <p>
        Your superannuation payment was recorded successfully.
        Do you want to authorise and process it now?
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-do-not-authorise-btn"
        id="modal-do-not-authorise-btn"
        type="secondary"
        onClick={onDoNotAuthoriseButtonClick}
      >
        No, don&apos;t authorise
      </Button>
      <Button
        key="modal-authorise-btn"
        id="modal-authorise-btn"
        type="primary"
        onClick={onAuthoriseButtonClick}
      >
        Yes, authorise
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AuthoriseModal;
