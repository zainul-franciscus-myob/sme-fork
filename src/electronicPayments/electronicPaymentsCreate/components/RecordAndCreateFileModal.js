import React from 'react';

import DateMismatchModal from './DateMismatchModal';
import ModalType from '../ModalType';
import RecordAndDownloadWarningModal from './RecordAndDownloadWarningModal';

const RecordAndCreateFileModal = ({
  modal: { type = '' },
  onCancelButtonClick,
  onRecordButtonClick,
  onContinueButtonClick,
}) => {
  if (type === ModalType.DATE_MISMATCH) {
    return (
      <DateMismatchModal
        onGoBackButtonClick={onCancelButtonClick}
        onContinueButtonClick={onContinueButtonClick}
      />
    );
  }
  return (
    <RecordAndDownloadWarningModal
      onCancelButtonClick={onCancelButtonClick}
      onRecordButtonClick={onRecordButtonClick}
    />
  );
};
export default RecordAndCreateFileModal;
