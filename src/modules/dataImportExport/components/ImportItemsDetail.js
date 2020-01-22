import React from 'react';

import DuplicateRecords from './DuplicateRecords';
import UploadFile from './UploadFile';

const ImportItemsDetail = ({
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
}) => (
  <>
    <UploadFile
      onFileSelected={onFileSelected}
      onFileRemove={onFileRemove}
    />
    <DuplicateRecords
      onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
    />
  </>
);

export default ImportItemsDetail;
