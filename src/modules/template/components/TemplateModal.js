import React from 'react';

import ImageModal from './ImageModal';
import ModalTypes from '../ModalTypes';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const TemplateModal = ({
  type,
  onCloseModal,
  onConfirmUnsave,
  onConfirmSave,
}) => ([
  ModalTypes.deleteLogo,
  ModalTypes.changeImage,
  ModalTypes.deleteImage,
  ModalTypes.changeLogo,
].includes(type) ? (
  <ImageModal
    type={type}
    onConfirmUnsave={onConfirmUnsave}
    onConfirmSave={onConfirmSave}
    onCloseModal={onCloseModal}
  />
  ) : (
    <UnsavedModal
      onConfirmSave={() => onConfirmSave(type)}
      onConfirmUnsave={() => onConfirmUnsave(type)}
      onCancel={onCloseModal}
    />
  ));

export default TemplateModal;
