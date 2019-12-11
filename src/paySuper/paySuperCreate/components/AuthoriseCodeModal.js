import {
  Button,
  Input,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../components/handlers/handleInputChange';

const AuthoriseCodeModal = ({
  authorisationCode,
  updateAuthorisationCode,
  onCancelButtonClick,
  onAuthoriseButtonClick,
  onResendAuthorisationCodeClick,
}) => (
  <Modal title="Authorise payment" onCancel={onCancelButtonClick}>
    <Modal.Body>
      <h4>Authorise payment</h4>
      <p>
        We&apos;ve sent you an authorisation code by SMS that you&apos;ll need to enter
        to begin processing your payment. It may take up to 20 minutes to receive the SMS.
      </p>
      <Input
        name="authorisationCode"
        label="Enter code"
        value={authorisationCode}
        onChange={handleInputChange(updateAuthorisationCode)}
      />
      <p>
        Still haven&apos;t received the SMS after 20 minutes? Make sure you&apos;re using the
        same mobile number you registered with us when signing up for this service.
        <Button type="link" onClick={onResendAuthorisationCodeClick}>Resend authorisation code</Button>
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-cancel-btn"
        id="modal-cancel-btn"
        type="secondary"
        onClick={onCancelButtonClick}
      >
        Cancel
      </Button>
      <Button
        key="modal-authorise-btn"
        id="modal-authorise-btn"
        type="primary"
        onClick={onAuthoriseButtonClick}
      >
        Authorise
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AuthoriseCodeModal;
