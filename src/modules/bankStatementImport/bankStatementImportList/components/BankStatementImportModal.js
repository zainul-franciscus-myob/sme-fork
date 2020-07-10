import {
  Button,
  Field,
  FileBrowser,
  FileChip,
  Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getImportModal,
  getIsSubmitting,
} from '../BankStatementImportListSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './BankStatementImportModal.module.css';

const handleFileSelect = (handler) => (file) =>
  handler({ key: 'file', value: file });
const handleFileRemove = (handler) => () => handler({ key: 'file' });

const BankStatementImportModal = ({
  accountOptions,
  importModal: { accountId, file },
  isSubmitting,
  onCancel,
  onConfirm,
  onUpdateImportModal,
}) => (
  <Modal
    title="Import statement file"
    size="small"
    onCancel={onCancel}
    canClose={!isSubmitting}
  >
    <Modal.Body>
      <AccountCombobox
        label="Bank account"
        name="accountId"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={handleComboboxChange('accountId', onUpdateImportModal)}
        width="xl"
      />
      <div className={styles.fileBrowser}>
        <Field
          label="Statement file"
          renderField={() => (
            <>
              <FileBrowser
                buttonType="secondary"
                onFileSelected={handleFileSelect(onUpdateImportModal)}
              />
              <p>
                Your file needs to be&nbsp;
                <strong>QIF</strong>
                &nbsp;or&nbsp;
                <strong>OFX</strong>
                &nbsp;and&nbsp;
                <strong>below 10MB</strong>
              </p>
            </>
          )}
        />
      </div>
      {file && (
        <FileChip
          name={file.name}
          size={file.size}
          onRemove={handleFileRemove(onUpdateImportModal)}
        />
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="primary" onClick={onConfirm} disabled={isSubmitting}>
        Import
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  accountOptions: getAccountOptions(state),
  importModal: getImportModal(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(BankStatementImportModal);
