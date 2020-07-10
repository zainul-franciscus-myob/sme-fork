import React from 'react';

import DuplicateRecords from './DuplicateRecords';
import IdentifyBy from './IdentifyBy';
import UploadFile from './UploadFile';

const ImportEmployeesDetail = ({
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  onUpdateContactsIdentifyBy,
}) => (
  <>
    <UploadFile onFileSelected={onFileSelected} onFileRemove={onFileRemove} />
    <IdentifyBy
      label="Match employees using"
      onUpdateContactsIdentifyBy={onUpdateContactsIdentifyBy}
    />
    <DuplicateRecords
      onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
    />
  </>
);

export default ImportEmployeesDetail;
