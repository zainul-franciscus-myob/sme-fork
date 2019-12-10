import {
  Alert,
  Button,
  MasterDetailTemplate,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import shortid from 'shortid';

import {
  getAlert,
  getDeleteModal,
  getIsLoading,
  getModalType,
} from '../selectors/InTraySelectors';
import {
  getIsDetailShown,
  getIsEntryLoading,
} from '../selectors/InTrayListSelectors';
import InTrayDeleteModal from './InTrayDeleteModal';
import InTrayFileBrowser from './InTrayFileBrowser';
import InTrayListDetail from './InTrayListDetail';
import InTrayListFilterOptions from './InTrayListFilterOptions';
import InTrayListTable from './InTrayListTable';
import PageView from '../../../components/PageView/PageView';
import UploadOptionsModal from './uploadOptions/UploadOptionsModal';
import modalTypes from '../modalTypes';
import styles from './InTrayView.module.css';

const InTrayView = ({
  isLoading,
  alert,
  modalType,
  deleteModal,
  isDetailShown,
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
    onLinkToExistingBill,
    onCreateBill,
    onEntryActive,
    onCloseDetail,
    onAddAttachments,
    handleActionSelect,
  },
  uploadOptionsModalListeners,
  deleteModalListeners,
}) => {
  // Temp fix for feelix issue when content on the page is dynamicly changed
  // Re renders master detail, which forces the detail to recalculate its postion.
  const [key, updateKey] = React.useState(shortid.generate());

  const alertComponent = alert && (
    <Alert
      type={alert.type}
      onDismiss={
      () => {
        updateKey(shortid.generate());
        onDismissAlert();
      }}
    >
      {alert.message}
    </Alert>
  );


  const uploadOptionsModalComponent = modalType
    === modalTypes.uploadOptions && (
    <UploadOptionsModal listeners={uploadOptionsModalListeners} />
  );

  const deleteModalComponent = deleteModal && (
    <InTrayDeleteModal listeners={deleteModalListeners} entry={deleteModal} />
  );

  const pageHead = (
    <PageHead title="In Tray">
      <Button type="secondary" onClick={onUploadOptionsButtonClicked}>
        More ways to upload
      </Button>
      <div className={styles.fileBrowser}>
        <InTrayFileBrowser
          buttonType="primary"
          buttonLabel="Upload documents"
          onFileSelected={onUploadButtonClick}
        />
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
      <MasterDetailTemplate
        key={key}
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
        detail={(
          <InTrayListDetail
            onClose={onCloseDetail}
            handleActionSelect={handleActionSelect}
          />
        )}
        sticky="all"
        showDetail={isDetailShown}
        detailWidth="40%"
        detailMobileBreakpoint={800}
        master={(
          <InTrayListTable
            onSort={onSort}
            onUpload={onUpload}
            onDownload={onDownload}
            onDelete={onDelete}
            onRowSelect={onEntryActive}
            onLinkToExistingBill={onLinkToExistingBill}
            onCreateBill={onCreateBill}
            onAddAttachments={onAddAttachments}
            handleActionSelect={handleActionSelect}
          />
)}
      />
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
  isDetailShown: getIsDetailShown(state),
});

export default connect(mapStateToProps)(InTrayView);