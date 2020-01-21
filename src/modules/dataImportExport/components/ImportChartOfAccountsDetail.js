import React from 'react';

import DuplicateRecords from './DuplicateRecords';
import UploadFile from './UploadFile';

const ImportChartOfAccountsDetail = ({
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

export default ImportChartOfAccountsDetail;
