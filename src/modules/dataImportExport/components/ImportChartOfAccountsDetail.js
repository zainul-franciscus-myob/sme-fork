import React from 'react';

import DeleteUnusedAccounts from './DeleteUnusedAccounts';
import DuplicateRecords from './DuplicateRecords';
import UploadFile from './UploadFile';

const ImportChartOfAccountsDetail = ({
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  onDeleteUnusedAccountsChange,
}) => (
  <>
    <UploadFile onFileSelected={onFileSelected} onFileRemove={onFileRemove} />
    <DuplicateRecords
      onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
    />
    <DeleteUnusedAccounts
      onDeleteUnusedAccountsChange={onDeleteUnusedAccountsChange}
    />
  </>
);

export default ImportChartOfAccountsDetail;
