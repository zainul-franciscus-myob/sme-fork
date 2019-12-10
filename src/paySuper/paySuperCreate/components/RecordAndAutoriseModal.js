import React from 'react';


import AuthoriseCodeModal from './AuthoriseCodeModal';
import AuthoriseModal from './AuthoriseModal';
import ModalType from '../ModalType';

const RecordAndAuthoriseModal = ({
  modal: { type = '' },
  onModalCancelButtonClick,
  onCloseModal,
  onDoNotAuthoriseButtonClick,
  onAuthoriseButtonClick,
  onYesAuthoriseButtonClick,
  updateAuthorisationCode,
}) => {
  if (type === ModalType.AUTHORISE_CODE) {
    return (
      <AuthoriseCodeModal
        onCancelButtonClick={onModalCancelButtonClick}
        onAuthoriseButtonClick={onAuthoriseButtonClick}
        updateAuthorisationCode={updateAuthorisationCode}
      />
    );
  }
  return (
    <AuthoriseModal
      onGoBackButtonClick={onCloseModal}
      onDoNotAuthoriseButtonClick={onDoNotAuthoriseButtonClick}
      onAuthoriseButtonClick={onYesAuthoriseButtonClick}
    />
  );
};
export default RecordAndAuthoriseModal;
