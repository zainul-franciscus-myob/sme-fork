import { Alert, Field, FileBrowser, FileChip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFileValidationError,
  getImportFile,
  getIsFileValid,
} from '../selectors/DataImportExportSelectors';
import styles from './UploadFile.module.css';

const UploadFile = ({
  importFile,
  isFileValid,
  fileValidationError,
  onFileSelected,
  onFileRemove,
}) => (
  <React.Fragment>
    <Field
      label="Upload file"
      requiredLabel="This is required"
      renderField={() => (
        <FileBrowser
          onFileSelected={onFileSelected}
          buttonType="secondary"
          buttonLabel="Browse"
          requiredLabel="This is required"
          accept=".txt,.csv"
        />
      )}
    />
    {importFile && (
      <div className={styles.importFile}>
        <FileChip
          state={isFileValid ? 'default' : 'failed'}
          name={importFile.name}
          size={importFile.size}
          onRemove={onFileRemove}
          error={fileValidationError}
        />
      </div>
    )}
    <div className={styles.importInfoAlert}>
      <Alert type="info">
        You can import files in CSV or TXT tab-separated format. They must have
        a header row, all mandatory fields, and be under 25MB.
      </Alert>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  importFile: getImportFile(state),
  isFileValid: getIsFileValid(state),
  fileValidationError: getFileValidationError(state),
});

export default connect(mapStateToProps)(UploadFile);
