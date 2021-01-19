import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDeleteModal,
  getLoadingState,
} from '../selectors/InTraySelectors';
import {
  getIsDetailShown,
  getIsEntryLoading,
  getIsTableEmpty,
} from '../selectors/InTrayListSelectors';
import InTrayDeleteModal from './InTrayDeleteModal';
import InTrayFileBrowser from './InTrayFileBrowser';
import InTrayListDetail from './InTrayListDetail';
import InTrayListFilterOptions from './InTrayListFilterOptions';
import InTrayListTable from './InTrayListTable';
import MasterDetailTemplate from '../../../../components/Feelix/MasterDetailTemplate/MasterDetailTemplate';
import PageView from '../../../../components/PageView/PageView';
import styles from './InTrayView.module.css';

const InTrayView = ({
  alert,
  deleteModal,
  deleteModalListeners,
  isDetailShown,
  isEntryLoading,
  isTableEmpty,
  inTrayListeners: {
    onDismissAlert,
    onUploadButtonClick,
    onUploadOptionsButtonClicked,
  },
  inTrayListListeners: {
    handleActionSelect,
    onCloseDetail,
    onCreateBill,
    onDelete,
    onDownload,
    onEntryActive,
    onLinkToExistingBill,
    onSort,
    onUpdateFilterOptions,
    onUpload,
  },
  loadingState,
  emptyStateListeners,
  inTrayUploadOptionsModal,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const deleteModalComponent = deleteModal && (
    <InTrayDeleteModal listeners={deleteModalListeners} entry={deleteModal} />
  );

  const pageHead = (
    <PageHead title="In tray">
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
    <InTrayListFilterOptions onUpdateFilterOptions={onUpdateFilterOptions} />
  );

  const inTrayView = (
    <div className={isEntryLoading ? styles.submitting : ''}>
      {inTrayUploadOptionsModal}
      {deleteModalComponent}
      <MasterDetailTemplate
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={isTableEmpty ? null : filterBar}
        detail={
          <InTrayListDetail
            onClose={onCloseDetail}
            handleActionSelect={handleActionSelect}
          />
        }
        sticky="all"
        showDetail={isDetailShown}
        detailWidth="40%"
        detailMobileBreakpoint={800}
        master={
          <InTrayListTable
            emptyStateListeners={emptyStateListeners}
            handleActionSelect={handleActionSelect}
            onUpload={onUpload}
            onCreateBill={onCreateBill}
            onDelete={onDelete}
            onDownload={onDownload}
            onLinkToExistingBill={onLinkToExistingBill}
            onRowSelect={onEntryActive}
            onSort={onSort}
          />
        }
      />
    </div>
  );

  return <PageView loadingState={loadingState} view={inTrayView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isEntryLoading: getIsEntryLoading(state),
  alert: getAlert(state),
  deleteModal: getDeleteModal(state),
  isDetailShown: getIsDetailShown(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(InTrayView);
