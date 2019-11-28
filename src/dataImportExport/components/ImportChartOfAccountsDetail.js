import {
  Alert, Field, FileBrowser, FileChip, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDuplicateRecordsOption, getDuplicateRecordsOptionNames, getImportChartOfAccountsFile } from '../selectors/DataImportExportSelectors';
import styles from './ImportChartOfAccountsDetail.module.css';

const ImportChartOfAccountsDetail = ({
  importFile,
  importChartOfAccountsListeners: {
    onFileSelected,
    onFileRemove,
    onDuplicateRecordsOptionChange,
  },
  duplicateRecordsOption,
  duplicateRecordsOptionNames,
}) => (
  <>
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
    {importFile && (
    <div className={styles.importFile}>
      <FileChip
        state="default"
        name={importFile.name}
        size={importFile.size}
        onRemove={onFileRemove}
      />
    </div>
    )}
    <div className={styles.importInfoAlert}>
      <Alert type="info">
        You can only import TXT files that have a tab-separated format,
        a header row, and all mandatory fields. Files must be under 20MB.
      </Alert>
    </div>
    <RadioButtonGroup
      name="duplicateRecordsOption"
      label="If duplicate records are found"
      requiredLabel="This is required"
      value={duplicateRecordsOption}
      options={duplicateRecordsOptionNames}
      onChange={onDuplicateRecordsOptionChange}
    />
  </>
);

const mapStateToProps = state => ({
  importFile: getImportChartOfAccountsFile(state),
  duplicateRecordsOption: getDuplicateRecordsOption(state),
  duplicateRecordsOptionNames: getDuplicateRecordsOptionNames(state),
});

export default connect(mapStateToProps)(ImportChartOfAccountsDetail);
