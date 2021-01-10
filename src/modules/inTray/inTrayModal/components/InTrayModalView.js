import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getEmail,
  getIsActionDisabled,
  getIsConfirmingEmailGeneration,
  getIsEntriesEmpty,
  getIsEntryLoading,
  getIsLinkActionDisabled,
  getIsLoading,
  getIsOpen,
  getIsUploadPopoverOpen,
  getRegion,
  getUploadOptionsAlert,
} from '../selectors/InTrayModalSelectors';
import InTrayEmptyStateView from '../../inTrayEmptyState/InTrayEmptyStateView';
import InTrayModalTable from './InTrayModalTable';
import PageView from '../../../../components/PageView/PageView';
import styles from './InTrayModalView.module.css';

const InTrayModalView = ({
  alert,
  email,
  emptyStateListeners,
  isActionDisabled,
  isConfirmingEmailGeneration,
  isEntriesEmpty,
  isEntryLoading,
  isLinkActionDisabled,
  isLoading,
  isOpen,
  inTrayModalListeners: { onCloseModal, onDismissAlert, onLinkButtonClick },
  inTrayListListeners: {
    onResetFilterOptions,
    onSelect,
    onSort,
    onUpdateFilterOptions,
    onUpload,
    onView,
  },
  isUploadPopoverOpen,
  region,
  uploadOptionsAlert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const inTrayView = (
    <div className={isEntryLoading ? styles.submitting : ''}>
      {alertComponent}

      {isEntriesEmpty ? (
        <InTrayEmptyStateView
          email={email}
          emptyStateListeners={emptyStateListeners}
          isConfirmingEmailGeneration={isConfirmingEmailGeneration}
          isUploadPopoverOpen={isUploadPopoverOpen}
          region={region}
          uploadOptionsAlert={uploadOptionsAlert}
        />
      ) : (
        <InTrayModalTable
          onSort={onSort}
          onUpload={onUpload}
          onView={onView}
          onSelect={onSelect}
          onUpdateFilterOptions={onUpdateFilterOptions}
          onResetFilterOptions={onResetFilterOptions}
        />
      )}
    </div>
  );

  const modal = (
    <Modal
      className={styles.modal}
      modalId="inTray"
      title="Link source document from In tray"
      onCancel={onCloseModal}
      size="extra-large"
      canClose={!isActionDisabled}
    >
      <Modal.Body>
        <PageView isLoading={isLoading} view={inTrayView} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCloseModal}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        {isEntriesEmpty ? null : (
          <Button
            type="primary"
            onClick={onLinkButtonClick}
            disabled={isLinkActionDisabled}
          >
            Link
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );

  return isOpen && modal;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  email: getEmail(state),
  isActionDisabled: getIsActionDisabled(state),
  isConfirmingEmailGeneration: getIsConfirmingEmailGeneration(state),
  isEntriesEmpty: getIsEntriesEmpty(state),
  isEntryLoading: getIsEntryLoading(state),
  isLinkActionDisabled: getIsLinkActionDisabled(state),
  isLoading: getIsLoading(state),
  isOpen: getIsOpen(state),
  isUploadPopoverOpen: getIsUploadPopoverOpen(state),
  region: getRegion(state),
  uploadOptionsAlert: getUploadOptionsAlert(state),
});

export default connect(mapStateToProps)(InTrayModalView);
