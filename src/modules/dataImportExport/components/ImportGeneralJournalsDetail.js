import React from 'react';

import UploadFile from './UploadFile';

const ImportGeneralJournalsDetail = ({ onFileSelected, onFileRemove }) => (
  <>
    <UploadFile onFileSelected={onFileSelected} onFileRemove={onFileRemove} />
  </>
);

export default ImportGeneralJournalsDetail;
