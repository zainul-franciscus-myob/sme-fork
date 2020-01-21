import {
  Alert, Field, FileBrowser, FileChip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getImportFile } from '../selectors/DataImportExportSelectors';
import styles from './UploadFile.module.css';

const UploadFile = ({
  importFile,
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
          accept=".txt"
        />)}
    />
    { importFile && (
    <div className={styles.importFile}>
      <FileChip
        state="default"
        name={importFile.name}
        size={importFile.size}
        onRemove={onFileRemove}
      />
    </div>
    ) }
    <div className={styles.importInfoAlert}>
      <Alert type="info">
        You can only import TXT files that have a tab-separated format,
        a header row, and all mandatory fields. Files must be under 20MB.
      </Alert>
    </div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  importFile: getImportFile(state),
});

export default connect(mapStateToProps)(UploadFile);
