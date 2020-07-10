import React from 'react';

import AuthoriseModal from './AuthoriseModal';

const RecordAndAuthoriseModal = ({
  onCloseModal,
  onDoNotAuthoriseButtonClick,
  onYesAuthoriseButtonClick,
}) => (
  <AuthoriseModal
    onGoBackButtonClick={onCloseModal}
    onDoNotAuthoriseButtonClick={onDoNotAuthoriseButtonClick}
    onAuthoriseButtonClick={onYesAuthoriseButtonClick}
  />
);

export default RecordAndAuthoriseModal;
