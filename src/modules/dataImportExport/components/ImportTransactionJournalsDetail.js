import React from 'react';

import UploadFile from './UploadFile';

const ImportTransactionJournalsDetail = ({
  onFileSelected,
  onFileRemove,
}) => (
  <>
    <UploadFile
      onFileSelected={onFileSelected}
      onFileRemove={onFileRemove}
    />
  </>
);

export default ImportTransactionJournalsDetail;
