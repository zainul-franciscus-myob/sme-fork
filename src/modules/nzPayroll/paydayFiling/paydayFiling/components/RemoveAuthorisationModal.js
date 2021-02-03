import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import RemoveLastOnboardedUserMessage from './RemoveLastOnboardedUserMessage';
import RemoveOnboardedUserMessage from './RemoveOnboardedUserMessage';

const RemoveAuthorisationModal = ({
  onCancel,
  onRemoveAuthorisation,
  multipleUsersOnboarded,
  title = 'Remove authorisation',
  description = multipleUsersOnboarded ? (
    <RemoveOnboardedUserMessage />
  ) : (
    <RemoveLastOnboardedUserMessage />
  ),
}) => (
  <Modal title={title} size="small" onCancel={onCancel}>
    <Modal.Body>{description}</Modal.Body>
    <Modal.Footer>
      <Button name="cancel" type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button name="removeAuth" type="delete" onClick={onRemoveAuthorisation}>
        Remove authorisation
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RemoveAuthorisationModal;
