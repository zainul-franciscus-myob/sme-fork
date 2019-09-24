import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDeleteModal,
  getIsLoading,
  getModalType,
} from '../selectors/InTraySelectors';
import { getIsEntryLoading } from '../selectors/InTrayListSelectors';
import InTrayDeleteModal from './InTrayDeleteModal';
import InTrayFileBrowser from './InTrayFileBrowser';
import InTrayListFilterOptions from './inTrayList/InTrayListFilterOptions';
import InTrayListTable from './inTrayList/InTrayListTable';
import PageView from '../../components/PageView/PageView';
import UploadOptionsModal from './uploadOptions/UploadOptionsModal';
import modalTypes from '../modalTypes';
import styles from './InTrayView.module.css';

const InTrayView = ({
  isLoading,
  alert,
  modalType,
  deleteModal,
  isEntryLoading,
  inTrayListeners: {
    onDismissAlert,
    onUploadOptionsButtonClicked,
    onUploadButtonClick,
  },
  inTrayListListeners: {
    onUpdateFilterOptions,
    onApplyFilter,
    onSort,
    onUpload,
    onDownload,
    onDelete,
  },
  uploadOptionsModalListeners,
  deleteModalListeners,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const uploadOptionsModalComponent = modalType === modalTypes.uploadOptions && (
    <UploadOptionsModal listeners={uploadOptionsModalListeners} />
  );

  const deleteModalComponent = deleteModal && (
    <InTrayDeleteModal listeners={deleteModalListeners} entry={deleteModal} />
  );

  const pageHead = (
    <PageHead title="In Tray">
      <Button type="secondary" onClick={onUploadOptionsButtonClicked}>More ways to upload</Button>
      <div className={styles.fileBrowser}>
        <InTrayFileBrowser buttonType="primary" buttonLabel="Upload documents" onFileSelected={onUploadButtonClick} />
      </div>
    </PageHead>
  );

  const filterBar = (
    <InTrayListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const inTrayView = (
    <div className={isEntryLoading ? styles.submitting : ''}>
      {uploadOptionsModalComponent}
      {deleteModalComponent}
      <StandardTemplate
        sticky="none"
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
      >
        <InTrayListTable
          onSort={onSort}
          onUpload={onUpload}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </StandardTemplate>
    </div>
  );

  return <PageView isLoading={isLoading} view={inTrayView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isEntryLoading: getIsEntryLoading(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  deleteModal: getDeleteModal(state),
});

export default connect(mapStateToProps)(InTrayView);
