import React from 'react';

import IdentifyBy from './IdentifyBy';
import UploadFile from './UploadFile';

const ImportTimesheetsDetail = ({
  onFileSelected,
  onFileRemove,
  onUpdateContactsIdentifyBy,
}) => (
  <>
    <UploadFile onFileSelected={onFileSelected} onFileRemove={onFileRemove} />
    <IdentifyBy
      label="Match employees using"
      onUpdateContactsIdentifyBy={onUpdateContactsIdentifyBy}
    />
  </>
);

export default ImportTimesheetsDetail;
