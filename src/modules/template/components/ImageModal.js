import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import ModalTypes from '../ModalTypes';

const title = {
  [ModalTypes.changeLogo]: 'Change logo?',
  [ModalTypes.deleteLogo]: 'Delete logo?',
  [ModalTypes.deleteImage]: 'Delete image?',
  [ModalTypes.changeImage]: 'Change image?',
};

const description = {
  [ModalTypes.changeLogo]:
    'The logo will be changed for all templates using the "Logo and business details" PDF style.',
  [ModalTypes.deleteLogo]:
    'The logo will be deleted from all templates using the "Logo and business details" PDF style.',
  [ModalTypes.deleteImage]:
    'The image will be deleted from all templates using the "Full width header image" PDF style.',
  [ModalTypes.changeImage]:
    'The image will be changed for all templates using the "Full width header image" PDF style.',
};

const ImageModal = ({
  type, onConfirmSave, onConfirmUnsave, onCloseModal,
}) => (
  <Modal title={title[type]} size="small" onCancel={onCloseModal} canClose>
    <Modal.Body>{description[type]}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCloseModal}>
        Go back
      </Button>
      {[ModalTypes.deleteLogo, ModalTypes.deleteImage].includes(type) && (
        <Button type="delete" onClick={() => onConfirmUnsave(type)}>
          Discard
        </Button>
      )}
      {[ModalTypes.changeLogo, ModalTypes.changeImage].includes(type) && (
        <Button type="primary" onClick={() => onConfirmSave(type)}>
          Change
        </Button>
      )}
    </Modal.Footer>
  </Modal>
);

export default ImageModal;
