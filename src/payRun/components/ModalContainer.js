import React from 'react';

import PreviousStepModal from './PreviousStepModal';


const ModalContainer = ({
  onGoBack,
  onDismissModal,
}) => (
  <PreviousStepModal
    onGoBack={onGoBack}
    onCancel={onDismissModal}
  />
);

export default ModalContainer;
